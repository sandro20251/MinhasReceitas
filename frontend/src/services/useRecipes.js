const url = process.env.REACT_APP_URL_RECIPES;

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
    return json;

}

export { createRecipes }