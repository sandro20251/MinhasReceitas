import { useEffect, useState, useCallback } from "react";
import { useRecipes } from "../services/useRecipes";
import '../styles/botoes.css'
import '../components/Curtidas.css';

// componente para efetuar as curtidas/descurtidas de receitas

const Curtidas = ({ idReceita }) => {

    const [, setLoading] = useState(false);
    const [, setMessage2] = useState("");
    const [, curtidas, setCurtidas] = useState(0);

    const [estadoCurtida, setEstadoCurtida] = useState(false);

    const { LikeService, DeslikeService, CountLike } = useRecipes();

    const atualizarCurtidas = useCallback(async () => {
        const total = await CountLike(idReceita);
        setCurtidas(total.count);
    }, [CountLike, idReceita]);

    const handleCurtir = async () => {
        setEstadoCurtida(true)
        setLoading(true);
        try {
            await LikeService(idReceita);
            await atualizarCurtidas();
            setMessage2("Curtida realizada com sucesso");
            return;
        } catch (err) {
            setMessage2("Algo deu errado");
            return;
        } finally {
            setLoading(false);
        }
    }

    const handleDescurtir = async () => {
        setEstadoCurtida(false)
        setLoading(true);
        try {
            await DeslikeService(idReceita);
            await atualizarCurtidas();
            setMessage2("Descurti a receita");
            return;
        } catch (err) {
            setMessage2("Algo deu errado curtir");
            return;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        atualizarCurtidas();
    }, [atualizarCurtidas]);


    return (
        <div className="curtidasContainer">
            {
                estadoCurtida ? (<button onClick={handleDescurtir} className="heartButton"> ❤️</button>) : (<button onClick={handleCurtir} className="heartButton"> ❤️</button>)
            }

            <div>
                <p>{curtidas}</p>
            </div>
        </div>
    )
}

export default Curtidas;