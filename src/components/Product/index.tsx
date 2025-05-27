import './index.css';

export interface ProductProps {
    id: number;
    title: string;
    image: string;
    description: string;
    price: string;
}
export const Product = ({
    id,title, image, description, price,
}: ProductProps) => {

    const handleProduct = () => {
    }
    return (
        <div className='product-card' onClick={handleProduct}>
            <h3 className='product-title'>{title}</h3>
            <img src={image} alt="Produto" className='product-image' />
            <p className='product-description'>{description}</p>
            <p className='product-price'>{price}</p>
            <button className='product-button'>Ir para o carrinho</button>
        </div>
    );
};
