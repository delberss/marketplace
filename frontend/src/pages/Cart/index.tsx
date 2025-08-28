import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import type { RootState } from '../../store/index';
import { productsMock } from '../../mock/productsMock';
import { type ProductProps } from '../../components/Product';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from 'react-icons/ai';
import { addToCart, removeFromCart, updateQuantity } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleIncrease = (productId: string) => {
        const currentQuantity = cartItems.find(item => item.id === productId)?.quantity || 0;
        dispatch(updateQuantity({ id: productId, quantity: currentQuantity + 1 }));
    };

    const handleDecrease = (productId: string) => {
        const currentQuantity = cartItems.find(item => item.id === productId)?.quantity || 0;
        if (currentQuantity > 0) {
            dispatch(updateQuantity({ id: productId, quantity: currentQuantity - 1 }));
        }
    };


    const handleRemove = (productId: string) => {
        dispatch(removeFromCart(productId));
    };

    const filteredItems = productsMock.filter(product =>
        cartItems.some(item => item.id === product.id.toString())
    );

    const getQuantity = (id: string) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    };

    const totalPrice = filteredItems.reduce((acc, product) => {
        const quantity = getQuantity(product.id);
        return acc + parseFloat(product.price) * quantity;
    }, 0);

    return (
        <div className="cart-container">
            <h2>Carrinho</h2>
            {filteredItems.map((product: ProductProps) => (
                <div key={product.id} className="cart-item">
                    <img src={product.image} alt={product.title} />
                    <div className="cart-item-details">
                        <div className="cart-item-title">{product.title}</div>
                        <div className="cart-item-description">{product.description}</div>
                        <div className="cart-item-price">
                            R$ {(parseFloat(product.price)).toFixed(2)}
                        </div>
                    </div>
                    <div className="cart-item-actions">
                        <div className="quantity-controls">
                            <button className="cart-btn add" onClick={() => handleIncrease(product.id)}>
                                <AiOutlinePlus />
                            </button>

                            <span className="cart-item-quantity-action">{getQuantity(product.id)}</span>

                            <button className="cart-btn decrease" onClick={() => handleDecrease(product.id)}>
                                <AiOutlineMinus />
                            </button>
                        </div>

                        <button
                            className="cart-btn remove"
                            onClick={() => handleRemove(product.id)}
                            aria-label={`Remover ${product.title}`}
                        >
                            <AiOutlineDelete size={20} />
                        </button>
                    </div>

                </div>
            ))}

            {filteredItems.length > 0 ? (
                <div className="cart-footer">
                    <div className='cart-total'>
                        Total: {Number(totalPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </div>
                    <button onClick={() => navigate('/checkout')} className="checkout-button">
                        Confirmar Compra
                    </button>
                </div>
            ) : (
                <div className='cart-vazio'>
                    Nenhum item no carrinho
                </div>
            )}
        </div>
    );
};

