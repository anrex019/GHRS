import { IsString, IsBoolean, IsArray, IsOptional, IsNumber, IsEnum, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class MultilingualText {
  @IsString()
  en: string;

  @IsString()
  ru: string;

  @IsString()
  ka: string;
}

class QuestionOption {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => MultilingualText)
  label: MultilingualText;

  @IsString()
  value: string;
}

class ScaleConfig {
  @IsNumber()
  min: number;

  @IsNumber()
  max: number;

  @ValidateNested()
  @Type(() => MultilingualText)
  minLabel: MultilingualText;

  @ValidateNested()
  @Type(() => MultilingualText)
  maxLabel: MultilingualText;
}

class TestQuestionDto {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => MultilingualText)
  question: MultilingualText;

  @IsEnum(['single', 'multiple', 'text', 'scale'])
  type: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionOption)
  @IsOptional()
  options?: QuestionOption[];

  @ValidateNested()
  @Type(() => ScaleConfig)
  @IsOptional()
  scaleConfig?: ScaleConfig;

  @IsBoolean()
  @IsOptional()
  required?: boolean;

  @IsNumber()
  @IsOptional()
  order?: number;
}

export class CreateTestDto {
  @ValidateNested()
  @Type(() => MultilingualText)
  title: MultilingualText;

  @ValidateNested()
  @Type(() => MultilingualText)
  description: MultilingualText;

  @ValidateNested()
  @Type(() => MultilingualText)
  @IsOptional()
  introText?: MultilingualText;

  @ValidateNested()
  @Type(() => MultilingualText)
  @IsOptional()
  completionText?: MultilingualText;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestQuestionDto)
  questions: TestQuestionDto[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsNumber()
  @IsOptional()
  estimatedTime?: number;

  @IsString()
  @IsOptional()
  category?: string;
}
