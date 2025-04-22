import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0 && remainingTime !== -targetTime * 1000;
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  const userWon = !userLost && (score === 98 || score === 99 || score === 100);
  const formattedRemainingTime = userWon
    ? "0.00"
    : (remainingTime / 1000).toFixed(2);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost !!!</h2>}
      {userWon && <h2>You won !!!</h2>}
      {!userLost && !userWon && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      {remainingTime > 0 ? (
        <p>
          You stopped the timer with{" "}
          <strong>{formattedRemainingTime} seconds left !!!</strong>
        </p>
      ) : (
        <p>You ran out of time !!!</p>
      )}
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
