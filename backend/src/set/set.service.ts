import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Set, SetDocument } from '../schemas/set.schema';
import { CreateSetDto } from './dto/create-set.dto';

@Injectable()
export class SetService {
  constructor(
    @InjectModel(Set.name) private setModel: Model<SetDocument>
  ) {}

  private transformPrice(price: any): any {
    if (typeof price === 'string') {
      try {
        return JSON.parse(price);
      } catch (e) {
        return price;
      }
    }
    return price;
  }

  async create(createSetDto: CreateSetDto): Promise<Set> {
    // დავამატოთ default მნიშვნელობები და გარდავქმნათ მონაცემები
    const setData = {
      ...createSetDto,
      // თუ demoVideoUrl სტრინგია, გადავაკეთოთ ობიექტად
      demoVideoUrl: typeof createSetDto.demoVideoUrl === 'string' 
        ? { en: createSetDto.demoVideoUrl, ru: createSetDto.demoVideoUrl }
        : createSetDto.demoVideoUrl,
      // ფასების ტრანსფორმაცია
      priceEn: this.transformPrice(createSetDto.priceEn),
      discountedPriceEn: this.transformPrice(createSetDto.discountedPriceEn),
      levels: {
        beginner: { exerciseCount: 0, isLocked: false, ...createSetDto.levels?.beginner },
        intermediate: { exerciseCount: 0, isLocked: true, ...createSetDto.levels?.intermediate },
        advanced: { exerciseCount: 0, isLocked: true, ...createSetDto.levels?.advanced }
      },
      isActive: createSetDto.isActive ?? true,
      isPublished: createSetDto.isPublished ?? false,
      sortOrder: createSetDto.sortOrder ?? 0,
      categoryId: new Types.ObjectId(createSetDto.categoryId),
      subCategoryId: createSetDto.subCategoryId ? new Types.ObjectId(createSetDto.subCategoryId) : undefined
    };

    const set = new this.setModel(setData);
    return set.save();
  }

  async update(id: string, updateSetDto: Partial<CreateSetDto>): Promise<Set> {
    const updateData: any = { ...updateSetDto };
    
    // ObjectId-ების კონვერტაცია
    if (updateData.categoryId) {
      updateData.categoryId = new Types.ObjectId(updateData.categoryId);
    }
    if (updateData.subCategoryId) {
      updateData.subCategoryId = new Types.ObjectId(updateData.subCategoryId);
    }

    // demoVideoUrl-ის ტრანსფორმაცია
    if (typeof updateData.demoVideoUrl === 'string') {
      updateData.demoVideoUrl = {
        en: updateData.demoVideoUrl,
        ru: updateData.demoVideoUrl
      };
    }

    // ფასების ტრანსფორმაცია
    if (updateData.priceEn) {
      updateData.priceEn = this.transformPrice(updateData.priceEn);
    }
    if (updateData.discountedPriceEn) {
      updateData.discountedPriceEn = this.transformPrice(updateData.discountedPriceEn);
    }

    const updatedSet = await this.setModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('category')
      .populate('subcategory')
      .exec();

    if (!updatedSet) {
      throw new NotFoundException(`Set with ID "${id}" not found`);
    }

    return updatedSet;
  }

  async findAll(query: { categoryId?: string; subCategoryId?: string }) {
    const filter: any = { isActive: true };
    
    if (query.categoryId) {
      filter.categoryId = new Types.ObjectId(query.categoryId);
    }
    
    if (query.subCategoryId) {
      filter.subCategoryId = new Types.ObjectId(query.subCategoryId);
    }

    return this.setModel
      .find(filter)
      .populate('category')
      .populate('subcategory')
      .sort({ sortOrder: 1 })
      .exec();
  }

  async findOne(id: string) {
    return this.setModel
      .findById(id)
      .populate('category')
      .populate('subcategory')
      .exec();
  }

  async remove(id: string): Promise<void> {
    const result = await this.setModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Set with ID ${id} not found`);
    }
  }
} 