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
import { LegalService } from './legal.service';
import { CreateLegalDocumentDto } from './dto/create-legal-document.dto';
import { UpdateLegalDocumentDto } from './dto/update-legal-document.dto';

@Controller('legal')
export class LegalController {
  constructor(private readonly legalService: LegalService) {}

  // Public endpoint - no auth required
  @Get('document')
  async getDocument(
    @Query('type') type: string,
    @Query('locale') locale: string,
  ) {
    return this.legalService.findByTypeAndLocale(type, locale);
  }

  // Admin endpoints - should be protected with auth guards
  @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  create(@Body() createLegalDocumentDto: CreateLegalDocumentDto) {
    return this.legalService.create(createLegalDocumentDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  findAll() {
    return this.legalService.findAll();
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.legalService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateLegalDocumentDto: UpdateLegalDocumentDto,
  ) {
    return this.legalService.update(id, updateLegalDocumentDto);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  remove(@Param('id') id: string) {
    return this.legalService.remove(id);
  }

  @Post('upsert')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  upsert(
    @Body() body: { type: string; locale: string; data: Partial<CreateLegalDocumentDto> },
  ) {
    return this.legalService.upsertByTypeAndLocale(body.type, body.locale, body.data);
  }
}
