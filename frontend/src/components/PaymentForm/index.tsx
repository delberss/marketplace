import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './index.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading'; // seu componente de loading

export const PaymentForm: React.FC<{ clientSecret: string }> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cep, setCep] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 8);
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
    setCep(v);
  };

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

    const postal = cep.replace('-', '');
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          address: { postal_code: postal || undefined }
        }
      }
    });

    if (confirmError) {
      setError(confirmError.message || 'Erro no pagamento');
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === 'succeeded') {
      setSuccess(true);
      setError(null);

      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
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
            hidePostalCode: true,
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

      {/* Se estiver processando, mostra o Loading */}
      {processing ? (
        <Loading />
      ) : (
        <button
          className={`pay-button ${success ? 'success' : ''}`}
          disabled={!stripe || success}
        >
          {success ? 'Pagamento realizado com sucesso! 🎉' : 'Realizar pagamento'}
        </button>
      )}

      {error && <div className="error-message">{error}</div>}
    </form>
  );
};
