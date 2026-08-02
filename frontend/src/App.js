import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import Recipe from '../src/pages/Recipe';
import UserProfile from './pages/UserProfile';
import Favoritos from './pages/Favoritos';
import DeleteUser from './pages/DeleteUser';

import icone from '../src/styles/icone.jpg';
import Menu from './components/Menu';
import { useState } from 'react';

function App() {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    if (menu === false) {
      setMenu(true);
    } else {
      setMenu(false)
    }

  }
  return (
    <div className="App">
      <BrowserRouter>

        <div className='header1'>
          <div className='menu2'>
            <div className='header1'>
              <img src={icone}></img>

            </div>

            <div >
              <button className='botaoHamburguer' onClick={handleMenu}>☰</button>
            </div>
          </div>

          <div className={'menu'}>
            <Link to="/">Início</Link>
            <Link to="/register">Cadastro</Link>
            <Link to="/login">Login</Link>
            <Link to="/favorites">favoritas</Link>
          </div>

          {
            menu && <Menu />
          }

        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path={`/recipe/:id`} element={<Recipe />} />
          <Route path={`/users/:id`} element={<UserProfile />} />
          <Route path={`/favorites`} element={<Favoritos />} />
          <Route path={`/deleteUser`} element={<DeleteUser />} />
        </Routes>
        <footer>
          <h2>Mapa do site:</h2>
          <div className='divisaoFooter'>
            <div className='subdivisao'>
              <h3>Usuários:</h3>
              <Link to="/register">Registre-se</Link>
              <Link to="/login">Login</Link>
              <Link to="/deleteUser">Excluir conta</Link>
            </div>
            <div className='subdivisao'>
              <h3>Receitas:</h3>
              <Link to="/">Início</Link>
              <Link to="/recipes">Nova receita</Link>
              <Link to="/favorites">Favoritos</Link>
            </div >
            <div className='subdivisao'>
              <h3>Contatos:</h3>
              <a href="https://www.linkedin.com/in/sandro-coelho-30b235283/">Linkedin</a>
              <a href="https://github.com/sandro20251">GitHub</a>
              <a href="https://www.youtube.com/@Zitovideos-r4q">Youtube</a>
            </div>
          </div>
          <p>Produzido por: Sandro da Paixão Coelho @2026</p>

        </footer>

      </BrowserRouter>

    </div>
  );
}

export default App;
