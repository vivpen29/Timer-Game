import {forwardRef, useImperativeHandle, useRef} from 'react';

const ResultModal = forwardRef(
    function ResultModal({ result, targetTime, timeLeft, onReset }, ref) {
        const dialog = useRef();
        useImperativeHandle(ref, () => ({
            open() {
                dialog.current.showModal();
            }
        }))
        return (
            <dialog ref={dialog} className="result-modal">
                <h2>You {result}</h2>
                {result === 'won' ? <h2>Your score : {Math.round(((1 - timeLeft/targetTime) * 100))}</h2> : null}
                <p>
                    The target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}.</strong>
                </p>

                { timeLeft <= 0 ? <p>You ran out of time.</p> :
                    <p>You stopped the timer with <strong>{timeLeft} seconds left.</strong></p>
                }

                <form method="dialog" onSubmit={onReset}>
                    <button>Close</button>
                </form>
            </dialog>
        );
    }
);

export default ResultModal;