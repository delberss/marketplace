import { useSelector } from "react-redux"
import type { RootState } from "../../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';
import { Product, type ProductProps } from "../../components/Product";
import { productsMock } from '../../mock/productsMock';

const Home = () => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.user === null) {
            navigate('/login');
        }
    }, [user.user, navigate])

    return (
        <div className="container-home">
            <div className="container-products">
                {productsMock.map((product: ProductProps, index) => (
                    <Product
                        key={index}
                        id={product.id}
                        title={product.title}
                        image={product.image}
                        description={product.description}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home