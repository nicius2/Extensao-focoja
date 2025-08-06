import { type Dispatch, type SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import todoIcon from "../assets/todoBlack.svg";
import todoIconWhite from "../assets/todoWhite.svg";
import pomodoroIcon from "../assets/pomodoroBlack.svg";
import pomodoroIconWhite from "../assets/pomodoroWhite.svg";
import notasIcon from "../assets/notasBlack.svg";
import notasIconWhite from "../assets/notasWhite.svg";

type Props = {
  activePage: string;
  setActivePage: Dispatch<SetStateAction<string>>;
  onDownloadClick: () => Promise<void>;
};

const NavbarData = [
  { id: 1, nome: "To-do", icon: todoIcon, iconActive: todoIconWhite },
  { id: 2, nome: "Pomodoro", icon: pomodoroIcon, iconActive: pomodoroIconWhite },
  { id: 3, nome: "Notas", icon: notasIcon, iconActive: notasIconWhite },
];

export function Navbar({ activePage, setActivePage, onDownloadClick }: Props) {
  return (
    <div className="flex items-center justify-center mt-10 gap-2">
      <div className="flex gap-4 bg-lime-400 w-60 h-12 py-1.5 px-2 rounded-xl justify-between">
        {NavbarData.map((item) => {
          const isActive = item.nome === activePage;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActivePage(item.nome)}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-all ${
                isActive ? "bg-[#27272A] text-white" : ""
              }`}
            >
              <motion.img
                src={isActive ? item.iconActive : item.icon}
                alt={item.nome}
              />
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

      {activePage === "Notas" && (
        <div className="flex text-zinc-900 cursor-pointer p-2 rounded-lg bg-amber-50">
          <button
            onClick={async () => {
              await onDownloadClick();
            }}
            className="flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="lucide lucide-download"
            >
              <path d="M12 15V3" />
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="m7 10 5 5 5-5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
