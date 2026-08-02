import { useState } from "react";
import { useRecipes } from "../services/useRecipes";
import '../styles/botoes.css';
import '../styles/inputs.css';
import '../styles/textarea.css';
import './Recipes.css'
const Recipes = () => {
    const { createRecipes } = useRecipes();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [preparation, setPreparation] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [image, setImage] = useState(null);

    const handleCreate = async (e) => {
        e.preventDefault();

        if (
            !title ||
            !description ||
            !category ||
            !ingredients ||
            !preparation
        ) {
            setMessage("Todos os campos são obrigatórios.");
            return;
        }

        const recipe = {
            title,
            description,
            category,
            ingredients,
            preparation,
            image
        }

        setLoading(true)

        try {
            await createRecipes(recipe)
            setTitle("")
            setDescription("")
            setCategory("")
            setIngredients("")
            setPreparation("")

            setMessage("✅Receita criada com sucesso.")

            return;

        } catch (err) {
            setMessage(err.message)
            return;
        } finally {
            setLoading(false)
        }
    }

    function handleImage(e) {
        setImage(e.target.files[0]);
    }



    return (
        <div className="recipeContainer2">

            {
                message && <p>{message}</p>
            }
            <form onSubmit={handleCreate}>
                <h2><span>Poste uma  receita:</span></h2>
                <label className="labelContainer2">
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
                <label className="labelContainer2">
                    Descrição:
                    <textarea
                        name="description"
                        placeholder="Descreva a receita"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="textareaContainer"
                    />

                </label>
                <label className="labelContainer2">
                    Categoria:
                    <select name="category" onChange={(e) => setCategory(e.target.value)} value={category} className="inputContainer">
                        <option value="Doces" >Doces</option>
                        <option value="Salgados">Salgados</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Massas">Massas</option>
                        <option value="Carnes">Carnes</option>
                        <option value="Lanches">Lanches</option>
                        <option value="Sobremesas">Sobremesas</option>
                    </select>

                </label>
                <label className="labelContainer2">
                    Ingredientes:
                    <textarea
                        name="ingredients"
                        placeholder="Relacione os ingredientes da receita"
                        onChange={(e) => setIngredients(e.target.value)}
                        value={ingredients}
                        className="textareaContainer"
                    />
                </label>
                <label className="labelContainer2">
                    Modo de preparo:
                    <textarea
                        name="preparation"
                        placeholder="Descreva o preparo"
                        onChange={(e) => setPreparation(e.target.value)}
                        value={preparation}
                        className="textareaContainer"
                    />
                </label>
                <div className="fotoReceita">
                    <label>
                        <h2><span>coloque sua imagem:</span></h2>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}

                        />
                    </label>
                    <div>
                        {loading ? (<button type="submit" disabled className="botoesContainer">...</button>) : (<button type="submit" className="botoesContainer">Salvar receita</button>)}
                    </div>
                </div>


            </form>
        </div>

    )
}

export default Recipes;