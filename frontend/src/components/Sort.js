
import '../styles/inputs.css';

const Sort = ({ filtro, setFiltro, ordenacao, setOrdenacao, tempo, setTempo, handleFiltros, handleTempo }) => {

    return (
        <div>

            <select name="ordenacao" onChange={(e) => handleFiltros(e)} value={ordenacao} className='inputContainer'>
                <option value="crescente">A-Z</option>
                <option value="decrescente">Z-A</option>
            </select>

            <select name="tempo" onChange={(e) => handleTempo(e)} value={tempo} className='inputContainer'>
                <option value="Novas">Recentes</option>
                <option value="Velhas">Mais antigas</option>
            </select>
        </div>
    )
}

export default Sort;