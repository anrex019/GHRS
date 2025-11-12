import { IsString, IsEnum, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class CreateLegalDocumentDto {
  @IsEnum(['user-agreement', 'consent', 'privacy-policy', 'data-processing'])
  type: string;

  @IsEnum(['en', 'ru', 'ka'])
  locale: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  version?: string;

  @IsDateString()
  @IsOptional()
  effectiveDate?: string;

  @IsString()
  @IsOptional()
  lastUpdatedBy?: string;
}
