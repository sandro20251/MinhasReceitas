import { useState } from "react";

const url = process.env.REACT_APP_URL_RECIPES;
const url2 = process.env.REACT_APP_URL_RECEITASUSUARIOS;
import { useCallback } from "react";

const useRecipes = () => {
    const [receita, setReceita] = useState({});
    const [comentarios, setComentarios] = useState([]);

    const lerReceita = useCallback(async () => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Erro ao buscar receitas");
        }

        return await response.json();
    }, []);



    const createRecipes = async (objeto) => {

        const token = localStorage.getItem("token");

        const formData = new FormData();

        formData.append("title", objeto.title);
        formData.append("description", objeto.description);
        formData.append("category", objeto.category);
        formData.append("ingredients", objeto.ingredients);
        formData.append("preparation", objeto.preparation);
        formData.append("image", objeto.image);

        const res = await fetch(url, {
            method: 'POST',
            headers: {

                authorization: `Bearer ${token}`
            },
            body: formData
        })

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }
    }

    const readRecipe = async (id) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${url}/${id}`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        });
        const json = await res.json();
        setReceita(json)

    }

    const recipeByUser = async (id) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${url2}/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        const json = await res.json();
        return json;
    }

    const LikeService = async (idRecipe) => {
        const token = localStorage.getItem('token');
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
        const token = localStorage.getItem('token');
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

        const res = await fetch(`${url}/${idRecipe}/count`, {
            headers: {
                "content-type": "application/json",
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

    const searchTitle = async (busca) => {

        const res = await fetch(`${url}/portitulo?titleSearch=${busca}`)
        const json = await res.json();
        return json;
    }

    const searchCategory = async (busca) => {
        const res = await fetch(`${url}/category?category=${busca}`);

        const json = await res.json();
        return json;

    }

    const deleteRecipe = async (id) => {

        const token = localStorage.getItem('token');

        const res = await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`

            }
        })

        const json = await res.json();
        if (!res.ok) {
            throw new Error(json.message);
        }

        return json;
    }

    const updateRecipes = async (id, objeto) => {

        const token = localStorage.getItem('token');
        const res = await fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(objeto)
        })

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }
        return json;
    }

    const updateComment = async (id, objeto) => {


        const res = await fetch(`${url}/${id}/comments`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",

            },
            body: JSON.stringify(objeto)

        })

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }
        return json;
    }

    const deleteComment = async (id) => {

        const token = localStorage.getItem('token');

        const res = await fetch(`${url}/${id}/comments`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }
        return json;
    }



    return { setReceita, createRecipes, lerReceita, readRecipe, recipeByUser, LikeService, DeslikeService, CountLike, newComment, allComments, addFavorite, removeFavorite, searchTitle, searchCategory, deleteRecipe, updateRecipes, updateComment, receita, comentarios, deleteComment }
}


export { useRecipes }