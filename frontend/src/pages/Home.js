import { useEffect, useState } from 'react';
import { useRecipes } from '../services/useRecipes';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const image = null;
    const { lerReceita } = useRecipes();


    useEffect(() => {
        const ler = async () => {
            setLoading(true)
            try {
                const data = await lerReceita()
                setRecipes(data)
            } catch (err) {
                setMessage(err.message)
            } finally {
                setLoading(false)
            }
        }

        ler()

    }, [])

    return (
        <div>
            <h1>Receitas da Comunidade</h1>

            <p>Compartilhe suas melhores receitas.</p>
            {
                message && <p>{message}</p>
            }
            {
                loading ? (<p>Aguarde ...</p>) :
                    (
                        (
                            recipes.map((item) => {
                                return (
                                    <div key={item._id}>
                                        <RecipeCard title={item.title} description={item.description} category={item.category} user={item.user} image={image} id={item._id} />
                                        <hr></hr>
                                    </div>
                                )


                            })
                        )
                    )
            }

        </div>
    )
}

export default Home;