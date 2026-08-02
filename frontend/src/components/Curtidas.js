import { useEffect, useState } from "react";
import { useRecipes } from "../services/useRecipes";
import '../styles/botoes.css'
import '../components/Curtidas.css';


const Curtidas = ({ idReceita }) => {

    const [loading, setLoading] = useState(false);
    const [message2, setMessage2] = useState("");
    const [curtidas, setCurtidas] = useState(0);

    const [estadoCurtida, setEstadoCurtida] = useState(false);

    const { LikeService, DeslikeService, CountLike } = useRecipes();



    const atualizarCurtidas = async () => {
        const total = await CountLike(idReceita);

        setCurtidas(total);
    }

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
    }, [idReceita]);


    return (
        <div className="curtidasContainer">
            {
                estadoCurtida ? (<button onClick={handleDescurtir} className="heartButton"> ❤️</button> ):(<button onClick={handleCurtir} className="heartButton"> ❤️</button>)
            }
          
            <div>
                <p>{curtidas}</p>
            </div>
        </div>
    )
}

export default Curtidas;