import { useState } from 'react';
import { Navbar } from "./components/Navbar";
import Todo from "./hooks/todo";
import Pomodoro from "./hooks/pomodoro";
import Notas from "./hooks/notas";

import bg from "./assets/bg.svg";

export function App() {
  const [activePage, setActivePage] = useState('To-do'); // Nome do compononente inicial

  const renderContent = () => {
    switch (activePage) {
      case 'To-do': // Use o mesmo nome ('To-do', 'Pomodoro', 'Notas')
        return <Todo />;
      case 'Pomodoro':
        return <Pomodoro />;
      case 'Notas':
        return <Notas />;
      default:
        return <Todo />;
    }
  };

  return (
    <div className="min-h-screen flex justify-center overflow-hidden">
      <div
        className="w-[400px] min-h-[500px] bg-zinc-900"

        // background
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Passando os estados para ser manipulado em Navbar */}
        <Navbar activePage={activePage} setActivePage={setActivePage} />

        {renderContent()}
      </div>
    </div>
  );
}