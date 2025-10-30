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
  const { user, logout } = useAuth();
  const { t } = useI18n();

  const createOrder = async (): Promise<string> => {
    console.log('🚀 createOrder function called');
    
    try {
      // Validate user
      if (!user) {
        const error = new Error(t('payment.user_not_authorized') || 'User not authorized');
        console.error('❌ User not authenticated:', { user });
        onError(error);
        throw error;
      }

      // Check if token exists in localStorage
      const token = localStorage.getItem('token');
      console.log('🔐 Auth token check:', {
        tokenExists: !!token,
        tokenLength: token?.length,
        tokenPreview: token ? `${token.substring(0, 20)}...` : null,
        user: { id: user.id, email: user.email }
      });

      if (!token) {
        const error = new Error('Authentication token missing. Please log in again.');
        console.error('❌ No authentication token found in localStorage!');
        onError(error);
        throw error;
      }

      // Validate amount
      if (!amount || amount <= 0 || isNaN(amount)) {
        const error = new Error(`Invalid amount: ${amount}. Amount must be greater than 0.`);
        console.error('❌ Invalid amount:', { amount, type: typeof amount });
        onError(error);
        throw error;
      }

      // Validate itemId
      if (!itemId || itemId.trim() === '') {
        const error = new Error('Item ID is required');
        console.error('❌ Invalid itemId:', { itemId });
        onError(error);
        throw error;
      }

      const requestBody = { 
        amount, 
        currency,
        userId: user.id,
        itemId,
        itemType
      };

      console.log('🔵 Creating PayPal order:', { 
        endpoint: API_CONFIG.ENDPOINTS.PAYMENTS.CREATE_ORDER,
        hasAuthToken: !!token,
        requestBody: requestBody,
        requestBodyString: JSON.stringify(requestBody)
      });

      const response = await apiRequest<PaymentResponse>(API_CONFIG.ENDPOINTS.PAYMENTS.CREATE_ORDER, {
        method: 'POST',
        body: JSON.stringify(requestBody)
      });

      console.log('✅ PayPal order created successfully:', response);

      if (!response || !response.id) {
        const error = new Error('PayPal order ID is missing from response');
        console.error('❌ Invalid response from create order:', response);
        onError(error);
        throw error;
      }

      console.log('✅ Returning order ID:', response.id);
      return response.id;
    } catch (error) {
      // Check if it's a 401 Unauthorized error (token expired)
      const errorMessage = error instanceof Error ? error.message : String(error);
      const is401Error = errorMessage.includes('401') || errorMessage.includes('Unauthorized');
      
      console.error('❌ Error creating PayPal order:', {
        error,
        message: errorMessage,
        is401Error,
        stack: error instanceof Error ? error.stack : undefined,
        amount,
        currency,
        userId: user?.id,
        itemId,
        itemType
      });

      // If 401 error, token is expired - force re-login
      if (is401Error) {
        console.warn('🔐 Authentication token expired. Logging out...');
        logout();
        const authError = new Error('Your session has expired. Please log in again.');
        onError(authError);
        
        // Redirect to login after a short delay
        setTimeout(() => {
          window.location.href = '/auth/login?redirect=/shoppingcard';
        }, 2000);
        
        throw authError;
      }
      
      onError(error instanceof Error ? error : new Error('Failed to create order'));
      throw error;
    }
  };

  const handleApprove = async (data: { orderID: string }) => {
    try {
      console.log('🔵 Capturing payment for order:', {
        orderID: data.orderID,
        endpoint: API_CONFIG.ENDPOINTS.PAYMENTS.CAPTURE_PAYMENT
      });
      
      const response = await apiRequest<PaymentResponse>(API_CONFIG.ENDPOINTS.PAYMENTS.CAPTURE_PAYMENT, {
        method: 'POST',
        body: JSON.stringify({ orderId: data.orderID })
      });
      
      console.log('✅ Payment captured successfully:', response);
      
      if (!response) {
        throw new Error('Empty response from capture payment');
      }
      
      onSuccess(response);
    } catch (error) {
      console.error('❌ Error capturing PayPal payment:', {
        error,
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        orderID: data.orderID
      });
      onError(error instanceof Error ? error : new Error('Failed to capture payment'));
    }
  };

  const handleCancel = () => {
    console.log('⚠️ Payment cancelled by user');
  };

  const handleError = (error: unknown) => {
    console.error('❌ PayPal error details:', {
      error,
      errorType: typeof error,
      errorMessage: error instanceof Error ? error.message : String(error),
      errorStack: error instanceof Error ? error.stack : undefined,
      user: user ? { id: user.id, email: user.email } : null,
      amount,
      currency,
      itemId,
      itemType
    });
    
    const errorMessage = error instanceof Error 
      ? `PayPal payment failed: ${error.message}` 
      : 'PayPal payment failed';
    
    onError(new Error(errorMessage));
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