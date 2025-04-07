import ListaTarefas from "./components/ListaTarefa";
import 'bootstrap/dist/css/bootstrap.min.css';

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

export default App;