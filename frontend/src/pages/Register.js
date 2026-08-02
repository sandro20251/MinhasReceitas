import { useState } from "react";
import { register } from '../services/useUser';
import '../styles/botoes.css';
import '../styles/inputs.css';
import './register.css';
import images from '../styles/images.jfif';

// Componente que efetua o cadastro de novo usuário.
const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [conf, setConf] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const createMessage = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage("");
        }, 5000)
    }
    const handleCreateRegister = async (e) => {

        e.preventDefault();
        if (!name || !email || !password || !conf) {
            createMessage("❌ Preencha todos os campos.");
            return;
        }
        const objeto = {
            name,
            email,
            password,
            conf
        }

        setLoading(true);

        try {

           await register(objeto);

            createMessage("✅ Cadastro criado com sucesso.");

            setName("");
            setEmail("");
            setConf("");
            setPassword("");

        } catch (err) {

            createMessage(err.message);
            console.log(err)
        } finally {

            setLoading(false);

        }
    }

    return (
        <div className="registerMaster">
            <div className="divisaoPrincipal">
                <div className="subdivisaoa">
                    <h1>Minhas receitas</h1>
                    <p>Aprenda as melhores receitas de seus amigos.</p>
                    <p>Comente, curta as melhores receitas deles, conecte-se!</p>
                    <img src={images} alt="banner2" className="image"></img>
                </div>
                <div className="subdivisaob">
                    <h1>Cadastre-se aqui</h1>
                    {
                        message && <p>{message}</p>
                    }
                    <form onSubmit={handleCreateRegister} className="registerContainer">
                        <label className="labelContainer">
                            Nome:
                            <input type="text" name="name" placeholder="digite o nome" onChange={(e) => setName(e.target.value)} value={name} className="inputContainer" />
                        </label>
                        <label className="labelContainer">
                            E-mail:
                            <input type="email" name="email" placeholder="digite o e-mail" onChange={(e) => setEmail(e.target.value)} value={email} className="inputContainer" />
                        </label >
                        <label className="labelContainer">
                            Senha:
                            <input type="password" name="password" placeholder="digite a senha" onChange={(e) => setPassword(e.target.value)} value={password} className="inputContainer" />
                        </label>
                        <label className="labelContainer">
                            Confirme a senha:
                            <input type="password" name="conf" placeholder="confirme sua senha" onChange={(e) => setConf(e.target.value)} value={conf} className="inputContainer" />
                        </label>
                        <div className="botao">
                            {
                                loading ? (<input type="submit" disabled value="..." className="botoesContainer" />) : (<input type="submit" value="Cadastrar" className="botoesContainer" />)
                            }
                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;