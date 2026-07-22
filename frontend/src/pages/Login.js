import { useState } from "react";
import { logar } from '../services/useLogin';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        }
        setLoading(true)
        try {
            const response = await logar(user);

            localStorage.setItem('token', response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            setMessage(response.message);
            return;
        } catch (err) {
            setMessage(err.message);
            return;
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1>Faça seu login</h1>
            {
                message && <p>{message}</p>
            }
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input type="email" name="email" placeholder="Digite seu E-mail" onChange={(e) => setEmail(e.target.value)} value={email} />
                </label>
                <label>
                    Senha:
                    <input type="password" name="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} value={password} />
                </label>
                {
                    loading ? (<button type="submit" value="..." disabled>Logar</button>) : (<button type="submit">Logar</button>)
                }

            </form>
        </div>

    )
}

export default Login;