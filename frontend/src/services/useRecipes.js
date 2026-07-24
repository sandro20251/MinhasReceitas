import { useEffect, useState } from "react";

const url = process.env.REACT_APP_URL_RECIPES;
const url2 = process.env.REACT_APP_URL_RECEITASUSUARIOS;
const token = localStorage.getItem('token');


const useRecipes = () => {
    const [receita, setReceita] = useState({});
    const lerReceita = async () => {

        const res = await fetch(url);
        const json = await res.json();
        return json;
    }

    const createRecipes = async (objeto) => {

        const token = localStorage.getItem("token");
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(objeto)
        })

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }


    }

    const readRecipe = async(id)=>{
        const res = await fetch(`${url}/${id}`, {
            headers:{
                "authorization":`Bearer ${token}`
            }
        });
        const json = await res.json();
        setReceita(json)
        
    }

    const recipeByUser = async(id)=>{
        const res = await fetch(`${url2}/${id}`, {
            headers:{
                authorization:`Bearer ${token}`
            }
        })

        const json = await res.json();
        return json;
    }

    return { createRecipes, lerReceita, readRecipe,recipeByUser, receita }
}


export { useRecipes }