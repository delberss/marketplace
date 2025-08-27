import './index.css';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../store/cartSlice';
import { useEffect, useState } from 'react';
import { productsMock } from '../../mock/productsMock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProductDetail = () => {
  const dispatch = useDispatch();
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<typeof productsMock[0] | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = productsMock.find((p) => p.slug === slug);
    setProduct(foundProduct || null);
  }, [slug]);

  const handleAddToCart = () => {
    if (!product || addedToCart) return;

    dispatch(addToCart({
      id: product.id,
      quantity: 1,
      price: Number(product.price),
      description: product.description
    }));

    toast.success('Produto adicionado ao carrinho!', {
      position: 'bottom-center',
      autoClose: 2000,
      theme: 'colored',
    });

    setAddedToCart(true); // ← Define como adicionado
  };

  const handleBuy = () => {
    if (!product) return;

    dispatch(addToCart({
      id: product.id,
      quantity: 1,
      price: Number(product.price),
      description: product.description
    }));

    navigate('/cart');
  };

  if (!product) return <div>Produto não encontrado.</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="product-detail-images">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-detail-price">
            {Number(product.price).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <p>{product.description}</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={addedToCart ? 'added-button' : ''}
            >
              {addedToCart ? 'Produto adicionado ao carrinho' : 'Adicionar ao carrinho'}
            </button>

            <button onClick={handleBuy}>Comprar</button>
          </div>
        </div>

      </div>
      <div className="product-detail-extra">
        <h2>Detalhes do produto</h2>
        <p>{product?.details}</p>
      </div>
      <ToastContainer />
    </div>
  );
};
