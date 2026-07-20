const url = "http://localhost:5000/"

const ler = async() => {
    const res = await fetch(url);
    const json = await res.json();
    return json
}

export { ler }