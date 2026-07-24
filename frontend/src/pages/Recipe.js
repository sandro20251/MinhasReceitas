import { useParams } from "react-router-dom";
import { useRecipes } from "../services/useRecipes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Recipe.css";
const Recipe = () => {

    const { receita, readRecipe } = useRecipes();
    const { id } = useParams()


    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [arrayIngredientes, setArrayIngredientes] = useState([]);
    const [arrayPreparation, setArrayPreparation] = useState([]);
    const [usuario, setUsuario] = useState({})

    useEffect(() => {
        const lerReceita = async (id) => {
            setLoading(true)
            try {
                await readRecipe(id);
                setMessage("Aqui esta a receita")

            } catch (err) {
                setMessage("algo deu errado")
            } finally {
                setLoading(false)
            }
        }
        lerReceita(id)
    }, [id])
    useEffect(() => {
        // O uso do "?." garante que o split só roda se receita e ingredients existirem
        if (receita?.ingredients) {
            const array = receita.ingredients.split(",");
            setArrayIngredientes(array);
        } else {
            // Limpa o array caso mude de receita ou venha vazia
            setArrayIngredientes([]);
        }
    }, [receita]);
    useEffect(() => {
        // O uso do "?." garante que o split só roda se receita e ingredients existirem
        if (receita?.preparation) {
            const array = receita.preparation.split(",");
            setArrayPreparation(array);
        } else {
            // Limpa o array caso mude de receita ou venha vazia
            setArrayPreparation([]);
        }
    }, [receita]);


    return (
        <div key={receita.id} className={"recipeContainer"}>
            {
                receita &&
                <div key={receita.id}>
                    <h2>{receita.title}</h2>
                    <img src={receita.image} alt={receita.title}></img>
                    <div className={'dados'}>
                        <h3>Usuário:</h3>
                        <p>{receita.user?.name}</p>
                        <Link to={`/users/${receita.user?._id}`}>Perfil</Link>
                        <img
                            src={receita.user?.image}
                            alt={receita.user?.name}
                        />
                        <h3>Categoria:</h3>
                        <p>{receita.category}</p>
                        <h3>Descrição:</h3>
                        <p>{receita.description}</p>
                        <h3>Ingredientes:</h3>
                        <div>
                            {
                                arrayIngredientes.map((item) => (

                                    <div className={"ingredientes"}>
                                        <p>{item}</p>
                                    </div>

                                ))
                            }
                        </div>
                        <h3>Modo de preparo:</h3>
                        <div>
                            {
                                arrayPreparation.map((item) => (

                                    <div className={"ingredientes"}>
                                        <p>{item}</p>
                                    </div>

                                ))
                            }
                        </div>
                    </div>

                </div>

            }


        </div>
    )
}

export default Recipe;