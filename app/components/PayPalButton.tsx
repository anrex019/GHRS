'use client';

import { PayPalButtons } from '@paypal/react-paypal-js';
import { apiRequest, API_CONFIG } from '../config/api';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';

export interface PaymentResponse {
  id: string;
  status: string;
  payer: {
    email_address: string;
    payer_id: string;
  };
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
  }>;
}

interface PayPalButtonProps {
  amount: number;
  currency?: string;
  itemId: string;
  itemType?: 'set' | 'course' | 'mixed';
  onSuccess: (details: PaymentResponse) => void;
  onError: (error: Error) => void;
}

export default function PayPalButton({ amount, currency = 'USD', itemId, itemType = 'set', onSuccess, onError }: PayPalButtonProps) {
  const { user } = useAuth();
  const { t } = useI18n();

  const createOrder = async () => {
    try {
      if (!user) {
        throw new Error(t('payment.user_not_authorized'));
      }

      console.log('🔵 Creating PayPal order:', { amount, currency, userId: user.id, itemId, itemType }); // ✅ დამატებული ლოგი

      const response = await apiRequest<PaymentResponse>(API_CONFIG.ENDPOINTS.PAYMENTS.CREATE_ORDER, {
        method: 'POST',
        body: JSON.stringify({ 
          amount, 
          currency,
          userId: user.id,
          itemId,
          itemType
        })
      });

      console.log('✅ PayPal order created:', response); // ✅ დამატებული ლოგი

      if (!response.id) {
        throw new Error('PayPal order ID is missing');
      }

      return response.id;
    } catch (error) {
      console.error('❌ Error creating PayPal order:', error);
      onError(error instanceof Error ? error : new Error('Failed to create order'));
      throw error;
    }
  };

  const handleApprove = async (data: { orderID: string }) => {
    try {
      console.log('🔵 Capturing payment for order:', data.orderID); // ✅ დამატებული ლოგი
      
      const response = await apiRequest<PaymentResponse>(API_CONFIG.ENDPOINTS.PAYMENTS.CAPTURE_PAYMENT, {
        method: 'POST',
        body: JSON.stringify({ orderId: data.orderID })
      });
      
      console.log('✅ Payment captured:', response); // ✅ დამატებული ლოგი
      onSuccess(response);
    } catch (error) {
      console.error('❌ Error capturing PayPal payment:', error);
      onError(error instanceof Error ? error : new Error('Failed to capture payment'));
    }
  };

  const handleCancel = () => {
    console.log('⚠️ Payment cancelled by user');
  };

  const handleError = (error: unknown) => {
    console.error('❌ PayPal error:', error);
    onError(new Error('PayPal payment failed'));
  };

  if (!user) {
    return <div className="text-center text-red-500 p-4">{t('payment.please_login')}</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-4 text-center text-gray-700">
        {t('payment.total')}: {amount} {currency}
      </div>
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal"
        }}
        createOrder={createOrder}
        onApprove={handleApprove}
        onCancel={handleCancel}
        onError={handleError}
      />
    </div>
  );
}