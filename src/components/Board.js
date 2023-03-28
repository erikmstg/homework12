import { TicTacToeContext } from "../context/GameContext";
import FieldSquare from "./FieldSquare";
import { useState, useEffect } from "react";

const Board = () => {
  const [turn, setTurn] = useState("x");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [winners, setWinners] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [boardFull, setBoardFull] = useState(false);
  const [boardFullMessage, setBoardFullMessage] = useState("");

  const TicTacToeProvider = TicTacToeContext.Provider;

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }, [showMessage]);

  useEffect(() => {
    setBoardFull(true);
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null && !winners) {
        setBoardFull(false);
        return;
      }
    }

    if (boardFull) {
      setIsGameOver(true);
      setBoardFullMessage("Permainan berakhir tanpa ada pemenang :(");
      return;
    }
  }, [squares, boardFull]);

  function winnerCheck(cells) {
    const patterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of patterns) {
      if (
        cells[pattern[0]] &&
        cells[pattern[0]] === cells[pattern[1]] &&
        cells[pattern[1]] === cells[pattern[2]]
      ) {
        setIsGameOver(true);
        setWinners(`Player ${turn} is win! Congrats!`);
      }
    }
  }

  function selectSquare(index) {
    setIsGameOver(false);
    if (squares[index] !== null) {
      setMessage("Silahkan pilih kotak lain");
      setShowMessage(true);
      return;
    }

    let cells = [...squares];

    if (turn === "x") {
      cells[index] = "x";
      setTurn("o");
    } else {
      cells[index] = "o";
      setTurn("x");
    }

    setMessage("");
    winnerCheck(cells);
    setSquares(cells);
  }

  function restart() {
    setMessage("");
    setWinners("");
    setIsGameOver(false);
    setSquares(Array(9).fill(null));
  }

  return (
    <div className="container w-96 min-w-fit mx-auto py-16">
      <div className="flex items-center justify-between text-slate-600">
        <p className={`text-xl font-bold  ${winners && "opacity-0"}`}>
          Turn player :{" "}
          <span
            className={`text-2xl ${
              turn === "x" ? "text-purple-500" : "text-slate-500"
            }`}
          >
            {turn}
          </span>
        </p>
        <button
          className={`rounded-md px-4 py-2 text-base font-medium bg-green-200 ${
            winners && "opacity-0"
          }`}
          onClick={restart}
          disabled={winners}
        >
          Restart
        </button>
      </div>
      <div className="p-2 mt-4 flex justify-center">
        {showMessage && message && (
          <div
            id="toast-danger"
            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="ml-3 text-sm font-normal">{message}</span>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-danger"
              aria-label="Close"
              onClick={() => setShowMessage(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        )}

        {isGameOver && (
          <div
            className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <span className="font-semibold">{winners || boardFullMessage}</span>
            <div className="font-medium text-center mt-6">
              Main lagi?{" "}
              <span className="cursor-pointer underline" onClick={restart}>
                Yes
              </span>
            </div>
          </div>
        )}
      </div>
      <TicTacToeProvider value={{ isGameOver, squares, selectSquare }}>
        <div className="grid grid-cols-3 justify-items-stretch mx-11 my-4">
          {squares.map((_, index) => {
            return <FieldSquare key={index} num={index} />;
          })}
        </div>
      </TicTacToeProvider>
    </div>
  );
};

export default Board;
