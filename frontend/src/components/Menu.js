import { Link } from "react-router-dom";
import './Menu.css';
// Componente de menu hamburguer
const Menu = () => {
    return (
        <div className="menu3">
            <Link to="/">Início</Link>
            <Link to="/register">Cadastro</Link>
            <Link to="/login">Login</Link>
            <Link to="/favorites">favoritas</Link>

        </div>
    )
}
export default Menu;