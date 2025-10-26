import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-order')
  async createOrder(
    @Body() data: { 
      amount: number; 
      currency: string; 
      userId: string; 
      itemId: string; 
      itemType?: 'set' | 'course' | 'mixed';
    },
  ) {
    // ✅ დაამატე debugging
    console.log('📦 Controller received create-order request:', {
      amount: data.amount,
      amountType: typeof data.amount,
      currency: data.currency,
      currencyType: typeof data.currency,
      userId: data.userId,
      itemId: data.itemId,
      itemType: data.itemType,
    });

    try {
      const result = await this.paymentService.createOrder(
        data.amount,
        data.currency,
        data.userId,
        data.itemId,
        data.itemType || 'set',
      );
      console.log('✅ Order created successfully:', result.id);
      return result;
    } catch (error) {
      console.error('❌ Controller error:', error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('capture-payment')
  async capturePayment(@Body() data: { orderId: string }) {
    console.log('💰 Controller received capture-payment request:', data);
    
    try {
      const result = await this.paymentService.capturePayment(data.orderId);
      console.log('✅ Payment captured successfully');
      return result;
    } catch (error) {
      console.error('❌ Capture error:', error);
      throw error;
    }
  }
}