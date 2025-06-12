// src/pages/Checkout/index.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { clearCart } from '../../store/cartSlice';
import './index.css';
import cep from 'cep-promise';

export const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [cepSuccess, setCepSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '', email: '',
    address: '', number: '', complement: '',
    city: '', cep: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item?.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação básica
    if (!form.name || !form.email || !form.address) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    console.log('Enviando pedido', { form, cartItems });
    dispatch(clearCart());
    setSubmitted(true);
  };

  if (submitted) {
    return <div className="checkout-confirmation">
      <h2>Pedido confirmado!</h2>
      <p>Obrigado, {form.name}! Seu pedido de R$ {total.toFixed(2)} foi recebido.</p>
    </div>;
  }

  const handleCepBlur = () => {
    const cepOnlyNumbers = form.cep.replace(/\D/g, '');
    if (cepOnlyNumbers.length !== 8) return;

    cep(cepOnlyNumbers)
      .then(res => {
        setForm(f => ({
          ...f,
          address: res.street,
          city: res.city,
          cep: res.cep,
        }));
        setCepSuccess(true); // <- sucesso
      })
      .catch(err => {
        console.error(err);
        alert('CEP inválido ou não encontrado');
        setCepSuccess(false); // <- falha
      });
  };



  return (
    <div className="checkout-page">
      <aside className="summary-block">
        <h2>Resumo do pedido</h2>
        {cartItems.length === 0
          ? <p>Carrinho vazio.</p>
          : cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item?.description}: {item.quantity}</span>
              <span>R$ {(item?.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        }
        <hr />
        <div className="summary-total">
          <strong>Total:</strong> R$ {total.toFixed(2)}
        </div>
      </aside>

      {cartItems.length > 0 && (
        <main className="form-block">
          <h2>Dados para entrega</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <label>
              Nome completo*
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              E-mail*
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              CEP*
              <input
                name="cep"
                value={form.cep}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');

                  // Impede valores maiores que 8 dígitos
                  if (value.length > 8) value = value.slice(0, 8);

                  // Aplica a máscara
                  if (value.length > 5) {
                    value = value.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
                  }

                  setForm(f => ({ ...f, cep: value }));
                  setCepSuccess(false); // Oculta novamente caso esteja incompleto
                }}

                onBlur={handleCepBlur}
                required
                maxLength={9}
              />
            </label>
            {cepSuccess && (
              <>
                <label>
                  Endereço
                  <input name="address" value={form.address} onChange={handleChange} required disabled />
                </label>
                <label>
                  Cidade
                  <input name="city" value={form.city} onChange={handleChange} disabled />
                </label>
              </>
            )}


            <label>
              Número*
              <input
                name="number"
                value={form.number}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Complemento
              <input
                name="complement"
                value={form.complement}
                onChange={handleChange}
                placeholder="Apto, bloco, casa, etc."
              />
            </label>


            <button type="submit" className="submit-button">
              Finalizar Pedido
            </button>
          </form>
        </main>
      )}
    </div>
  );
};
