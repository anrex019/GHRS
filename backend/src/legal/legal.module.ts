import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LegalController } from './legal.controller';
import { LegalService } from './legal.service';
import { LegalDocument, LegalDocumentSchema } from '../schemas/legal-document.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LegalDocument.name, schema: LegalDocumentSchema },
    ]),
  ],
  controllers: [LegalController],
  providers: [LegalService],
  exports: [LegalService],
})
export class LegalModule {}
