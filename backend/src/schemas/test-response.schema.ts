import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestResponseDocument = TestResponse & Document;

@Schema({ _id: false })
export class Answer {
  @Prop({ required: true })
  questionId: string;

  @Prop({ type: [String] })
  selectedOptions?: string[];

  @Prop()
  textAnswer?: string;

  @Prop()
  scaleValue?: number;
}

@Schema({ timestamps: true })
export class TestResponse {
  @Prop({ required: true })
  testId: string;

  @Prop()
  userId?: string;

  @Prop()
  userEmail?: string;

  @Prop()
  userName?: string;

  @Prop({ type: [Answer], required: true })
  answers: Answer[];

  @Prop({ required: true })
  locale: string;

  @Prop()
  completedAt: Date;

  @Prop()
  ipAddress: string;

  createdAt?: Date;
  
  updatedAt?: Date;
}

export const TestResponseSchema = SchemaFactory.createForClass(TestResponse);
