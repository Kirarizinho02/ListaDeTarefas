import { useState } from "react";
import style from './ListaTarefa.module.css'

function ListaTarefas(){
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');

    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            setTarefas([...tarefas, novaTarefa]);
            setNovaTarefa("");
        }
    };

    const removerTarefa = (indice) => {
        setTarefas(tarefas.filter((_, i ) => i !== indice));
    };

    return (
        <div className={style.ListaTarefa}>
            <h2> Lista de Tarefas </h2>
            <div className={style.InputContainer}>
                <input 
                    type='text' 
                    value={novaTarefa} 
                    onChange={(e) => setNovaTarefa(e.target.value)} 
                    placeholder="Digite uma nova tarefa." 
                />    
                <button onClick={adicionarTarefa}> Adicionar </button>
                </div>
                <ul>
                    {tarefas.map((tarefa, indice) => (
                        <li key={indice} id={`tarefa-${indice}`}>
                            {tarefa} 
                            <div>
                                <button onClick={() => removerTarefa(indice)}> Remover </button>
                                <button onClick={ (e) => {
                                    e.target.closest("li").classList.toggle(style.Concluida)}}> Concluida </button>
                            </div>
                        </li>
                    ))}
                </ul>
        </div>
    );
}

export default ListaTarefas;