import { useState } from "react";
import { usePessoa } from "../services/usePessoa";
import { useNavigate } from "react-router-dom";
import '../styles/botoes.css';
import './DeleteUser.css';

const DeleteUser = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [setExclusao] = useState(false)

    const { deleteUser } = usePessoa();

    const createMessage = (message) => {
        setTimeout(() => {
            setMessage(message);
        }, 5000)
    }
    const handleExcluirConta = async () => {
        setLoading(true);
        try {

            await deleteUser();
            setExclusao(true);
            navigate('/');

        } catch (err) {
            createMessage(err.message);
            return;
        } finally {
            setLoading(false);
        }

    }
    const handleCancelarExclusao = () => {
        setLoading(false)
        navigate(-1)
    }
    return (
        <div className="deleteContainer">
            {
                message && <p>{message}</p>
            }

            <h2><span>Deletando usuário</span></h2>
            <p>Tem certeza que deseja deletar este usuário?</p>
            <div className="deleteBotao">
                {
                    loading ? (<div><button onClick={handleExcluirConta} disabled  className="deleteBotao">...</button>
                        <button disabled className="botoesContainer">...</button></div>) : (<div><button onClick={handleExcluirConta} className="botoesContainer">sim</button>
                            <button className="botoesContainer" onClick={handleCancelarExclusao}>Não</button></div>)
                }
            </div>
        </div>
    )
}

export default DeleteUser;