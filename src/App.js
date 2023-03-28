import Board from "./components/Board";

function App() {
  return (
    <div className="w-screen h-screen bg-gradient-to-bl from-blue-300 to-gray-300 shadow-xl shadow-cyan-800">
      <div className="container mx-auto">
        <Board />
      </div>
    </div>
  );
}

export default App;
