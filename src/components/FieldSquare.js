import { useContext } from "react";
import { TicTacToeContext } from "../context/GameContext";

const FieldSquare = ({ num }) => {
  const { isGameOver, squares, selectSquare } = useContext(TicTacToeContext);

  function generateBgColor() {
    if (squares[num] === "x") {
      return "bg-red-100 text-purple-500";
    }
    if (squares[num] === "o") {
      return "bg-blue-100 text-slate-500";
    }
  }

  return (
    <button
      className={`border-2 border-gray-400 h-24 ${generateBgColor()}`}
      disabled={isGameOver}
      onClick={() => selectSquare(num)}
    >
      <p className="text-center text-4xl font-bold textsl">{squares[num]}</p>
    </button>
  );
};

export default FieldSquare;
