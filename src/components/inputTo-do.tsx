import calendar from "../assets/calendar.svg"
import plusSvg from "../assets/plus.svg"
/*
    Value do Input: é passado pelo pai, mas é preciso passar como uma propriedade (Props)
    onAddTask: é o evento de butão, estamos usando aqui o React controlado
*/

type Props = React.ComponentProps<"input"> & {
    onAddTask: () => void
}

export function InputComponets({ onAddTask, ...rest }: Props) {
    return (
        <div className="bg-[#18181B] flex items-center justify-center border-2 border-[#27272A] my-12 mx-4 rounded-2xl">
            <fieldset className="flex justify-between p-4 w-full items-center">

                <div className="flex gap-4 items-center">

                    <span>
                        <img src={calendar} alt="calendar" className="w-6 h-6" />
                    </span>

                    <input
                        type="text"
                        placeholder="Escreva uma task"
                        className="text-md text-[#A1A1AA] border-none leading-6 focus:outline-none flex-grow w-40"
                        {...rest}
                    />
                </div>
                    <span className="text-zinc-100/40">|</span>

                <button
                    className="flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-800 rounded-sm  px-2 py-1 cursor-pointer"
                    onClick={onAddTask}
                >
                    <div className="flex items-center gap-2">
                        <span className="">Adicionar</span>
                        <span>
                            <img
                                src={plusSvg}
                                alt="plus"
                                className="w-4 h-4"
                            />
                        </span>
                    </div>
                </button>
            </fieldset>
        </div>
    )
}