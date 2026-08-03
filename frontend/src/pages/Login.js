import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logar } from '../services/useLogin';
import '../styles/botoes.css';
import '../styles/inputs.css';
import './Login.css';
import { Link } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const createMessage = (message) => {
        setTimeout(() => {
            setMessage(message)
        }, 5000)
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            createMessage("❌ Preencha todos os campos");
            return;
        }
        const user = {
            email,
            password
        }
        setLoading(true)
        try {
            const response = await logar(user);

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            createMessage("✅ Login realizado com sucesso.");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            createMessage(err.message);
            return;
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="loginContainer">
            <div className="partea">
                <h1>Minhas Receitas</h1>
                <p>Minhas receitas é uma rede social dedicada ao mundo culinário.</p>
                <p>Compartilhe suas receitas com seus amigos e aprenda novas formas de cozinhar</p>
                <p>Aproveite para conhecer as receitas de seus amigos!</p>
            </div>
            <div className="parteb">
                <h1>Faça seu login</h1>
                {
                    message && <p>{message}</p>
                }
                <form onSubmit={handleLogin}>
                    <div className="camposlogin">
                        <label className="labelContainer">
                            Email:
                            <input type="email" name="email" placeholder="Digite seu E-mail" onChange={(e) => setEmail(e.target.value)} value={email} className="inputContainer" />
                        </label>
                    </div>
                    <div className="camposlogin">
                        <label className="labelContainer">
                            Senha:
                            <input type="password" name="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} value={password} className="inputContainer" />
                        </label>
                    </div>
                    <div className="botao">
                        {
                            loading ? (<button type="submit" disabled className="botoesContainer">Entrando...</button>) : (<button type="submit" className="botoesContainer">Entrar</button>)
                        }

                    </div>
                    <div className="registroLogin">
                        <p>Caso aninda não tenha se cadastrado:</p>
                        <Link to="/register"><span>Registre-se aqui</span></Link>
                    </div>


                </form>
            </div>

        </div>

    )
}

export default Login;