import ListaTarefas from "./components/ListaTarefa";
import 'bootstrap/dist/css/bootstrap.min.css';

{/* Importação do bootstrap neste arquivo para garantir que as variáveis do bootstrap estejam sendo passadas corretamente */}

import './App.css';

function App(){

  return(
    <>
    <div id="Cabecalho">
      <h1> Gerenciador de Tarefas </h1>
      <ListaTarefas />
    </div>
    </>
  );
}

{/* O App.jsx contém a importação da lista de tarefas assim como o cabeçalho do site e um fragment para evitar a criação de divs desnecessárias*/}

export default App;