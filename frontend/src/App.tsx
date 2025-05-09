import "./App.css";
import { BeeTextArea } from "./components/BeeTextArea/BeeTextArea";  // Remova a barra no final

function App() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <BeeTextArea
        id="descricao"
        label="Descrição"
        placeholder="Fale mais um pouco sobre você..."
        defaultValue=""
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
}

export default App;
