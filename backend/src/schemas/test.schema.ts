import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestDocument = Test & Document;

@Schema({ _id: false })
export class TestQuestion {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, type: Object })
  question: {
    en: string;
    ru: string;
    ka: string;
  };

  @Prop({ required: true, enum: ['single', 'multiple', 'text', 'scale'] })
  type: string;

  @Prop({ type: [Object], default: [] })
  options?: Array<{
    id: string;
    label: { en: string; ru: string; ka: string };
    value: string;
  }>;

  @Prop({ type: Object })
  scaleConfig?: {
    min: number;
    max: number;
    minLabel: { en: string; ru: string; ka: string };
    maxLabel: { en: string; ru: string; ka: string };
  };

  @Prop({ default: false })
  required: boolean;

  @Prop({ default: 0 })
  order: number;
}

@Schema({ timestamps: true })
export class Test {
  @Prop({ required: true, type: Object })
  title: {
    en: string;
    ru: string;
    ka: string;
  };

  @Prop({ required: true, type: Object })
  description: {
    en: string;
    ru: string;
    ka: string;
  };

  @Prop({ type: Object })
  introText?: {
    en: string;
    ru: string;
    ka: string;
  };

  @Prop({ type: Object })
  completionText?: {
    en: string;
    ru: string;
    ka: string;
  };

  @Prop({ type: [TestQuestion], default: [] })
  questions: TestQuestion[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ type: String, unique: true, sparse: true })
  slug: string;

  @Prop()
  estimatedTime: number; // in minutes

  @Prop()
  category: string;
}

export const TestSchema = SchemaFactory.createForClass(Test);
