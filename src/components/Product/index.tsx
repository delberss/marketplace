import { useDispatch } from 'react-redux';
import './index.css';
import { addToCart } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';

export interface ProductProps {
    id: string;
    title: string;
    image: string;
    description: string;
    price: string;
    slug: string;
}

export const Product = ({
    id, title, image, description, price, slug
}: ProductProps) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleProduct = () => {
        navigate(`/product/${slug}`);
    }

    const handleCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(addToCart({ id, quantity: 1 }));
        navigate('/cart');
    };


    return (
        <div className='product-card' onClick={handleProduct}>
            <h3 className='product-title'>{title}</h3>
            <img src={image} alt="Produto" className='product-image' />
            <p className='product-description'>{description}</p>
            <p className='product-price'>
                {Number(price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
            <button className='product-button' onClick={handleCart}>
                Ir para o carrinho
            </button>
        </div>
    );
};
