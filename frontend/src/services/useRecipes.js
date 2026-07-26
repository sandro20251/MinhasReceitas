import { useState } from "react";

const url = process.env.REACT_APP_URL_RECIPES;
const url2 = process.env.REACT_APP_URL_RECEITASUSUARIOS;
const token = localStorage.getItem('token');


const useRecipes = () => {
    const [receita, setReceita] = useState({});
    const [comentarios, setComentarios] = useState([]);
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

    const readRecipe = async (id) => {
        const res = await fetch(`${url}/${id}`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        });
        const json = await res.json();
        setReceita(json)

    }

    const recipeByUser = async (id) => {
        const res = await fetch(`${url2}/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        const json = await res.json();
        return json;
    }

    const LikeService = async (idRecipe) => {
        const res = await fetch(`${url}/${idRecipe}/like`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`
            }
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }

        return json;
    }

    const DeslikeService = async (idRecipe) => {
        const res = await fetch(`${url}/${idRecipe}/like`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`
            }

        })

        const json = await res.json();
        return json;
    }

    const CountLike = async (idRecipe) => {
        const token = localStorage.getItem("token");

        const res = await fetch(`${url}/${idRecipe}/count`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`
            }
        })

        const json = await res.json();
        return json;
    }

    const newComment = async (idRecipe, comment) => {

        const token = localStorage.getItem('token');

        const res = await fetch(`${url}/${idRecipe}/comments`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(comment)
        })

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }


        return json;
    }

    const allComments = async (idRecipe) => {

        const token = localStorage.getItem('token');

        const res = await fetch(`${url}/${idRecipe}/comments`, {
            headers: {

                authorization: `Bearer ${token}`
            }
        })



        const json = await res.json();
        if (!res.ok) {
            throw new Error(json.message);
        }

        await setComentarios(json)

        return json;
    }

    const addFavorite = async (idRecipe) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${url}/${idRecipe}/favorite`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const json = await res.json();
        if (!res.ok) {
            throw new Error(json.message);
        }


        return json;
    }

    const removeFavorite = async (idRecipe) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${url}/${idRecipe}/favorite`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const json = await res.json();
        if (!res.ok) {
            throw new Error(json.message);
        }

        return json;
    }

    return { createRecipes, lerReceita, readRecipe, recipeByUser, LikeService, DeslikeService, CountLike, newComment, allComments, addFavorite, removeFavorite, receita, comentarios }
}


export { useRecipes }