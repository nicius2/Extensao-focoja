import { useState } from 'react';
import { Navbar } from "./components/Navbar";
import Todo  from "./components/todoList"; // Certifique-se de que 'Todo' está exportado corretamente
import Pomodoro from "./components/pomodoro";
import  Notas  from "./components/notas";

import bg from "./assets/bg.svg";

export function App() {
  const [activePage, setActivePage] = useState('To-do'); // Use o nome exato do item para o estado inicial

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
    <div className="min-h-screen flex justify-center overflow-hidden bg-transparent">
      <div
        className="w-[400px] min-h-[500px] bg-zinc-900 rounded-xl my-10"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        {renderContent()}
      </div>
    </div>
  );
}