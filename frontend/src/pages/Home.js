import { useEffect, useState } from 'react';
import { useRecipes } from '../services/useRecipes';
import RecipeCard from '../components/RecipeCard';
import Sort from '../components/Sort';
import '../styles/inputs.css'
import './Home.css';
import '../styles/botoes.css';
import '../components/RecipeCard.css';
import Recipes from '../pages/Recipes';
import pave from '../styles/pave2.jpg';

// Página inicial
const Home = () => {
    console.log("renderizou home")
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [busca, setBusca] = useState("");
    const [category, setCategory] = useState("");
    
    const { lerReceita, searchTitle, searchCategory } = useRecipes();
    const [filtro, setFiltro] = useState("");
    const [ordenacao, setOrdenacao] = useState("");
    const [tempo, setTempo] = useState("")

    const createMessage = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage("")
        }, 5000)
    }

    const handleBuscar = async (busca) => {
        setLoading(true);
        try {
            const receitas2 = await searchTitle(busca);
            setRecipes(receitas2)
        } catch (err) {
            createMessage(err.message);
            return;
        } finally {
            setLoading(false);
        }
    }

    const handleFiltrar = async (value) => {

        setLoading(true)
        try {
            const recipes = await searchCategory(value);
            setRecipes(recipes);
        } catch (err) {
            createMessage(err.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const ler = async () => {
            setLoading(true)
            try {
                const data = await lerReceita()
                setRecipes(data)
            } catch (err) {
                createMessage(err.message)
            } finally {
                setLoading(false)
            }
        }

        ler()

    }, [lerReceita])

    const handleTempo = (e) => {
        const valor = e.target.value
        setFiltro("tempo");
        setTempo(valor)
        const r = [...recipes]
        if (valor === "Novas") {
            r.sort((a, b) => {
                return b.createdAt.localeCompare(a.createdAt)
            })
            setRecipes(r)
        }

        if (valor === "Velhas") {
            r.sort((a, b) => {
                return a.createdAt.localeCompare(b.createdAt)
            })
            setRecipes(r)
        }
    }

    const handleFiltros = async (e) => {

        const valor = e.target.value
        setOrdenacao(valor)
        const r = [...recipes]
        setFiltro("ordenacao")
        if (valor === "crescente") {
            r.sort((a, b) => {
                return a.title.localeCompare(b.title)
            })
            setRecipes(r)
        }

        if (valor === "decrescente") {
            r.sort((a, b) => {
                return b.title.localeCompare(a.title)
            })
            setRecipes(r)
        }

    }

    return (
        <div className='homeContainer'>

            <div className='procurasContainer'>

                <div>
                    <input type="text" name="titleSearch" onChange={(e) => setBusca(e.target.value)} value={busca} className='inputContainer' />
                    <button onClick={() => handleBuscar(busca)} className='botoesContainer'>Buscar</button>
                </div>

                <div>
                    <label>

                        <select name="category" onChange={(e) => setCategory(e.target.value)} value={category} className='inputContainer'>
                            <option value="">Selecione uma categoria</option>
                            <option value="Doces">Doces</option>
                            <option value="Salgados">Salgados</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Massas">Massas</option>
                            <option value="Carnes">Carnes</option>
                            <option value="Lanches">Lanches</option>
                            <option value="Sobremesas">Sobremesas</option>
                        </select>
                        <button onClick={() => handleFiltrar(category)} className='botoesContainer'>Filtrar</button>
                    </label>

                </div>
                <div>
                    <Sort filtro={filtro} setFiltro={setFiltro} ordenacao={ordenacao} setOrdenacao={setOrdenacao} tempo={tempo} setTempo={setTempo} handleFiltros={handleFiltros} handleTempo={handleTempo} />
                </div>
            </div>
            <div className='banner'>
                <img src={pave} alt="pavê"></img>
            </div>
            <div className='corpoPrincipal'>
                <div className='esquerda'>


                    <Recipes />
                </div>
                <div className='direita'>
                    {
                        message && <p>{message}</p>
                    }
                    {
                        loading ? (<p>Aguarde ...</p>) :
                            (
                                (
                                    recipes.map((item) => {
                                        return (
                                            <div key={item._id} className='recipeMaster'>
                                                <RecipeCard title={item.title} description={item.description} category={item.category} user={item.user} image={item.image} id={item._id} />

                                            </div>
                                        )


                                    })
                                )
                            )
                    }
                </div>
            </div>


        </div>
    )
}

export default Home;