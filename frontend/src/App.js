import './App.css';
import { useTeste } from './hooks/useTeste';
function App() {
  const { dados } = useTeste();
  return (
    <div className="App">
      <h1>Minhas receitas</h1>
      {
        dados.map((item) => (
          <p>Nome:{item.nome}</p>
        ))
      }
    </div>
  );
}

export default App;
