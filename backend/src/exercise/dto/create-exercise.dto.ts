import { IsString, IsEnum, IsBoolean, IsOptional, IsNumber, IsMongoId, ValidateNested, IsObject } from 'class-validator';
import { Type, Transform } from 'class-transformer';

class LocalizedStringDto {
  @IsString()
  en: string;

  @IsString()
  ru: string;

  @IsOptional()
  @IsString()
  ka?: string;
}

class PriceObjectDto {
  @IsNumber()
  monthly: number;

  @IsNumber()
  threeMonths: number;

  @IsNumber()
  sixMonths: number;

  @IsNumber()
  yearly: number;
}

class LevelsObjectDto {
  @IsBoolean()
  beginner: boolean;

  @IsBoolean()
  intermediate: boolean;

  @IsBoolean()
  advanced: boolean;
}

export class CreateExerciseDto {
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  name: LocalizedStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  description?: LocalizedStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  recommendations?: LocalizedStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  additional?: LocalizedStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  equipment?: LocalizedStringDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  warnings?: LocalizedStringDto;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  videoUrlEn?: string;

  @IsOptional()
  @IsString()
  demoVideoUrl?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  thumbnailImage?: string;

  @IsString()
  videoDuration: string;

  @IsString()
  duration: string;

  @IsEnum(['easy', 'medium', 'hard'])
  difficulty: 'easy' | 'medium' | 'hard';

  @IsOptional()
  @IsNumber()
  difficultyLevels?: number;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => LevelsObjectDto)
  levels?: LevelsObjectDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PriceObjectDto)
  price?: PriceObjectDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PriceObjectDto)
  priceKa?: PriceObjectDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PriceObjectDto)
  priceEn?: PriceObjectDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PriceObjectDto)
  discountedPrice?: PriceObjectDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PriceObjectDto)
  discountedPriceKa?: PriceObjectDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PriceObjectDto)
  discountedPriceEn?: PriceObjectDto;

  @IsOptional()
  @IsNumber()
  totalExercises?: number;

  @IsOptional()
  @IsString()
  totalDuration?: string;

  @IsString()
  repetitions: string;

  @IsString()
  sets: string;

  @IsString()
  restTime: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return value;
  })
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return value;
  })
  @IsBoolean()
  isPublished?: boolean;

  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @IsMongoId()
  setId: string;

  @IsMongoId()
  categoryId: string;

  @IsMongoId()
  @IsOptional()
  subCategoryId?: string;
}