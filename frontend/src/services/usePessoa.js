const url = process.env.REACT_APP_URL_USERS;
const token = localStorage.getItem('token');

const usePessoa = () => {
    const getPessoa = async (id) => {
        const res = await fetch(`${url}/${id}`, {
            headers:{
                authorization: `Bearer ${token}`
            }       
        })
        const json = await res.json();
        return json;
    }

    return { getPessoa }
}

export { usePessoa }