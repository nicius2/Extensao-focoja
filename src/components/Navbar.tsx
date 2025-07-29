import { type Dispatch, type SetStateAction } from "react";
import todoIcon from "../assets/todoBlack.svg";
import todoIconWhite from "../assets/todoWhite.svg";
import pomodoroIcon from "../assets/pomodoroBlack.svg";
import pomodoroIconWhite from "../assets/pomodoroWhite.svg";
import notasIcon from "../assets/notasBlack.svg";
import notasIconWhite from "../assets/notasWhite.svg";
import { AnimatePresence, motion } from "framer-motion";

// Tipagem dos estados que vai receber
type Props = {
    activePage: string;
    setActivePage: Dispatch<SetStateAction<string>>;
};

// array dos componentes de butão
const NavbarData = [
    { id: 1, nome: "To-do", icon: todoIcon, iconActive: todoIconWhite, url: "#" },
    { id: 2, nome: "Pomodoro", icon: pomodoroIcon, iconActive: pomodoroIconWhite, url: "#" },
    { id: 3, nome: "Notas", icon: notasIcon, iconActive: notasIconWhite, url: "#" }
];

export function Navbar({ activePage, setActivePage }: Props) {

    return (
        <div className="flex items-center justify-center">
            <div className="flex gap-4 mt-10 bg-lime-400 w-60 h-12 py-1.5 px-2 rounded-xl justify-between">

                {/* percorreno o array */}
                {NavbarData.map((item) => {
                    const isActive = item.nome === activePage; {/* verifica se o valor de nome é igual ao do estado */ }

                    return (
                        <motion.button
                            key={item.id}

                            // Quando clicar no botao mudar o valor do estado
                            onClick={() => {
                                setActivePage(item.nome);
                            }}
                            className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-all ${isActive ? "bg-[#27272A] text-white" : ""
                                }`}
                        >
                            <motion.img
                                src={isActive ? item.iconActive : item.icon}
                                alt={item.nome} />
                            <AnimatePresence>
                                {isActive && (
                                    <motion.span
                                        className="text-sm font-medium"
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {item.nome}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}