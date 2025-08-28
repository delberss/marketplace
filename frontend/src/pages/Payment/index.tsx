// PaymentPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PaymentForm } from '../../components/PaymentForm/index';
import './index.css';

export const Payment: React.FC = () => {
    const { state } = useLocation();
    const { total, items } = state as { total: number; items: any[] };

    const [clientSecret, setClientSecret] = useState<string>('');

    useEffect(() => {
        async function createPaymentIntent() {
            try {
                const response = await fetch('http://localhost:4242/api/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: Math.round(total * 100) }),
                });

                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Erro ao criar PaymentIntent", error);
            }
        }

        createPaymentIntent();
    }, [total]);

    return (
        <div className="payment-container">
            <h2>Pagamento</h2>
            <p>Total: <strong>R$ {total.toFixed(2)}</strong></p>
            <PaymentForm clientSecret={clientSecret} />
        </div>
    );
};
