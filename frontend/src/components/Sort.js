import { useState } from "react";

const Sort = ({ filtro, setFiltro, ordenacao, setOrdenacao, tempo, setTempo, handleFiltros, handleTempo }) => {

    return (
        <div>
            <h1>filtros:</h1>
            <select name="ordenacao" onChange={(e) => handleFiltros(e)} value={ordenacao}>
                <option value="crescente">A-Z</option>
                <option value="decrescente">Z-A</option>
            </select>
            <button>Mais curtidas</button>
            <select name="tempo" onChange={(e) => handleTempo(e)} value={tempo}>
                <option value="Novas">Recentes</option>
                <option value="Velhas">Mais antigas</option>
            </select>
        </div>
    )
}

export default Sort;