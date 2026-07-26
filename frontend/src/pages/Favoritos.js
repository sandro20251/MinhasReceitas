import { useState, useEffect } from "react";
import { usePessoa } from "../services/usePessoa";

const Favoritos = () => {

    const { readFavorite } = usePessoa();
    const [receitas, setReceitas] = useState([]);


    useEffect(() => {

        const lerReceitas = async () => {
            try {
                const r = await readFavorite()
               
                setReceitas(r)
            } catch (err) {
                console.log(err.message)
            }

        }
        lerReceitas();
    }, [])
    console.log(receitas)
    return (
        <div>
            <h1>Favoritos</h1>
            {
                receitas.map((item) => (

                    <div key={item._id}>

                        <h2>{item.recipe.title}</h2>

                        <p>{item.recipe.category}</p>

                        <img
                            src={item.recipe.image}
                            alt={item.recipe.title}
                        />

                    </div>
                )

                )
            }
        </div>
    )
}

export default Favoritos;