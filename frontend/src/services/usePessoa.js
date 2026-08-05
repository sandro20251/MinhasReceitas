
import { useCallback } from "react";

const url = process.env.REACT_APP_URL_USERS;


const usePessoa = () => {
    const getPessoa = async (id) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${url}/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const json = await res.json();
        return json;
    }

    const readFavorite = useCallback(async () => {

        const token = localStorage.getItem('token');

        const res = await fetch(`${url}/all/favorites`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`
            }
        })


        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }

        return json;
    }, {url})

    const readRecipeFavorite = async (idReceita) => {
        const token = localStorage.getItem('token');

        const res = await fetch(`${url}/${idReceita}/porUsuario`, {
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

    const deleteUser = async () => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${url}/excluirConta`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${token}`
            }
        })

        const json = await res.json();
        if (!res.ok) {
            throw new Error(json.message);
        }

        return json;
    }

    const uploadAvatar = async (file) => {

        const token = localStorage.getItem("token");

        const formData = new FormData();

        formData.append("avatar", file);

        const res = await fetch(`${url}/avatar`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
            },
            body: formData
        });

        const json = await res.json();

        if (!res.ok) {
            throw new Error(json.message);
        }

        return json;
    }

    return { getPessoa, readFavorite, deleteUser, uploadAvatar, readRecipeFavorite }
}

export { usePessoa }