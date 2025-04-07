import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import style from './ListaTarefa.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function ListaTarefas() {
    const [tarefas, setTarefas] = useLocalStorage('tarefas', []);
    const [tarefasOriginais, setTarefasOriginais] = useState([]); 
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
        const novaTarefaObj = { titulo: novaTarefa, descricao: novaTarefaDescricao };
        setTarefas([...tarefas, novaTarefaObj]);
        setTarefasOriginais([...tarefasOriginais, novaTarefaObj]); 
        setNovaTarefaDescricao("");
        setNovaTarefa("");
    };

    const removerTarefa = (indice) => {
        const novasTarefas = tarefas.filter((_, i) => i !== indice);
        setTarefas(novasTarefas);
        setTarefasOriginais(novasTarefas); 
    };

    const ordenarOrdemAlfabetica = () => {
        const tarefasOrdenadas = [...tarefas].sort((a, b) =>
            a.titulo.localeCompare(b.titulo)
        );
        setTarefas(tarefasOrdenadas);
    };

    const ordenarData = () => {
        setTarefas([...tarefasOriginais]); 
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
                        placeholder="Digite uma descrição (opcional) para a tarefa."
                    />
                </div>
                <button className={style.BotaoLista} onClick={adicionarTarefa}> Adicionar </button>
            </div>
            <div className={style.DropdownH2}>
                <h2 style={{ opacity: tarefas.length > 0 ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}> Lista de Tarefas </h2>
                <DropdownButton
                    id="dropdown-basic-button"
                    title="Filtros"
                    style={{opacity: tarefas.length > 0 ? 1 : 0, transition: "opacity 0.3s ease-in-out", marginTop: "0.5rem",}}
                >
                    <Dropdown.Item onClick={ordenarOrdemAlfabetica}> Ordem Alfabética </Dropdown.Item>
                    <Dropdown.Item onClick={ordenarData}> Data de Adição </Dropdown.Item>
                </DropdownButton>
            </div>
            <ul>
                {tarefas.map((tarefa, indice) => (
                    <li key={indice} id={`tarefa-${indice}`} className={tarefa.concluida ? style.Concluida : ""}>
                        <div className={style.TarefaTexto}>
                            <strong>Título da tarefa:</strong> {tarefa.titulo}
                            <strong>Descrição da tarefa:</strong> {tarefa.descricao}
                        </div>
                        <div className={style.Botoes}>
                            <button onClick={() => removerTarefa(indice)}>Remover</button>
                            <button onClick={() => concluirTarefa(indice)}>
                                {tarefa.concluida ? "Concluída" : "Concluir"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas;