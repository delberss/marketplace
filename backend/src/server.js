import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 4242;
const CLIENT_URL = 'http://localhost:5173';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('❌ Stripe secret key não definida no .env');
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' });

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.post('/api/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Valor "amount" inválido.' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'brl',
      payment_method_types: ['card'],
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('❌ Erro ao criar PaymentIntent:', error);
    return res.status(500).json({ error: 'Falha ao processar o pagamento.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Stripe rodando em http://localhost:${PORT}`);
});
