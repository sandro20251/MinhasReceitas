import { useState } from "react";
import { useRecipes } from "../services/useRecipes";

const Favorite = ({ idReceita }) => {
    const [btnAtivo, setBtnAtivo] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { addFavorite, removeFavorite } = useRecipes();

    const handleFavoritar = async () => {
        setBtnAtivo(true);
        setLoading(true)
        try {
            await addFavorite(idReceita);
            setMessage("Receita favoritada!")
        } catch (err) {
            setMessage("Algo deu errado");
            return;
        } finally {
            setBtnAtivo(false);
        }

    }
    const handleDesfavoritar = async () => {
        setBtnAtivo(false);
        setLoading(true)
        try {
            await removeFavorite(idReceita);
            setMessage("Receita desfavoritada!")
        } catch (err) {
            setMessage("Algo deu errado");
            return;
        } finally {
            setBtnAtivo(false);
        }
    }
    return (
        <div>
            {
                message &&
                <p>{message}</p>
            }
            <button onClick={handleDesfavoritar}>Desfavoritar</button>
            <button onClick={handleFavoritar}>Favoritar</button>



        </div>
    )
}

export default Favorite;