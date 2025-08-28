// src/pages/Checkout/index.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { clearCart } from '../../store/cartSlice';
import './index.css';
import cep from 'cep-promise';
import { useNavigate } from 'react-router-dom';

export const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [cepSuccess, setCepSuccess] = useState(false);
  const navigate = useNavigate();
  const [cepError, setCepError] = useState(''); // Mensagem de erro para CEP


  const [form, setForm] = useState({
    name: '', email: '',
    address: '', number: '', complement: '',
    city: '', cep: '',
  });

  const total = cartItems.reduce((sum, item) => sum + item?.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cepSuccess) {
      setCepError('Por favor, informe um CEP válido antes de finalizar o pedido.');
      return;
    }

    console.log('Enviando pedido', { form, cartItems });
    dispatch(clearCart());

    navigate('/payment', { state: { total, items: cartItems }, replace: true });
  };


  const handleCepBlur = () => {
    const cepOnlyNumbers = form.cep.replace(/\D/g, '');
    if (cepOnlyNumbers.length !== 8) {
      setCepError('CEP incompleto.');
      setCepSuccess(false);
      return;
    }

    cep(cepOnlyNumbers)
      .then(res => {
        setForm(f => ({
          ...f,
          address: res.street,
          city: res.city,
          cep: res.cep,
        }));
        setCepSuccess(true);
        setCepError('');
      })
      .catch(err => {
        console.error(err);
        setCepError('CEP inválido ou não encontrado');
        setCepSuccess(false);
      });
  };

  useEffect(() => {
    const cepOnlyNumbers = form.cep.replace(/\D/g, '');
    if (cepOnlyNumbers.length !== 8 || cepSuccess) return;

    cep(cepOnlyNumbers)
      .then(res => {
        setForm(f => ({
          ...f,
          address: res.street,
          city: res.city,
          cep: res.cep,
        }));
        setCepSuccess(true);
      })
      .catch(err => {
        console.error(err);
        setCepSuccess(false);
      });
  }, [form.cep]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;

      // Permite Enter se estiver em um textarea ou se o botão for o foco
      const isTextArea = target.tagName === 'TEXTAREA';
      const isButton = target.tagName === 'BUTTON' || (target as HTMLInputElement).type === 'submit';

      if (!isTextArea && !isButton) {
        e.preventDefault();
      }
    }
  };


  return (
    <div className="checkout-page">
      <aside className="summary-block">
        <h2>Resumo do pedido</h2>
        {cartItems.length === 0
          ? <p>Carrinho vazio.</p>
          : cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span className="item-description">{item?.description}</span>
              <span className="item-quantity">x {item.quantity}</span>
              <span className="item-price">R$ {(item?.price * item.quantity).toFixed(2)}</span>
            </div>


          ))
        }
        <hr />
        <div className="summary-total">
          <strong>Total:</strong> R$ {total.toFixed(2)}
        </div>
      </aside>

      {cartItems.length > 0 && (
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="checkout-form form-block">
          <h2>Dados para entrega</h2>
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

                if (value.length > 8) value = value.slice(0, 8);

                if (value.length > 5) {
                  value = value.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
                }

                setForm(f => ({ ...f, cep: value }));
                setCepSuccess(false);
                setCepError('');
              }}
              onBlur={handleCepBlur}
              required
              maxLength={9}
            />
            {cepError && <p className="cep-error-message">{cepError}</p>}
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
      )}
    </div>
  );
};
