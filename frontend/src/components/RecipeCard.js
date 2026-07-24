import { Link } from 'react-router-dom';


const RecipeCard = ({ title, category, user, description, image, id }) => {
    return (
        <div>
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <h3>{category}</h3>
            <p>{description}</p>
            <div>
                <Link to={`/recipe/${id}`}>Mais detalhes</Link>
            </div>
        </div>

    )
}

export default RecipeCard;