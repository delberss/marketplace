import Button from "../../components/Button";
import Input from "../../components/Input";
import './index.css'

const handleSubmit = () => {

}
const SignUp: React.FC = () => {
    return (
        <div className="signUp-container">
            <h1 style={{ marginBottom: '16px', fontSize: '2rem' }}>Sign Up</h1>
            <div className="signUp-itens">
                <Input type="text" placeholder={"Digite seu nome"} />
                <Input type="email" placeholder={"Digite seu email"} />
                <Input type="password" placeholder={"Digite sua senha"} />
                <Button onClick={handleSubmit} type="submit">Sign Up Now</Button>
            </div>
        </div>
    )
}

export default SignUp;