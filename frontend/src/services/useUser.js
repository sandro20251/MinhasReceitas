const url = process.env.REACT_APP_URL_BACKEND;
console.log(url)
const register = async (user) => {

    const res = await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    });

    const json = await res.json();

    if(!res.ok){
        throw new Error(json.message);
    }

    return json;
}

export { register };