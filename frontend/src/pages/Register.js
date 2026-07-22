import { useState } from "react";
import { register } from '../services/useUser';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conf, setConf] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleCreateRegister = async (e) => {

        e.preventDefault();

        const objeto = {
            name,
            email,
            password,
            conf
        }

        setLoading(true);

        try {

            const response = await register(objeto);

            setMessage(response.message);

            setName("");
            setEmail("");
            setConf("");
            setPassword("");

        } catch (err) {

            setMessage("Requisição recusada, algum erro ocorreu");
            console.log(err)
        } finally {

            setLoading(false);

        }
    }

    return (
        <div>
            <h1>Register</h1>
            {
                message && <p>{message}</p>
            }
            <form onSubmit={handleCreateRegister}>
                <label>
                    Nome:
                    <input type="text" name="name" placeholder="digite o nome do novo usuário" onChange={(e) => setName(e.target.value)} value={name} />
                </label>
                <label>
                    E-mail:
                    <input type="email" name="email" placeholder="digite o e-mail do novo usuário" onChange={(e) => setEmail(e.target.value)} value={email} />
                </label>
                <label>
                    Senha:
                    <input type="password" name="password" placeholder="digite a senha" onChange={(e) => setPassword(e.target.value)} value={password} />
                </label>
                <label>
                    Confirme a senha:
                    <input type="password" name="conf" placeholder="confirme sua senha" onChange={(e) => setConf(e.target.value)} value={conf} />
                </label>
                {
                    loading ? (<input type="submit" disabled value="..." />) : (<input type="submit" value="Cadastrar" />)
                }

            </form>
        </div>


    )
}

export default Register;