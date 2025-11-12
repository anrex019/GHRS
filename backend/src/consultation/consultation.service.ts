import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConsultationRequest, ConsultationRequestDocument } from '../schemas/consultation-request.schema';
import { CreateConsultationRequestDto } from './dto/create-consultation-request.dto';
import { UpdateConsultationRequestDto } from './dto/update-consultation-request.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectModel(ConsultationRequest.name)
    private consultationRequestModel: Model<ConsultationRequestDocument>,
    private emailService: EmailService,
  ) {}

  async create(createDto: CreateConsultationRequestDto): Promise<ConsultationRequest> {
    const request = new this.consultationRequestModel(createDto);
    const savedRequest = await request.save();

    // Send email notifications
    try {
      await this.sendNotificationEmails(savedRequest);
      savedRequest.emailSent = true;
      await savedRequest.save();
    } catch (error) {
      console.error('Failed to send consultation email:', error);
      // Don't fail the request if email fails
    }

    return savedRequest;
  }

  async findAll(status?: string): Promise<ConsultationRequest[]> {
    const filter = status ? { status } : {};
    return this.consultationRequestModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<ConsultationRequest> {
    const request = await this.consultationRequestModel.findById(id).exec();
    if (!request) {
      throw new NotFoundException(`Consultation request with ID ${id} not found`);
    }
    return request;
  }

  async update(id: string, updateDto: UpdateConsultationRequestDto): Promise<ConsultationRequest> {
    const updatedRequest = await this.consultationRequestModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    
    if (!updatedRequest) {
      throw new NotFoundException(`Consultation request with ID ${id} not found`);
    }
    return updatedRequest;
  }

  async remove(id: string): Promise<void> {
    const result = await this.consultationRequestModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Consultation request with ID ${id} not found`);
    }
  }

  private async sendNotificationEmails(request: ConsultationRequest): Promise<void> {
    const localeTexts = {
      en: {
        subject: 'New Consultation Request',
        adminBody: `
          <h2>New Consultation Request</h2>
          <p><strong>Name:</strong> ${request.name}</p>
          <p><strong>Phone:</strong> ${request.phone}</p>
          <p><strong>Email:</strong> ${request.email}</p>
          <p><strong>Language:</strong> ${request.locale}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        `,
        userSubject: 'Thank you for your consultation request',
        userBody: `
          <h2>Thank you for your request!</h2>
          <p>Dear ${request.name},</p>
          <p>We have received your consultation request and will contact you shortly.</p>
          <p>Our working hours: 9:00 AM - 7:00 PM MSK</p>
          <p>Best regards,<br>GHRS Team</p>
        `,
      },
      ru: {
        subject: 'Новая заявка на консультацию',
        adminBody: `
          <h2>Новая заявка на консультацию</h2>
          <p><strong>Имя:</strong> ${request.name}</p>
          <p><strong>Телефон:</strong> ${request.phone}</p>
          <p><strong>Email:</strong> ${request.email}</p>
          <p><strong>Язык:</strong> ${request.locale}</p>
          <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
        `,
        userSubject: 'Спасибо за вашу заявку на консультацию',
        userBody: `
          <h2>Спасибо за вашу заявку!</h2>
          <p>Уважаемый(ая) ${request.name},</p>
          <p>Мы получили вашу заявку на консультацию и свяжемся с вами в ближайшее время.</p>
          <p>Наши рабочие часы: 9:00 - 19:00 по МСК</p>
          <p>С уважением,<br>Команда GHRS</p>
        `,
      },
      ka: {
        subject: 'ახალი განაცხადი კონსულტაციისთვის',
        adminBody: `
          <h2>ახალი განაცხადი კონსულტაციისთვის</h2>
          <p><strong>სახელი:</strong> ${request.name}</p>
          <p><strong>ტელეფონი:</strong> ${request.phone}</p>
          <p><strong>ელ-ფოსტა:</strong> ${request.email}</p>
          <p><strong>ენა:</strong> ${request.locale}</p>
          <p><strong>თარიღი:</strong> ${new Date().toLocaleString('ka-GE')}</p>
        `,
        userSubject: 'მადლობა თქვენი განაცხადისთვის',
        userBody: `
          <h2>მადლობა თქვენი განაცხადისთვის!</h2>
          <p>ძვირფასო ${request.name},</p>
          <p>ჩვენ მივიღეთ თქვენი განაცხადი კონსულტაციისთვის და მალე დაგიკავშირდებით.</p>
          <p>ჩვენი სამუშაო საათები: 9:00 - 19:00 მოსკოვის დროით</p>
          <p>პატივისცემით,<br>GHRS გუნდი</p>
        `,
      },
    };

    const texts = localeTexts[request.locale as keyof typeof localeTexts] || localeTexts.en;

    // Send email to admin
    await this.emailService.sendEmail({
      to: process.env.ADMIN_EMAIL || 'office@ghrs-group.com',
      subject: texts.subject,
      html: texts.adminBody,
    });

    // Send confirmation email to user
    await this.emailService.sendEmail({
      to: request.email,
      subject: texts.userSubject,
      html: texts.userBody,
    });
  }
}
