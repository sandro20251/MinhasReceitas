import { useState, useEffect } from "react";
import { usePessoa } from "../services/usePessoa";
import { Link } from 'react-router-dom'
import '../components/RecipeCard.css'
import './Favoritos.css'

const Favoritos = () => {

    const { readFavorite } = usePessoa();
    const [receitas, setReceitas] = useState([]);


    useEffect(() => {

        const lerReceitas = async () => {
            try {
                const r = await readFavorite();

                setReceitas(r);
            } catch (err) {
                console.log(err.message);
            }
        };

        lerReceitas();

    }, [readFavorite]);

    return (
        <div className="favoritosContainer">
            <h1>Favoritos</h1>
            <div className="favoritosWrap">
                {
                    receitas.map((item) => (

                        <div key={item.recipe._id} className='recipeCardContainer'>
                            {item.recipe.image && (
                                <img
                                    src={`http://localhost:5000${item.recipe.image}`}
                                    alt={item.recipe.title}
                                    className='recipeImage'
                                />
                            )}
                            <h2>{item.recipe.title}</h2>

                            <p>{item.recipe.category}</p>

                            <p>{item.recipe.description}</p>
                            <Link to={`/recipe/${item.recipe._id}`}><span>Mais detalhes</span></Link>
                        </div>
                    )

                    )
                }
            </div>

        </div>
    )
}

export default Favoritos;