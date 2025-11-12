import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LegalDocumentDocument = LegalDocument & Document;

@Schema({ timestamps: true })
export class LegalDocument {
  @Prop({ required: true, enum: ['user-agreement', 'consent', 'privacy-policy', 'data-processing'] })
  type: string;

  @Prop({ required: true, enum: ['en', 'ru', 'ka'] })
  locale: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  version: string;

  @Prop()
  effectiveDate: Date;

  @Prop()
  lastUpdatedBy: string;
}

export const LegalDocumentSchema = SchemaFactory.createForClass(LegalDocument);

// Create compound index for type + locale to ensure uniqueness
LegalDocumentSchema.index({ type: 1, locale: 1 }, { unique: true });
