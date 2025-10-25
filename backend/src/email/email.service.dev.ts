import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {
    console.log('📧 Development Email Service initialized');
    console.log('📝 Verification codes will be displayed in console for development');
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    console.log('\n' + '='.repeat(60));
    console.log('📧 VERIFICATION EMAIL (Development Mode)');
    console.log('='.repeat(60));
    console.log(`📮 To: ${email}`);
    console.log(`🔑 Verification Code: ${code}`);
    console.log(`⏰ Expires in: 10 minutes`);
    console.log('='.repeat(60));
    console.log('📝 Copy the code above and paste it in the verification form');
    console.log('='.repeat(60) + '\n');
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    console.log('\n' + '='.repeat(60));
    console.log('🎉 WELCOME EMAIL (Development Mode)');
    console.log('='.repeat(60));
    console.log(`📮 To: ${email}`);
    console.log(`👋 Welcome ${name}!`);
    console.log('🎯 Your account has been successfully created');
    console.log('='.repeat(60) + '\n');
  }
}
