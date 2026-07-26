
import { useRecipes } from "../services/useRecipes";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Curtidas from '../components/Curtidas';
import Comment from "../components/Comment";
import Favorite from '../components/Favorite';

import styles from "./Recipe.css";

const Recipe = () => {

    const { receita, readRecipe, newComment, allComments, comentarios } = useRecipes();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [arrayIngredientes, setArrayIngredientes] = useState([]);
    const [arrayPreparation, setArrayPreparation] = useState([]);
    const [usuario, setUsuario] = useState({})

    const [checkComment, setCheckComment] = useState(false);
    const [comment, setComment] = useState("");


    const handleComentar = async () => {
        setLoading(true)
        try {
            await newComment(id, { text: comment })
            await allComments(id);
            setComment("");
            setCheckComment(false);
        } catch (err) {
            setMessage("algo deu errado");

        } finally {
            setLoading(false)
        }

    }

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

    useEffect(() => {

        const allComments2 = async () => {
            try {
                await readRecipe(id);

                await allComments(id)

            } catch (err) {
                console.log({ message: err.message })
            }


        }
        allComments2()

    }, [receita._id])


    return (
        <div key={receita.id} className={"recipeContainer"}>
            {
                receita &&
                <div key={receita.id}>
                    <h2>{receita.title}</h2>
                    <img src={receita.image} alt={receita.title}></img>

                    {
                        receita?._id && (
                            <Curtidas idReceita={receita._id} />
                        )
                    }
                    <hr></hr>
                    <Favorite idReceita={receita._id} />

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
                    <div>
                        {
                            checkComment ? (

                                <div>

                                    <Comment comment={comment} setComment={setComment} />
                                    <button onClick={handleComentar}>Comentar</button>
                                </div>
                            ) : (

                                <div>
                                    <button onClick={() => setCheckComment(true)}>Comente aqui</button>
                                </div>
                            )
                        }
                    </div>
                    <div>
                        {
                            comentarios.map((item) => (

                                <div key={item._id}>
                                    <p>nome:{item.user?.name}</p>
                                    <p>
                                        Data: {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                                    </p>
                                    <p>Comentário:{item.text}</p>
                                    <hr></hr>
                                </div>

                            ))
                        }
                    </div>

                </div>

            }


        </div>
    )
}

export default Recipe;