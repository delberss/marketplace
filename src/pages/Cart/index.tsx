import { useSelector } from 'react-redux';
import './index.css';
import type { RootState } from '../../store/index';
import { productsMock } from '../../mock/productsMock';
import { Product, type ProductProps } from '../../components/Product';

export const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const filteredItems = productsMock.filter(product =>
        cartItems.some(item => item.id === product.id)
    );


    return (
        <div className="cart-container">
            <h2>Carrinho</h2>
            {filteredItems.map((product: ProductProps) => (
                <Product
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    image={product.image}
                    description={product.description}
                    price={product.price}
                />
            ))}
        </div>
    );
};
