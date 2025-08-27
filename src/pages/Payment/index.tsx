// PaymentPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PaymentForm } from '../../components/PaymentForm/index';
import './index.css';
import Loading from '../../components/Loading';

export const Payment: React.FC = () => {
    const { state } = useLocation();
    const { total, items } = state as { total: number; items: any[] };

    const [clientSecret, setClientSecret] = useState<string>('');
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        }

        createPaymentIntent();
    }, [total]);

    if (loading) {
        // Enquanto espera a API, mostra tela de loading
        return <Loading fullScreen message="Preparando pagamento..." />;
    }

    return (
        <div className="payment-container">
            <h2>Pagamento</h2>
            <p>Total: <strong>R$ {total.toFixed(2)}</strong></p>
            {clientSecret ? (
                <PaymentForm clientSecret={clientSecret} />
            ) : (
                <p>Erro ao carregar tela de pagamento. Tente novamente.</p>
            )}
        </div>
    );
};
