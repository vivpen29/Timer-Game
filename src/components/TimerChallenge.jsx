import {useRef, useState} from 'react';
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {

    const timerId = useRef();
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime;

    if (timeRemaining <= 0) {
        clearInterval(timerId.current);
        dialog.current.open();
    }

    function handleReset() {
        setTimeRemaining(targetTime);
    }

    function handleStart() {
        timerId.current = setInterval(() => {
            setTimeRemaining((prev) => prev - 0.01);
        }, 10);
    }

    function handleStop() {
        clearInterval(timerId.current);
        dialog.current.open();
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime}
                         timeLeft={parseFloat(timeRemaining).toFixed(2)}
                         result={!timerIsActive && timeRemaining <= 0 ? 'lost' : 'won'}
                         onReset={handleReset}
            />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}