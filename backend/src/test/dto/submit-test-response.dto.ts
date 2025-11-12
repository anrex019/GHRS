import { IsString, IsArray, IsOptional, IsNumber, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
  @IsString()
  questionId: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  selectedOptions?: string[];

  @IsString()
  @IsOptional()
  textAnswer?: string;

  @IsNumber()
  @IsOptional()
  scaleValue?: number;
}

export class SubmitTestResponseDto {
  @IsString()
  testId: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  userEmail?: string;

  @IsString()
  @IsOptional()
  userName?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];

  @IsEnum(['en', 'ru', 'ka'])
  locale: string;
}
