import { useEffect, useState } from "react";
import { useRecipes } from "../services/useRecipes";



const Curtidas = ({ idReceita }) => {
    
    const [loading, setLoading] = useState(false);
    const [message2, setMessage2] = useState("");
    const [curtidas, setCurtidas] = useState(0);



    const { LikeService, DeslikeService, CountLike } = useRecipes();



    const atualizarCurtidas = async () => {
        const total = await CountLike(idReceita);

        setCurtidas(total);
    }

    const handleCurtir = async () => {

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
        <div>
            {
                message2 && <p>{message2}</p>
            }
            <div>
                <button onClick={handleCurtir}>Curtir</button>
            </div>
            <div>
                <button onClick={handleDescurtir}>Descurtir</button>
            </div>
            <div>
                <p><span>Curtidas: {curtidas}</span></p>
            </div>
        </div>
    )
}

export default Curtidas;