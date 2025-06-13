import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './index.css';

export const PaymentForm: React.FC<{ clientSecret: string }> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError('Stripe.js ainda não está carregado.');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Elemento de cartão não encontrado.');
      return;
    }

    setProcessing(true);

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (confirmError) {
      setError(confirmError.message || 'Erro no pagamento');
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      setSuccess(true);
      setError(null);
    } else {
      setError('Pagamento não foi concluído.');
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="card-element-wrapper">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#32325d',
                '::placeholder': { color: '#a0aec0' },
              },
              invalid: { color: '#fa755a' },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing || success}
        className="pay-button"
      >
        {processing ? 'Processando...' : success ? 'Pago!' : 'Pagar'}
      </button>

      {error && <div className="error-message">{error}</div>}
    </form>


  );
};
