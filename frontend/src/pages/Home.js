import { useEffect, useState } from 'react';
import { useRecipes } from '../services/useRecipes';
import RecipeCard from '../components/RecipeCard';
import Sort from '../components/Sort';

const Home = () => {
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [busca, setBusca] = useState("");
    const [category, setCategory] = useState("");
    const image = null;
    const { lerReceita, searchTitle, searchCategory } = useRecipes();

    const [filtro, setFiltro] = useState("");
    const [ordenacao, setOrdenacao] = useState("");
    const [tempo, setTempo] = useState("")

    const handleBuscar = async (busca) => {
        setLoading(true);
        try {
            const receitas2 = await searchTitle(busca);
            setRecipes(receitas2)
        } catch (err) {
            setMessage(err.message);
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
            setMessage(err.message)
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
                setMessage(err.message)
            } finally {
                setLoading(false)
            }
        }

        ler()

    }, [])

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

    console.log(recipes)
    return (
        <div>
            <h1>Receitas da Comunidade</h1>

            <p>Compartilhe suas melhores receitas.</p>
            <div>
                <input type="text" name="titleSearch" onChange={(e) => setBusca(e.target.value)} value={busca} />
                <button onClick={() => handleBuscar(busca)}>Buscar</button>
            </div>
            <div>
                <Sort filtro={filtro} setFiltro={setFiltro} ordenacao={ordenacao} setOrdenacao={setOrdenacao} tempo={tempo} setTempo={setTempo} handleFiltros={handleFiltros} handleTempo={handleTempo} />
            </div>
            <div>
                <label>
                    Filtrar por categoria:
                    <select name="category" onChange={(e) => setCategory(e.target.value)} value={category}>
                        <option value="">Selecione uma categoria</option>
                        <option value="Doces">Doces</option>
                        <option value="Salgados">Salgados</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Massas">Massas</option>
                        <option value="Carnes">Carnes</option>
                        <option value="Lanches">Lanches</option>
                        <option value="Sobremesas">Sobremesas</option>
                    </select>
                    <button onClick={() => handleFiltrar(category)}>Filtrar</button>
                </label>

            </div>
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