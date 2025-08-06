import { useState, useEffect, useRef } from 'react';
import browser from 'webextension-polyfill';

export default function Pomodoro() {
    const [time, setTime] = useState(25 * 60); // Tempo inicial em segundos (25 minutos)
    const [initialTime, setInitialTime] = useState(25 * 60); // Tempo total para cálculo do progresso
    const [isRunning, setIsRunning] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [inputMinutes, setInputMinutes] = useState(25);
    const [inputSeconds, setInputSeconds] = useState(0);
    const intervalRef = useRef<number | null>(null);

    // Carregar estado do timer do storage ao iniciar
    useEffect(() => {
        const loadTimerState = async () => {
            const result = await browser.storage.local.get(['pomodoroTime', 'pomodoroInitialTime', 'pomodoroIsRunning', 'pomodoroEndTime']);

            if (typeof result.pomodoroTime === 'number') {
                setTime(result.pomodoroTime);
            }
            if (typeof result.pomodoroInitialTime === 'number') {
                setInitialTime(result.pomodoroInitialTime);
            }
            if (typeof result.pomodoroIsRunning === 'boolean') {
                setIsRunning(result.pomodoroIsRunning);
            }

            // Se estava rodando e há um tempo final, recalcular o tempo restante
            if (result.pomodoroIsRunning && typeof result.pomodoroEndTime === 'number') {
                const remainingTime = Math.max(0, Math.floor((result.pomodoroEndTime - Date.now()) / 1000));
                setTime(remainingTime);
                if (remainingTime > 0) {
                    setIsRunning(true);
                } else {
                    setIsRunning(false);
                }
            }
        };
        loadTimerState();
    }, []);

    // Salvar estado do timer no storage sempre que houver mudança
    useEffect(() => {
        const saveTimerState = async () => {
            await browser.storage.local.set({
                pomodoroTime: time,
                pomodoroInitialTime: initialTime,
                pomodoroIsRunning: isRunning,
                pomodoroEndTime: isRunning ? Date.now() + time * 1000 : null
            });
        };
        saveTimerState();
    }, [time, initialTime, isRunning]);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = window.setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 1) {
                        window.clearInterval(intervalRef.current as number);
                        setIsRunning(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) {
                window.clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        const newTime = inputMinutes * 60 + inputSeconds;
        setTime(newTime);
        setInitialTime(newTime);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setInputMinutes(Math.floor(time / 60));
        setInputSeconds(time % 60);
    };

    const handleSaveEdit = () => {
        const newTime = inputMinutes * 60 + inputSeconds;
        setTime(newTime);
        setInitialTime(newTime);
        setIsEditing(false);
        setIsRunning(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const progress = initialTime > 0 ? (time / initialTime) * circumference : 0;

    return (
        <div className="flex flex-col items-center justify-center my-12">
            <h1 className="text-white text-2xl font-bold mb-4">Pomodoro Timer</h1>
            <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                    <circle
                        className="text-zinc-700"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="100"
                        cy="100"
                    />
                    <circle
                        className="text-blue-500"
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="100"
                        cy="100"
                        transform="rotate(-90 100 100)"
                    />
                </svg>
                <div className="absolute text-white text-4xl font-bold">
                    {isEditing ? (
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={inputMinutes}
                                onChange={(e) => setInputMinutes(parseInt(e.target.value) || 0)}
                                className="w-16 text-center bg-zinc-700 rounded-md text-white"
                            />
                            <span>:</span>
                            <input
                                type="number"
                                value={inputSeconds}
                                onChange={(e) => setInputSeconds(parseInt(e.target.value) || 0)}
                                className="w-16 text-center bg-zinc-700 rounded-md text-white"
                            />
                        </div>
                    ) : (
                        formatTime(time)
                    )}
                </div>
            </div>
            <div className="mt-4 flex gap-2">
                {isEditing ? (
                    <>
                        <button onClick={handleSaveEdit} className="bg-green-500 text-white px-4 py-2 rounded-md">Salvar</button>
                        <button onClick={handleCancelEdit} className="bg-red-500 text-white px-4 py-2 rounded-md">Cancelar</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleStartPause} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            {isRunning ? 'Pausar' : 'Iniciar'}
                        </button>
                        <button onClick={handleReset} className="bg-gray-500 text-white px-4 py-2 rounded-md">Resetar</button>
                        <button onClick={handleEdit} className="bg-yellow-500 text-white px-4 py-2 rounded-md">Editar</button>
                    </>
                )}
            </div>
        </div>
    );
}