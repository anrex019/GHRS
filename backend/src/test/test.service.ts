import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestDocument } from '../schemas/test.schema';
import { TestResponse, TestResponseDocument } from '../schemas/test-response.schema';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { SubmitTestResponseDto } from './dto/submit-test-response.dto';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name)
    private testModel: Model<TestDocument>,
    @InjectModel(TestResponse.name)
    private testResponseModel: Model<TestResponseDocument>,
  ) {}

  async create(createTestDto: CreateTestDto): Promise<Test> {
    const createdTest = new this.testModel(createTestDto);
    return createdTest.save();
  }

  async findAll(isPublished?: boolean): Promise<Test[]> {
    const filter = isPublished !== undefined ? { isPublished } : {};
    return this.testModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Test> {
    const test = await this.testModel.findById(id).exec();
    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    return test;
  }

  async findBySlug(slug: string): Promise<Test> {
    const test = await this.testModel.findOne({ slug, isPublished: true }).exec();
    if (!test) {
      throw new NotFoundException(`Test with slug ${slug} not found`);
    }
    return test;
  }

  async update(id: string, updateTestDto: UpdateTestDto): Promise<Test> {
    const updatedTest = await this.testModel
      .findByIdAndUpdate(id, updateTestDto, { new: true })
      .exec();
    
    if (!updatedTest) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
    return updatedTest;
  }

  async remove(id: string): Promise<void> {
    const result = await this.testModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }
  }

  async submitResponse(submitDto: SubmitTestResponseDto, ipAddress: string): Promise<TestResponse> {
    const response = new this.testResponseModel({
      ...submitDto,
      completedAt: new Date(),
      ipAddress,
    });
    return response.save();
  }

  async getResponses(testId: string): Promise<TestResponse[]> {
    return this.testResponseModel.find({ testId }).sort({ createdAt: -1 }).exec();
  }

  async getResponseStats(testId: string): Promise<any> {
    const responses = await this.testResponseModel.find({ testId }).exec();
    
    return {
      totalResponses: responses.length,
      responsesByLocale: {
        en: responses.filter(r => r.locale === 'en').length,
        ru: responses.filter(r => r.locale === 'ru').length,
        ka: responses.filter(r => r.locale === 'ka').length,
      },
      lastResponseDate: responses.length > 0 ? responses[0].createdAt : null,
    };
  }
}
