import { useEffect, useState, useCallback } from "react";
import { useRecipes } from "../services/useRecipes";
import '../styles/botoes.css'
import '../components/Curtidas.css';

// componente para efetuar as curtidas/descurtidas de receitas

const Curtidas = ({ idReceita }) => {
    console.log("MONTANDO CURTIDAS", idReceita);

    const [, setLoading] = useState(false);
    const [, setMessage2] = useState("");
    const [curtidas, setCurtidas] = useState(null);

    const [estadoCurtida, setEstadoCurtida] = useState(false);

    const { LikeService, DeslikeService, CountLike } = useRecipes();
    
    const atualizarCurtidas = useCallback(async () => {
        console.log("BUSCANDO CURTIDAS:", idReceita);
        const total = await CountLike(idReceita);
      
        console.log("RETORNO CURTIDAS:", total);
        setCurtidas(total.count);
    }, [CountLike, idReceita]);

    const handleCurtir = async () => {

        setLoading(true);

        try {
            await LikeService(idReceita);
            setEstadoCurtida(true);
            await atualizarCurtidas();

        } catch (err) {
            setMessage2("Algo deu errado");
        } finally {
            setLoading(false);
        }
    }

    const handleDescurtir = async () => {

        setLoading(true);

        try {
            await DeslikeService(idReceita);
            setEstadoCurtida(false);
            await atualizarCurtidas();

        } catch (err) {
            setMessage2("Algo deu errado");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        const buscar = async () => {
            const total = await CountLike(idReceita);

            setCurtidas(total.count);
        }

        buscar();

    }, [idReceita]);


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