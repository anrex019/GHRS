'use client';

import { useState } from 'react';
import PayPalButton from '../components/PayPalButton';
import { useI18n } from '../context/I18nContext';

export default function TestPayment() {
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-8">{t('payment.test_title') || 'Test Payment'}</h1>
      
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <PayPalButton
          amount={10}
          currency="USD"
          itemId="test-item-123"
          itemType="set"
          onSuccess={(details) => {
            console.log('Payment completed:', details);
            setPaymentStatus(`Payment successful! Order ID: ${details.id}`);
          }}
          onError={(error) => {
            console.error('Payment error:', error);
            setPaymentStatus(`Payment failed: ${error.message}`);
          }}
        />

        {paymentStatus && (
          <div className={`mt-4 p-4 rounded ${
            paymentStatus.includes('successful') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {paymentStatus}
          </div>
        )}
      </div>
    </div>
  )
}