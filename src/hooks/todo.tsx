import { useEffect, useState } from "react";
import { InputComponets } from "../components/inputTo-do";
import circleDefault from "../assets/circle-dashed.svg";
import deleteSvg from "../assets/delete.svg"
import checkSvg from "../assets/circle-check.svg";

interface Task {
    id: string;
    text: string;
    isCompleted: boolean;
}

export default function Todo() {
    const [taskText, setTaskText] = useState('');

    const [tasks, setTasks] = useState<Task[]>([]);

    // Carrega tarefas ao montar o componente
    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            chrome.storage.local.get('tasks', (result) => {
                if (result.tasks) {
                    setTasks(result.tasks);
                }
            });
        }
    }, []) // efeito executado apenas uma vez quando o componente é montado

    // Função para salvar tarefas no ARMAZENAMENTO LOCAL
    const saveTasksToLocalStorage = (updateTasks: Task[]) => {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            chrome.storage.local.set({ tasks: updateTasks }, () => {
                console.log('Tarefas salvas no armazenamento local.');
            });
        }
    }

    const handlueInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskText(event.target.value);
    }

    const handleAddTesk = () => {
        // verificação se o botao esta vazio
        if (taskText.trim() !== '') {
            const newTask: Task = {
                id: Date.now().toString(),
                text: taskText,
                isCompleted: false, // Define se a task esta completa ou não
            }

            setTasks((prevTasks) => {
                const updatedTasks = [...prevTasks, newTask];
                saveTasksToLocalStorage(updatedTasks);
                return updatedTasks;
            });
            setTaskText('');
        } else {
            alert("Por favor! Digite a task antes de adicionar")
        }
    }

    const handleToggleComplete = (id: string) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map(task =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            );
            saveTasksToLocalStorage(updatedTasks);
            return updatedTasks;
        })
    }

    const handleDeleteTask = (id: string) => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.filter(task => task.id !== id);
            saveTasksToLocalStorage(updatedTasks);
            return updatedTasks
        });
    };

    return (
        <div className="flex flex-col gap-2">
            <InputComponets
                value={taskText}
                onChange={handlueInputChange}
                onAddTask={handleAddTesk} />

            <div>
                {tasks.length === 0 ? (
                    <p className="text-center text-gray-500">Nenhuma tarefa adicionada</p>
                ) : (
                    tasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between mx-5
                            bg-zinc-900 border-[#27272A] border-[1px] p-2 px-4 rounded-xl mb-2 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3),_0_4px_6px_-4px_rgba(0,0,0,0.3)]"
                        >
                            <div className="flex gap-2 items-center">
                                <span className="cursor-pointer" onClick={() => handleToggleComplete(task.id)}>
                                    {task.isCompleted ? (
                                        <img src={checkSvg} alt="círculo marcado" className="" />
                                    ) : (
                                        <img src={circleDefault} alt="círculo padrão" />
                                    )}
                                </span>

                                <p className={`text-[#A1A1AA] ${task.isCompleted ? 'line-through text-gray-500' : ''} text-sm font-medium`}>
                                    {task.text}
                                </p>
                            </div>

                            <button
                                className="cursor-pointer p-2 bg-transparent hover:bg-[#212126] transition ease-linear duration-200 rounded-[8px]"
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                <img src={deleteSvg} alt="ícone de lixeira" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}