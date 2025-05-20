import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './index.css';


const handleSubmit = (

) => { }

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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