import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { SubmitTestResponseDto } from './dto/submit-test-response.dto';
import { Request } from 'express';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  // Public endpoints
  @Get('published')
  findPublished() {
    return this.testService.findAll(true);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.testService.findBySlug(slug);
  }

  @Post('submit')
  submitResponse(@Body() submitDto: SubmitTestResponseDto, @Req() req: Request) {
    const ipAddress = req.ip || req.socket.remoteAddress || 'unknown';
    return this.testService.submitResponse(submitDto, ipAddress);
  }

  // Admin endpoints (should be protected)
  @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  findAll(@Query('isPublished') isPublished?: string) {
    const published = isPublished === 'true' ? true : isPublished === 'false' ? false : undefined;
    return this.testService.findAll(published);
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.testService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(id, updateTestDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  remove(@Param('id') id: string) {
    return this.testService.remove(id);
  }

  @Get(':id/responses')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  getResponses(@Param('id') id: string) {
    return this.testService.getResponses(id);
  }

  @Get(':id/stats')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  getStats(@Param('id') id: string) {
    return this.testService.getResponseStats(id);
  }
}
