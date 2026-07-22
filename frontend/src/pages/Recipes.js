import { useState } from "react";
import { createRecipes } from "../services/useRecipes";

const Recipes = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [preparation, setPreparation] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");



    const handleCreate = async (e) => {
        e.preventDefault();

        const recipe = {
            title,
            description,
            category,
            ingredients,
            preparation,


        }
        setLoading(true)
        try {
            await createRecipes(recipe)
            setTitle("")
            setDescription("")
            setCategory("")
            setIngredients("")
            setPreparation("")

            setMessage("Receita criada com sucesso!")

            return;

        } catch (err) {
            setMessage(err.message)
            return;
        } finally {
            setLoading(false)
        }
    }



    return (
        <div>
            <h1>Recipes</h1>
            {
                message && <p>{message}</p>
            }
            <form onSubmit={handleCreate}>
                <label>
                    Nome da receita:
                    <input
                        type="text"
                        name="title"
                        placeholder="Digite o nome da receita"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />

                </label>
                <label>
                    Descrição:
                    <textarea
                        name="description"
                        placeholder="Descreva a receita"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />

                </label>
                <label>
                    Categoria:
                    <input
                        type="text"
                        name="category"
                        placeholder="Qual a categoria da receita?"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    />
                </label>
                <label>
                    Ingredientes:
                    <textarea
                        name="ingredients"
                        placeholder="Relacione os ingredientes da receita"
                        onChange={(e) => setIngredients(e.target.value)}
                        value={ingredients}
                    />
                </label>
                <label>
                    Modo de preparo:
                    <textarea
                        name="preparation"
                        placeholder="Descreva o preparo"
                        onChange={(e) => setPreparation(e.target.value)}
                        value={preparation}
                    />
                </label>

                {loading ? (<button type="submit" disabled>...</button>) : (<button type="submit">Enviar</button>)}

            </form>
        </div>

    )
}

export default Recipes;