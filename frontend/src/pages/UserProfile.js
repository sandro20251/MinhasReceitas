import { useParams, Link } from "react-router-dom";
import { usePessoa } from '../services/usePessoa';
import { useRecipes } from "../services/useRecipes";
import RecipeCard from '../components/RecipeCard';

import './UserProfile.css'


import { useEffect, useState } from "react";
// Componente que mostra a página de usuário
const UserProfile = () => {
    const [avatar, setAvatar] = useState(null);
   
    const [usuario, setUsuario] = useState({});
    const [receitas, setReceitas] = useState([]);

    const { id } = useParams();

    const { getPessoa, uploadAvatar } = usePessoa();
    const { recipeByUser } = useRecipes();

    useEffect(() => {
        const lerPessoa = async () => {
            const pessoa = await getPessoa(id);
            setUsuario(pessoa);
        }
        lerPessoa()
    }, [getPessoa])

    useEffect(() => {
        const lerReceitas = async () => {
            const recipes = await recipeByUser(id);
            setReceitas(recipes);
        }
        lerReceitas();
    }, [getPessoa])

    const handleUploadAvatar = async (file) => {
        if (!avatar) {
            alert("Selecione uma imagem.");
            return;
        }

        try {

            const response = await uploadAvatar(avatar);

            setUsuario({
                ...usuario,
                avatar: response.avatar
            });

            alert(response.message);

        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="perfilContainer">
            <div className="avatarContainer">
                <img
                    src={
                        usuario.avatar
                            ? `http://localhost:5000/uploads/${usuario.avatar}`
                            : "/avatarPadrao.png"
                    }
                    alt="Avatar"
                    className="avatarImage"
                />
            </div>
            <div className="apresentacao">
                <h2><span>{usuario.name}</span></h2>

                <h3>{usuario.email}</h3>
                <hr></hr>
                <Link to="/deleteUser"><span>Excluir conta</span></Link>

            </div>
            <div className="addFotoPerfil">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                />
                <button onClick={() => handleUploadAvatar(avatar)} className="botoesContainer">
                    Salvar foto
                </button>
            </div>
            <h2><span>Minhas receitas:</span></h2>

            <div className="perfilWrap">
                {
                    receitas.map((item) => {
                        return (
                            <div key={item._id}>
                                <RecipeCard id={item._id} title={item.title} category={item.category} description={item.description} user={item.user} image={item.image} />
                                <hr></hr>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default UserProfile;