// backend/src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    const gmailUser = this.configService.get<string>('GMAIL_USER');
    const gmailPass = this.configService.get<string>('GMAIL_APP_PASSWORD');

    console.log('📧 Initializing Gmail Service...');
    console.log('Gmail User:', gmailUser);
    console.log('Gmail Pass:', gmailPass ? '****' + gmailPass.slice(-4) : 'NOT SET');

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    // Verify connection
    this.transporter.verify((error) => {
      if (error) {
        console.error('❌ Gmail service error:', error);
      } else {
        console.log('✅ Gmail service ready to send emails');
      }
    });
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    const mailOptions = {
      from: `"GRS Platform" <${this.configService.get<string>('GMAIL_USER')}>`,
      to: email,
      subject: 'Email Verification Code - GRS Platform',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f7fe;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 20px;
              padding: 40px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              color: #B6A3D9;
            }
            .code-box {
              background-color: #f3f0ff;
              border: 2px solid #B6A3D9;
              border-radius: 12px;
              padding: 30px;
              text-align: center;
              margin: 30px 0;
            }
            .code {
              font-size: 42px;
              font-weight: bold;
              color: #3D334A;
              letter-spacing: 8px;
            }
            .message {
              color: #3D334A;
              font-size: 16px;
              line-height: 1.6;
              margin: 20px 0;
            }
            .warning {
              color: #846FA0;
              font-size: 14px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #E0D6F9;
              color: #8B7BAA;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">GRS Platform</div>
            </div>
            
            <div class="message">
              <p>გამარჯობა!</p>
              <p>თქვენი ვერიფიკაციის კოდი არის:</p>
            </div>
            
            <div class="code-box">
              <div class="code">${code}</div>
            </div>
            
            <div class="message">
              <p>გთხოვთ შეიყვანოთ ეს კოდი რეგისტრაციის დასასრულებლად.</p>
              <div class="warning">
                ⏱ კოდი ვალიდურია 10 წუთის განმავლობაში.
              </div>
            </div>
            
            <div class="footer">
              <p>თუ თქვენ არ მოითხოვეთ ეს კოდი, უბრალოდ იგნორირება გაუკეთეთ ამ წერილს.</p>
              <p>&copy; ${new Date().getFullYear()} GRS Platform. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Verification email sent to:', email);
      console.log('📧 Message ID:', info.messageId);
    } catch (error) {
      console.error('❌ Failed to send verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  async sendEmail(options: { to: string; subject: string; html: string }): Promise<void> {
    const mailOptions = {
      from: `"GHRS Group" <${this.configService.get<string>('GMAIL_USER')}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Email sent to:', options.to);
      console.log('📧 Message ID:', info.messageId);
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    const mailOptions = {
      from: `"GRS Platform" <${this.configService.get<string>('GMAIL_USER')}>`,
      to: email,
      subject: 'Welcome to GRS Platform! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f7fe;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 20px;
              padding: 40px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              color: #B6A3D9;
            }
            .welcome {
              font-size: 28px;
              color: #3D334A;
              text-align: center;
              margin: 30px 0;
            }
            .message {
              color: #3D334A;
              font-size: 16px;
              line-height: 1.8;
              margin: 20px 0;
            }
            .button {
              display: block;
              width: 200px;
              margin: 30px auto;
              padding: 15px;
              background-color: #B6A3D9;
              color: white;
              text-align: center;
              text-decoration: none;
              border-radius: 10px;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #E0D6F9;
              color: #8B7BAA;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">GRS Platform</div>
            </div>
            
            <div class="welcome">
              🎉 კეთილი იყოს თქვენი მობრძანება!
            </div>
            
            <div class="message">
              <p>გამარჯობა, ${name}!</p>
              <p>გილოცავთ წარმატებით რეგისტრაციას GRS Platform-ზე!</p>
              <p>ჩვენი პლატფორმა დაგეხმარებათ ჯანმრთელობის გაუმჯობესებაში და ფიზიკური აქტივობის ტრეკინგში.</p>
            </div>
            
            <a href="${this.configService.get<string>('FRONTEND_URL')}" class="button">
              დაიწყე ახლავე
            </a>
            
            <div class="footer">
              <p>გმადლობთ რომ შემოუერთდით!</p>
              <p>&copy; ${new Date().getFullYear()} GRS Platform. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Welcome email sent to:', email);
      console.log('📧 Message ID:', info.messageId);
    } catch (error) {
      console.error('❌ Failed to send welcome email:', error);
      // Don't throw error for welcome email
    }
  }
}