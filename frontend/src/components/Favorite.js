import { useState } from "react";
import { useRecipes } from "../services/useRecipes";
import '../components/Favorite.css';

// componente para favoritar/desfavoritar receita

const Favorite = ({ idReceita }) => {
    const [setBtnAtivo] = useState(false);
    const [setMessage] = useState("");
    const [setLoading] = useState(false);
    const { addFavorite, removeFavorite } = useRecipes();
    const [estadoFavorito, setEstadoFavorito] = useState(false);

    const handleFavoritar = async () => {
        setEstadoFavorito(true)
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
        setEstadoFavorito(false)
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
        <div className="favoriteContainer">
            <div>
                {
                    estadoFavorito && <p>Em favoritos</p>
                }

            </div>
            <div>
                {
                    estadoFavorito ? (<button onClick={handleDesfavoritar} className="starButton2">⭐</button>) : (<button onClick={handleFavoritar} className="starButton">⭐</button>)
                }
            </div>
        </div>
    )
}

export default Favorite;