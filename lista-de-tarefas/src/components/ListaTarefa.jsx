import { useState } from "react";
import style from './ListaTarefa.module.css'

function ListaTarefas(){
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefaDescricao, setNovaTarefaDescricao] = useState('');
    const [novaTarefa, setNovaTarefa] = useState('');

    const concluirTarefa = (indice) => {
        setTarefas((tarefasAnteriores) =>
            tarefasAnteriores.map((tarefa, i) =>
                i === indice ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
            )
        );
    };

    const adicionarTarefa = () => {
        if (novaTarefa.trim() === '') {
            alert("O título da tarefa é obrigatório!"); 
            return; 
        }
            setTarefas([...tarefas, {titulo: novaTarefa, descricao: novaTarefaDescricao}]);
            setNovaTarefaDescricao("");
            setNovaTarefa("");
    };

    const removerTarefa = (indice) => {
        setTarefas(tarefas.filter((_, i ) => i !== indice));
    };

    return (
        <div className={style.ListaTarefa}>
                <div className={style.Tarefas}>
                    <div className={style.InputContainer}>
                        <input 
                            type='text' 
                            value={novaTarefa} 
                            onChange={(e) => setNovaTarefa(e.target.value)} 
                            placeholder="Digite o título de uma tarefa." 
                        />    
                        <textarea
                            value={novaTarefaDescricao}
                            onChange={(e) => setNovaTarefaDescricao(e.target.value)} 
                            placeholder="Digite uma descrição (opicional) para a tarefa." 
                        />   
                        </div>
                        <button onClick={adicionarTarefa}> Adicionar </button>
                    </div>
                    <h2> Lista de Tarefas </h2>
                    <ul>
                {tarefas.map((tarefa, indice) => (
                    <li key={indice} id={`tarefa-${indice}`} className={tarefa.concluida ? style.Concluida : ""}>
                        <div className={style.TarefaTexto}>
                            <strong>Título da tarefa:</strong> {tarefa.titulo}
                            <strong>Descrição da tarefa:</strong> {tarefa.descricao}
                        </div>
                            <div className={style.Botoes}>
                                <button onClick={() => removerTarefa(indice)}>Remover</button>
                                <button onClick={() => {concluirTarefa(indice);}}>
                                    {tarefa.concluida ? 'Concluída' : 'Concluir'}
                                </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas;