import { useSelector } from "react-redux"
import type { RootState } from "../../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import './index.css';

const Home = () => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.user === null) {
            navigate('/login');
        }
    }, [user.user, navigate])

    return (
        <div className="container">
            <Header />
        </div>
    )
}

export default Home