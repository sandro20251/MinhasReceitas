import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {

  return (
    <div className="App">
      <h1>Minhas receitas</h1>
      <Register />
      <Login />
      <Recipes />
    </div>
  );
}

export default App;
