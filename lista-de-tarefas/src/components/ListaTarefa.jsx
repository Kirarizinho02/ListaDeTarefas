import { useState } from "react";

import style from './ListaTarefa.module.css';

// Escolhi fazer o CSS em formato de modulo para evitar conflitos de estilo entre os componentes

import { useLocalStorage } from "usehooks-ts";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// Importando o CSS do Bootstrap, assim como o local storage de uma biblioteca externa

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

// Importando os icones do FontAwesome, que são utilizados para os botões de remover e concluir tarefas

function ListaTarefas() {
    const [tarefas, setTarefas] = useLocalStorage('tarefas', []);
    const [tarefasOriginais, setTarefasOriginais] = useState([]); 
    const [novaTarefaDescricao, setNovaTarefaDescricao] = useState('');
    const [novaTarefa, setNovaTarefa] = useState('');

// Definindo o estado inicial das tarefas, um array vazio, as tarefas originais, que serão usadas para o filtro e o estado da nova tarefa, que é uma string vazia

    const concluirTarefa = (indice) => {
        setTarefas((tarefasAnteriores) =>
            tarefasAnteriores.map((tarefa, i) =>
                i === indice ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
            )
        );
    };

// Função que serve para alterar o estado da tarefa, marcando ela como concluida ou não
// Por padrão, todas tarefas começam como 'concluida: false'
// Utiliza o map pra percorrer o array das tarefas, comparando o parametro indice com o indice do array 

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

// Função (inclusa no PDF, mas com algumas alterações essenciais), que adiciona a tarefa ao array de tarefas, e também ao local storage 
// Utiliza da distinção de tarefas originais e novas tarefas para melhor organização dos estados
// Além disso, coloquei um alert para caso o usuário não digite um título, que é obrigatório 

    const removerTarefa = (indice) => {
        const novasTarefas = tarefas.filter((_, i) => i !== indice);
        setTarefas(novasTarefas);
        setTarefasOriginais(novasTarefas); 
    };
    
// Função simples que remove a tarefa do array de tarefas, que utiliza do filter para filtrar as tarefas que não são as que o usuário quer remover


    const editarTarefa = (indice) => {
        setTarefas(tarefas.map((tarefa, i) => {
            if (i === indice) {
                const titulo = prompt("Digite o novo título da tarefa:", tarefa.titulo);
                const descricao = prompt("Digite a nova descrição da tarefa:", tarefa.descricao);
                const updatedTarefa = { ...tarefa, titulo: titulo || tarefa.titulo, descricao: descricao || tarefa.descricao };
                setTarefasOriginais(tarefas && updatedTarefa);
                return updatedTarefa;
            }
            return tarefa;
        }));
    };

// Função que edita a tarefa, utilizando o prompt para pedir o novo título e descrição da tarefa, e atualiza o array de tarefas com os novos valores, para não serem alterados caso sejam filtrados
// O valor padrão do prompt é o título e descrição da tarefa, caso o usuário não digite nada, o valor padrão é mantido

    const ordenarOrdemAlfabetica = () => {
        const tarefasOrdenadas = [...tarefas].sort((a, b) =>
            a.titulo.localeCompare(b.titulo)
        );
        setTarefas(tarefasOrdenadas);
    };

// Função que ordena as tarefas em ordem alfabética, utilizando o localeCompare para comparar as strings

    const ordenarData = () => {
        setTarefas([...tarefasOriginais]); 
    };

// Função que ordena as tarefas pela data de adição, utilizando o array original das tarefas ('TarefasOriginais') 

    return (
        <div className={style.ListaTarefa}> 
        {/* Div principal do site */}
            <div className={style.Tarefas}>
            {/* Div que contém os inputs de texto e o botão */}
                <div className={style.InputContainer}>
                {/* Div exclusiva para os inputs */} 
                    <input
                        type='text'
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                        placeholder="Digite o título de uma tarefa."
                    /> 
                    {/* Input para o título da tarefa */}
                    <textarea
                        value={novaTarefaDescricao}
                        onChange={(e) => setNovaTarefaDescricao(e.target.value)}
                        placeholder="Digite uma descrição (opcional) para a tarefa."
                    />
                    {/* Textarea para a inserção da descrição da tarefa */}
                </div>
                <button className={style.BotaoLista} onClick={adicionarTarefa}> Adicionar </button>
                {/* Botão que chama a função de adicionar tarefas no click */}
            </div>
            <div className={style.DropdownH2}>
            {/* Div que abriga o h2 e o Menu Dropdown */}
                <h2 style={{ opacity: tarefas.length > 0 ? 1 : 0, transition: "opacity 0.3s ease-in-out" }}> Lista de Tarefas </h2>
                <DropdownButton
                    id="dropdown-basic-button"
                    title="Filtros"
                    style={{opacity: tarefas.length > 0 ? 1 : 0, transition: "opacity 0.3s ease-in-out", marginTop: "0.5rem",}}
                >
            {/* A opacidade do h2 e do Menu Dropdown é definida para, caso haja alguma tarefa (tarefas.lenght > 0), opacidade seja 1, caso contrário, 0 */}
                    <Dropdown.Item onClick={ordenarOrdemAlfabetica}> Ordem Alfabética </Dropdown.Item>
                    <Dropdown.Item onClick={ordenarData}> Data de Adição </Dropdown.Item>
                    {/* Os itens contém as funções de filtragem por ordem alfabética ou data de adição */}
                </DropdownButton>
            </div>
            <ul>
                {/* UL com o intuito de organizar as tarefas no formato de lista */}
                {tarefas.map((tarefa, indice) => (
                    <li key={indice} id={`tarefa-${indice}`} className={tarefa.concluida ? style.Concluida : ""}>
                        {/* Cada item da lista recebe um índice, e um estilo especial caso esteja concluida */}
                        <div className={style.TarefaTexto}>
                            <strong>Título da tarefa:</strong> {tarefa.titulo} 
                            <strong>Descrição da tarefa:</strong> {tarefa.descricao} 
                        </div>
                        <div className={style.Botoes}>  

                            <button onClick={() => removerTarefa(indice)}> <FontAwesomeIcon icon={faTrash} />  Remover</button>
                            <button onClick={() => concluirTarefa(indice)}> <FontAwesomeIcon icon={faCheck} />
                                {tarefa.concluida ? "  Concluída" : "  Concluir"}
                            </button>
                            <button onClick={() => editarTarefa(indice)}> <FontAwesomeIcon icon={faPen} />  Editar </button>
                            {/* O botão de remover chama a função de remover tarefas passando o índice da tarefa clicada como parâmetro */}
                            {/* De forma semelhante, o botão de concluir faz as mesmas funções, mas para concluir a tarefa, e altera seu texto caso a tarefa esteja marcada como concluida */}
                            {/* O botão de editar faz basicamente a mesma coisa dos dois de cima, mas com o propósito de editar a tarefa */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaTarefas;