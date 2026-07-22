const urlLogin = process.env.REACT_APP_URL_LOGIN;

const logar = async (objeto) => {
    
    console.log(urlLogin)
    const res = await fetch(urlLogin, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(objeto)
    })

    const json = await res.json();
    if (!res.ok) {
        throw new Error(json.message);
    }
    return json;
}

export { logar }