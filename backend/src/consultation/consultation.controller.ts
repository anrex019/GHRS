import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { CreateConsultationRequestDto } from './dto/create-consultation-request.dto';
import { UpdateConsultationRequestDto } from './dto/update-consultation-request.dto';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  // Public endpoint - no auth required
  @Post()
  create(@Body() createDto: CreateConsultationRequestDto) {
    return this.consultationService.create(createDto);
  }

  // Admin endpoints - should be protected with auth guards
  @Get()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  findAll(@Query('status') status?: string) {
    return this.consultationService.findAll(status);
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.consultationService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  update(@Param('id') id: string, @Body() updateDto: UpdateConsultationRequestDto) {
    return this.consultationService.update(id, updateDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  remove(@Param('id') id: string) {
    return this.consultationService.remove(id);
  }
}
