
import { useRecipes } from "../services/useRecipes";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Curtidas from '../components/Curtidas';
import Comment from "../components/Comment";
import Favorite from '../components/Favorite';
import { useNavigate } from "react-router-dom";

import "./Recipe.css";
import '../styles/botoes.css';
import '../styles/inputs.css';
import '../styles/textarea.css';

// Componente que mostra a receita
const Recipe = () => {
    const navigate = useNavigate()
    const { receita, readRecipe, newComment, allComments, deleteRecipe, updateRecipes, updateComment, comentarios, deleteComment } = useRecipes();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [arrayIngredientes, setArrayIngredientes] = useState([]);
    const [arrayPreparation, setArrayPreparation] = useState([]);
    const [confExclusao, setConfExclusao] = useState(false);
    const [alterarReceita, setAlterarReceita] = useState(false);

    const [checkComment, setCheckComment] = useState(false);
    const [comment, setComment] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [preparation, setPreparation] = useState("");

    const [alterando, setAlterando] = useState("");

    const createMessage = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage("");
        }, 5000)
    }
    const handleComentar = async () => {
        setLoading(true)
        try {
            await newComment(id, { text: comment })
            await allComments(id);
            setComment("");
            setCheckComment(false);
        } catch (err) {
            createMessage(err.message);

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const lerReceita = async (id) => {
            setLoading(true)
            try {
                await readRecipe(id);

            } catch (err) {
                createMessage(err.message)
            } finally {
                setLoading(false)
            }
        }
        lerReceita(id)
    }, [id, readRecipe])

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
                await allComments(id)
                
            } catch (err) {
                console.log(err.message)
            }
        }
        allComments2()

    }, [allComments, id])

    const handleConfirmarExclusao = () => {
        setConfExclusao(true);
    }

    const handleExcluirReceita = async (id) => {

        setLoading(true)
        try {
            await deleteRecipe(id);
            navigate(-1)
        }
        catch (err) {
            createMessage(err.message);
            return;
        } finally {
            setLoading(false)
        }
    }

    const handleCancelarExclusao = () => {
        setConfExclusao(false);
    }

    const handleAbrirAlterar = () => {
        setAlterarReceita(true)
        setTitle(receita.title)
        setCategory(receita.category)
        setDescription(receita.description)
        setIngredients(receita.ingredients)
        setPreparation(receita.preparation)
    }

    const handleCancelarAlteracao = () => {
        setAlterarReceita(false);
    }

    const handleAtualizar = async () => {
        const recipe = {
            title,
            description,
            category,
            ingredients,
            preparation
        }

        setLoading(true);
        try {
            await updateRecipes(receita._id, recipe);
            await readRecipe(id);
            createMessage("✅ Receita atualizada com sucesso.")
            setAlterarReceita(false);
        } catch (err) {
            createMessage(err.message);
            return;
        } finally {
            setLoading(false);
        }
    }

    const handleAlterarComentario = async (id) => {
        setAlterando(id)
        console.log(alterando)
      
    }
    const id2 = id;
    console.log(id2)
    const handleAtualizarComentario = async (id) => {
        console.log(id)
        setLoading(true)
        
        const comment3 = {
            text: comment,
        }
        console.log(comment3)

        try {

            await updateComment(id, comment3);
            await allComments(id2)
            createMessage("✅Comentário atualizado com sucesso.")
            setAlterando(null);
        } catch (err) {

            createMessage(err.message);
            return;
        } finally {
            setLoading(false);
        }
    }

    const handleExcluirComentario = async (id) => {
        try {
            await deleteComment(id);
            createMessage("✅Comentário excluído com sucesso.")
            await allComments(id2)
        } catch (err) {
            createMessage(err.message);
            return;
        }
    }

    const handleCancelar = () => {
        setAlterando(null);
        navigate(-1);
    }

    console.log(comentarios)

    return (

        <div key={receita.id} className="recipeContainer">
            <div className="divisao10">
                <div className="imagemReceita">
                    {receita.image && typeof receita.image === "string" && (
                        <img
                            src={`${process.env.REACT_APP_URL}${receita.image.startsWith("/uploads")
                                ? receita.image
                                : `/uploads/${receita.image}`
                                }`}
                            alt={title}
                            className="recipeImage"
                        />
                    )}
                </div>
                <div className="dados">
                    <div>{message && <p>{message}</p>}</div>
                    {loading ? (<p>Aguarde...</p>) : (

                        receita &&
                        <div key={receita.id}>
                            <h2><span>{receita.title}</span></h2>


                            <div className="org1">
                                <div className="acoes">
                                    <Favorite idReceita={receita._id} />
                                    {
                                        receita?._id && (
                                            <Curtidas idReceita={receita._id} />
                                        )
                                    }


                                </div>

                            </div>
                            <div>
                                <div>

                                    {
                                        alterarReceita ? (
                                            <div>
                                                <form>
                                                    <label className="labelContainer">
                                                        Nome da receita:
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            placeholder="Digite o nome da receita"
                                                            onChange={(e) => setTitle(e.target.value)}
                                                            value={title}
                                                            className="inputContainer"
                                                        />

                                                    </label>
                                                    <label className="labelContainer">
                                                        Descrição:
                                                        <textarea
                                                            name="description"
                                                            placeholder="Descreva a receita"
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            value={description}
                                                            className="textareaContainer"
                                                        />

                                                    </label >
                                                    <label className="labelContainer">
                                                        Categoria:
                                                        <select name="category" onChange={(e) => setCategory(e.target.value)} value={category} className="inputContainer">

                                                            <option value="Doces">Doces</option>
                                                            <option value="Salgados">Salgados</option>
                                                            <option value="Bebidas">Bebidas</option>
                                                            <option value="Massas">Massas</option>
                                                            <option value="Carnes">Carnes</option>
                                                            <option value="Lanches">Lanches</option>
                                                            <option value="Sobremesas">Sobremesas</option>
                                                        </select>

                                                    </label>
                                                    <label className="labelContainer">
                                                        Ingredientes:
                                                        <textarea
                                                            name="ingredients"
                                                            placeholder="Relacione os ingredientes da receita"
                                                            onChange={(e) => setIngredients(e.target.value)}
                                                            value={ingredients}
                                                            className="textareaContainer"
                                                        />
                                                    </label>
                                                    <label className="labelContainer">
                                                        Modo de preparo:
                                                        <textarea
                                                            name="preparation"
                                                            placeholder="Descreva o preparo"
                                                            onChange={(e) => setPreparation(e.target.value)}
                                                            value={preparation}
                                                            className="textareaContainer"
                                                        />
                                                    </label>

                                                </form>
                                                <button onClick={handleAtualizar} className="botoesContainer">Atualizar</button>
                                                <button onClick={handleCancelarAlteracao} className="botoesContainer">Cancelar</button>
                                            </div>
                                        ) : (
                                            <>  <div className="dadosprontos">
                                                <div className="parte1">
                                                    <h3><span>Usuário:</span></h3>
                                                    <div className="fotoPerfil">
                                                        <p>{receita.user?.name}</p>
                                                        <img
                                                            src={
                                                                receita.user?.avatar
                                                                    ? `${process.env.REACT_APP_URL_USERS}/uploads/${receita.user?.avatar}`
                                                                    : "/avatarPadrao.png"
                                                            }
                                                            alt="Avatar"
                                                            className="avatarImage"
                                                        />

                                                    </div>

                                                    <Link to={`/users/${receita.user?._id}`}><span>Perfil</span></Link>
                                                </div>

                                                <div className="parte1">
                                                    <h3><span>Categoria:</span></h3>
                                                    <p>{receita.category}</p>
                                                    <h3><span>Descrição:</span></h3>
                                                    <p>{receita.description}</p>
                                                </div>
                                                <div className="parte1">
                                                    <h3><span>Ingredientes:</span></h3>
                                                    <div>
                                                        {
                                                            arrayIngredientes.map((item) => (

                                                                <div className={"ingredientes"} >
                                                                    <p>{item}</p>
                                                                </div>

                                                            ))
                                                        }
                                                    </div>
                                                    <h3><span>Modo de preparo:</span></h3>
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

                                                <div className="parte1">
                                                    <button onClick={handleAbrirAlterar} className="starButton">✏️</button>
                                                    {
                                                        confExclusao ? (confExclusao && <div>
                                                            <p>Tem certeza que deseja excluir esta receita?</p>
                                                            <button onClick={() => handleExcluirReceita(receita._id.toString())} className="botoesContainer">Sim</button>
                                                            <button onClick={handleCancelarExclusao} className="botoesContainer">Não</button>
                                                        </div>) : (<button onClick={() => handleConfirmarExclusao()} className="starButton">🗑️</button>)
                                                    }


                                                </div>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="divisao20">

                <div>
                    <div>
                        {
                            checkComment ? (

                                <div>

                                    <Comment comment={comment} setComment={setComment} />
                                    <button onClick={handleComentar} className="botoesContainer">Comentar</button>
                                </div>
                            ) : (

                                <div>
                                    <button onClick={() => setCheckComment(true)} className="botoesContainer">Comente aqui</button>
                                </div>
                            )
                        }
                    </div>
                    {
                        comentarios.map((item) =>
                            item._id === alterando ? (
                                <div key={item._id}>
                                    <Comment comment={comment} setComment={setComment} />
                                    <button onClick={() => handleAtualizarComentario(item._id)} className="botoesContainer">Atualizar</button>
                                    <button onClick={handleCancelar} className="botoesContainer">Voltar</button>
                                </div>
                            ) : (

                                <div key={item._id} className="comentario">
                                    <div className="fotoComentario">
                                        <img
                                            src={
                                                item.user.avatar
                                                    ? `${process.env.REACT_APP_URL}/uploads/${item.user.avatar}`
                                                    : "/avatarPadrao.png"
                                            }
                                            alt="Avatar"
                                            className="avatarImage"
                                        />
                                    </div>
                                    <div className="corpoComentario">
                                        <p><span>Nome:</span> {item.user?.name}</p>
                                        <p>
                                            <span>Data:</span> {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                                        </p>
                                        <span>Comentário: </span>
                                        <p className="comentarioTexto">{item.text}</p>
                                        <div className="botoesComentario">
                                            <button onClick={() => handleAlterarComentario(item._id)} className="starButton">
                                                ✏️
                                            </button>
                                            {/* aqui exclusão */}
                                            <button onClick={() => handleExcluirComentario(item._id)} className="starButton">🗑️</button>
                                        </div>
                                    </div>

                                </div>
                            )
                        )
                    }
                </div>

            </div>
        </div>


    )
}

export default Recipe;