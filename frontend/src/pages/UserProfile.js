import { useParams, useSearchParams } from "react-router-dom";
import { usePessoa } from '../services/usePessoa';
import { useRecipes } from "../services/useRecipes";
import RecipeCard from '../components/RecipeCard';

import { useEffect, useState } from "react";

const UserProfile = () => {
    const [usuario, setUsuario] = useState({});
    const [receitas, setReceitas] = useState([]);

    const { id } = useParams();
   
    const { getPessoa } = usePessoa();
    const { recipeByUser } = useRecipes();

    useEffect(() => {
        const lerPessoa = async () => {
            const pessoa = await getPessoa(id);
            setUsuario(pessoa);
        }
        lerPessoa()
    }, [id])

    useEffect(() => {
        const lerReceitas = async () => {
            const recipes = await recipeByUser(id);
            setReceitas(recipes);
        }
        lerReceitas();
    }, [id])
    
    return (
        <div>

            <h2>{usuario.name}</h2>
            <img src={usuario.image} alt={usuario.name} />
            <h3>{usuario.email}</h3>
            <hr></hr>
            <div>
                {
                    receitas.map((item) => {
                        return (
                            <div key={item._id}>
                                <RecipeCard id={item._id} title={item.title} category={item.category} description={item.description} user={item.user} />
                                <hr></hr>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default UserProfile;