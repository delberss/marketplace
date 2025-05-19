import Button from '../../components/Button';
import Input from '../../components/Input';
import './index.css';


const handleSubmit = () => {}

const Login:React.FC = () => {
    return(
        <div className="login-container">
            <h1 style={{ marginBottom: '16px', fontSize: '2rem' }}>Login</h1>
            <div className="login-itens">
                <Input type="email" placeholder={"Digite seu email"} />
                <Input type="password" placeholder={"Digite sua senha"} />
                <Button onClick={handleSubmit} type="submit">Login</Button>
            </div>
        </div>
    )
}

export default Login;