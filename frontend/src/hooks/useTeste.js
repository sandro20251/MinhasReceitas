import { useEffect, useState } from "react";
import { ler } from "../services/receitaService";

export function useTeste() {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        const buscarDados = async () => {
            const dados2 = await ler();
            setDados(dados2);
        };

        buscarDados();
    }, []);

    return { dados };
}