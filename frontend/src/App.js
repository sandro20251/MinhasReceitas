import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import Recipe from '../src/pages/Recipe';
import UserProfile from './pages/UserProfile';
import Favoritos from './pages/Favoritos';


function App() {


  return (
    <div className="App">
      <h1>Minhas receitas</h1>
      <BrowserRouter>
        <div className={'menu'}>
          <Link to="/">Home</Link>
          <Link to="/register">Registre-se aqui</Link>
          <Link to="/login">Login</Link>
          <Link to="/recipes">Receitas</Link>
          <Link to="/favorites">Receitas favoritas</Link>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path={`/recipe/:id`} element={<Recipe />} />
          <Route path={`/users/:id`} element={<UserProfile />} />
          <Route path={`/favorites`} element={<Favoritos />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
