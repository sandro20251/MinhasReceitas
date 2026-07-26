const url = process.env.REACT_APP_URL_USERS;
const token = localStorage.getItem('token');

const usePessoa = () => {
    const getPessoa = async (id) => {
        const res = await fetch(`${url}/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const json = await res.json();
        return json;
    }

    const readFavorite = async () => {

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
    }

    return { getPessoa, readFavorite }
}

export { usePessoa }