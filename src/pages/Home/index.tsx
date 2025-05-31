import { useSelector } from "react-redux"
import type { RootState } from "../../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';
import { Product, type ProductProps } from "../../components/Product";
import { productsMock } from '../../mock/productsMock';

const Home = () => {
    const user = useSelector((state: RootState) => state.user);
    const searchProduct = useSelector((state: RootState) => state.searchProduct.searchProduct);

    const filteredItems = searchProduct
        ? productsMock.filter(product =>
            product.title.toLowerCase().includes(searchProduct.toLowerCase())
        )
        : productsMock;

    const navigate = useNavigate();

    useEffect(() => {
        if (user.user === null) {
            navigate('/login');
        }
    }, [user.user, navigate])

    return (
        <div className="container-home">
            <div className="container-products">
                {filteredItems.map((product: ProductProps) => (
                    <Product
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        image={product.image}
                        description={product.description}
                        price={product.price}
                        slug={product.slug}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;
