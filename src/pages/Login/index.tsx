import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/userSlice';
import type { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';



const Login: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(login({ email, password }))
    }

    useEffect(() => {
        if (user.user) {
            navigate('/');
        }
    }, [user.user, navigate])
    return (
        <div className="login-container">
            <h1 style={{ marginBottom: '16px', fontSize: '2rem' }}>Login</h1>
            <div className="login-itens">
                <Input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button onClick={handleSubmit} type="submit">Login</Button>
            </div>
        </div>
    )
}

export default Login;