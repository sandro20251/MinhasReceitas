import { Link } from 'react-router-dom';
import Curtidas from '../components/Curtidas';
import './RecipeCard.css';

// Componente que recebe resumo das receitas cadastradas.
const RecipeCard = ({ title, category, user, description, image, id }) => {
    console.log("Imagem:", image);
    console.log("URL:", `${process.env.REACT_APP_URL}/uploads/${image}`);
    return (

        <div className='recipeCardContainer'>
            {image && (
                <img
                    src={`${process.env.REACT_APP_URL}/uploads/${image}`}
                    alt={title}
                    className="recipeImage"
                />
            )}
            <div className='inf'>
                <h2>{title}</h2>
                <h3>{category}</h3>
                <p>{description}</p>
                <Curtidas idReceita={id} />
                <div className='maisdetalhes'>
                    <Link to={`/recipe/${id}`}><span>Mais detalhes</span></Link>
                </div>
            </div>

        </div>
    )
}

export default RecipeCard;