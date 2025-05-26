import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import './index.css'
import { useNavigate } from "react-router-dom";


const SignUp: React.FC = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/');
    }


    return (
        <div className="signUp-container">
            <h1 style={{ marginBottom: '16px', fontSize: '2rem' }}>Sign Up</h1>
            <div className="signUp-itens">
                <Input type="text" placeholder={"Digite seu nome"} value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input type="email" placeholder={"Digite seu email"} value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input type="password" placeholder={"Digite sua senha"} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleSubmit} type="submit">Sign Up Now</Button>
            </div>
        </div>
    )
}

export default SignUp;