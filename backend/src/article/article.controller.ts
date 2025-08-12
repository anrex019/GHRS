import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  UseInterceptors,
  UploadedFiles,
  BadRequestException 
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import cloudinary from '../cloudinary.config';
import * as streamifier from 'streamifier';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  private parseIfString<T>(value: any, fallback: T): T {
    if (value === undefined || value === null) return fallback;
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        // If it's a plain string that isn't JSON, return as-is (fallback if incompatible)
        return (value as unknown) as T;
      }
    }
    return value as T;
  }

  private uploadToCloudinary = (file: Express.Multer.File, resource_type: 'image' | 'video') => {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          resource_type,
          folder: 'grs/articles',
          transformation: resource_type === 'image' ? [
            { width: 1400, height: 518, crop: 'fill' },
            { quality: 'auto' },
            { fetch_format: 'auto' }
          ] : undefined
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(upload);
    });
  };

  @Post('json')
  async createJson(@Body() createArticleDto: CreateArticleDto) {

    try {
      const result = await this.articleService.create(createArticleDto);
      return result;
    } catch (error) {
      console.error('❌ Error in create article JSON controller:', error);
      throw new BadRequestException(error.message || 'Failed to create article');
    }
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createArticleDto: any,
  ) {

    try {
      // Parse JSON strings from FormData only if necessary
      const parsedData: any = {
        ...createArticleDto,
        title: this.parseIfString(createArticleDto.title, {}),
        excerpt: this.parseIfString(createArticleDto.excerpt, {}),
        content: this.parseIfString(createArticleDto.content, {}),
        author: this.parseIfString(createArticleDto.author, {}),
        tableOfContents: this.parseIfString(createArticleDto.tableOfContents, []),
        tags: this.parseIfString(createArticleDto.tags, []),
        categoryId: this.parseIfString(createArticleDto.categoryId, []),
        featuredImages: this.parseIfString(createArticleDto.featuredImages, []),
      };

      // Normalize single categoryId to array
      if (parsedData.categoryId && !Array.isArray(parsedData.categoryId)) {
        parsedData.categoryId = [parsedData.categoryId];
      }
      if (!parsedData.categoryId) parsedData.categoryId = [];

      let featuredImages = parsedData.featuredImages || [];

      // Upload images to Cloudinary if provided
      if (files && files.length > 0) {
        const uploadPromises = files.map(file => this.uploadToCloudinary(file, 'image'));
        const uploadResults = await Promise.all(uploadPromises);
        const newImages = uploadResults.map((result: any) => result.secure_url);
        featuredImages = [...featuredImages, ...newImages];
      }

      const articleData = {
        ...parsedData,
        featuredImages,
      };

      console.log('Creating article with data:', articleData);
      const result = await this.articleService.create(articleData);
      console.log('Created article result:', result);
      return result;
    } catch (error) {
      console.error('❌ Error in create article controller:', error);
      throw new BadRequestException(error.message || 'Failed to create article');
    }
  }

  @Get()
  async findAll(@Query() query: any) {
    return this.articleService.findAll(query);
  }

  @Get('featured')
  async findFeatured() {
    return this.articleService.findFeatured();
  }

  @Get('popular')
  async findPopular(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 6;
    return this.articleService.findPopular(limitNum);
  }

  @Get('search')
  async search(@Query('q') searchTerm: string) {
    if (!searchTerm) {
      throw new BadRequestException('Search term is required');
    }
    return this.articleService.search(searchTerm);
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string) {
    return this.articleService.findByCategory(categoryId);
  }

  @Get('blog/:blogId')
  async findByBlog(@Param('blogId') blogId: string) {
    return this.articleService.findByBlog(blogId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images', 10))
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateArticleDto: any,
  ) {

    try {
      // Parse JSON strings from FormData only if necessary
      const parsedData: any = {};

      if (updateArticleDto.title !== undefined) parsedData.title = this.parseIfString(updateArticleDto.title, {});
      if (updateArticleDto.excerpt !== undefined) parsedData.excerpt = this.parseIfString(updateArticleDto.excerpt, {});
      if (updateArticleDto.content !== undefined) parsedData.content = this.parseIfString(updateArticleDto.content, {});
      if (updateArticleDto.author !== undefined) parsedData.author = this.parseIfString(updateArticleDto.author, {});
      if (updateArticleDto.tableOfContents !== undefined) parsedData.tableOfContents = this.parseIfString(updateArticleDto.tableOfContents, []);
      if (updateArticleDto.tags !== undefined) parsedData.tags = this.parseIfString(updateArticleDto.tags, []);
      if (updateArticleDto.categoryId !== undefined) parsedData.categoryId = this.parseIfString(updateArticleDto.categoryId, []);
      if (updateArticleDto.featuredImages !== undefined) parsedData.featuredImages = this.parseIfString(updateArticleDto.featuredImages, []);
      
      // Copy other simple fields
      ['readTime', 'isPublished', 'isFeatured', 'isActive', 'sortOrder'].forEach(field => {
        if (updateArticleDto[field] !== undefined) {
          parsedData[field] = updateArticleDto[field];
        }
      });

      // Normalize single categoryId to array
      if (parsedData.categoryId && !Array.isArray(parsedData.categoryId)) {
        parsedData.categoryId = [parsedData.categoryId];
      }

      let featuredImages = parsedData.featuredImages || [];

      // Upload new images if provided
      if (files && files.length > 0) {
        const uploadPromises = files.map(file => this.uploadToCloudinary(file, 'image'));
        const uploadResults = await Promise.all(uploadPromises);
        const newImages = uploadResults.map((result: any) => result.secure_url);
        featuredImages = [...featuredImages, ...newImages];
      }

      parsedData.featuredImages = featuredImages;

      console.log('Updating article with data:', parsedData);
      const result = await this.articleService.update(id, parsedData);
      console.log('Updated article result:', result);
      return result;
    } catch (error) {
      console.error('❌ Error in update article controller:', error);
      throw new BadRequestException(error.message || 'Failed to update article');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }

  @Post(':id/like')
  async incrementLikes(@Param('id') id: string) {
    return this.articleService.incrementLikes(id);
  }
} 