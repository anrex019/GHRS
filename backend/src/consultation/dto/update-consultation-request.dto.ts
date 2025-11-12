import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultationRequestDto } from './create-consultation-request.dto';
import { IsEnum, IsOptional, IsString, IsDateString, IsBoolean } from 'class-validator';

export class UpdateConsultationRequestDto extends PartialType(CreateConsultationRequestDto) {
  @IsEnum(['pending', 'contacted', 'completed', 'cancelled'])
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsDateString()
  @IsOptional()
  contactedAt?: string;

  @IsString()
  @IsOptional()
  contactedBy?: string;

  @IsBoolean()
  @IsOptional()
  emailSent?: boolean;
}
