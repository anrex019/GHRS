import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LegalDocument, LegalDocumentDocument } from '../schemas/legal-document.schema';
import { CreateLegalDocumentDto } from './dto/create-legal-document.dto';
import { UpdateLegalDocumentDto } from './dto/update-legal-document.dto';

@Injectable()
export class LegalService {
  constructor(
    @InjectModel(LegalDocument.name)
    private legalDocumentModel: Model<LegalDocumentDocument>,
  ) {}

  async create(createLegalDocumentDto: CreateLegalDocumentDto): Promise<LegalDocument> {
    const createdDocument = new this.legalDocumentModel(createLegalDocumentDto);
    return createdDocument.save();
  }

  async findAll(): Promise<LegalDocument[]> {
    return this.legalDocumentModel.find().exec();
  }

  async findOne(id: string): Promise<LegalDocument> {
    const document = await this.legalDocumentModel.findById(id).exec();
    if (!document) {
      throw new NotFoundException(`Legal document with ID ${id} not found`);
    }
    return document;
  }

  async findByTypeAndLocale(type: string, locale: string): Promise<LegalDocument> {
    const document = await this.legalDocumentModel
      .findOne({ type, locale, isActive: true })
      .exec();
    
    if (!document) {
      throw new NotFoundException(
        `Legal document of type ${type} for locale ${locale} not found`,
      );
    }
    return document;
  }

  async update(
    id: string,
    updateLegalDocumentDto: UpdateLegalDocumentDto,
  ): Promise<LegalDocument> {
    const updatedDocument = await this.legalDocumentModel
      .findByIdAndUpdate(id, updateLegalDocumentDto, { new: true })
      .exec();
    
    if (!updatedDocument) {
      throw new NotFoundException(`Legal document with ID ${id} not found`);
    }
    return updatedDocument;
  }

  async remove(id: string): Promise<void> {
    const result = await this.legalDocumentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Legal document with ID ${id} not found`);
    }
  }

  async upsertByTypeAndLocale(
    type: string,
    locale: string,
    data: Partial<CreateLegalDocumentDto>,
  ): Promise<LegalDocument> {
    const document = await this.legalDocumentModel
      .findOneAndUpdate(
        { type, locale },
        { ...data, type, locale },
        { new: true, upsert: true },
      )
      .exec();
    return document;
  }
}
