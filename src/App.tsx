import { useState, useEffect, useRef } from 'react';
import { Navbar } from "./components/Navbar";
import Todo from "./hooks/todo";
import Pomodoro from "./hooks/pomodoro";
import Notas from "./hooks/notas";

import bg from "./assets/bg.svg";

export function App() {
  const [activePage, setActivePage] = useState('To-do');
  const [markdown, setMarkdown] = useState('');
  const downloadFunctionRef = useRef<() => Promise<void>>(async () => { });

  const renderContent = () => {
    switch (activePage) {
      case 'To-do':
        return <Todo />;
      case 'Pomodoro':
        return <Pomodoro />;
      case 'Notas':
        return (
          <Notas
            onDownloadClick={(fn) => {
              downloadFunctionRef.current = fn;
            }}
            markdownContent={markdown}
            setMarkdownContent={setMarkdown}
          />
        );
      default:
        return <Todo />;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Verifica se a tecla Alt está pressionada
      if (event.altKey) {
        switch (event.key) {
          case '1':
            setActivePage('To-do');
            break;
          case '2':
            setActivePage('Pomodoro');
            break;
          case '3':
            setActivePage('Notas');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <div className="min-h-screen flex justify-center overflow-hidden">
      <div
        className="w-[400px] min-h-[500px] bg-zinc-900"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          onDownloadClick={() => downloadFunctionRef.current()}
        />

        {renderContent()}
      </div>
    </div>
  );
}
