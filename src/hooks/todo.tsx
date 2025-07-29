import { useState } from "react";
import { InputComponets } from "../components/inputTo-do";
import circleDefault from "../assets/circle-dashed.svg";
import deleteSvg from "../assets/delete.svg"

/**
 * Deve criar um estado para armazenar o valor do input
 */

export default function Todo() {
    const [taskText, setTaskText] = useState('');

    const handlueInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskText(event.target.value);
    }

    const handleAddTesk = () => {
        // verificação se o botao esta vazio
        if (taskText.trim() !== '') {
            console.log("Valor da task a ser adicionada", taskText)

            alert(`Task ${taskText} adicionada!`)

            // !!! AQUI PODERIA ENVIAR A TASK PARA UMA API

            setTaskText('')
        } else {
            alert("Por favor! Digite a task antes de adicionar")
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <InputComponets
                value={taskText}
                onChange={handlueInputChange}
                onAddTask={handleAddTesk} />

            <div>
                <div className="flex items-center justify-between mx-5 
                bg-zinc-900 border-[#27272A] border-[1px] p-2 px-4 rounded-xl">
                    <div className="flex gap-2 items-center">
                        <span className="cursor-pointer">
                            <img src={circleDefault} alt="circle" />
                        </span>

                        <p className="text-[#A1A1AA]">Terminar projeto</p>
                    </div>

                    <button className="cursor-pointer p-2 bg-transparent hover:bg-[#212126] transition ease-linear duration-400 rounded-[8px]">
                        <img src={deleteSvg} alt="icon of delete" />
                    </button>
                </div>
            </div>
        </div>
    )
}