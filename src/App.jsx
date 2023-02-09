import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinner, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  // crea un array de 9 posiciones y todas las llena con null, usando la función FILL
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board');
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null);
  });

  // estado para saber quien tiene el turno
  const [turn, setTurn] = useState( () => {
    const turnFromLocalStorange = window.localStorage.getItem('turn');
    return JSON.parse(turnFromLocalStorange) ?? TURNS.X});

  // estado para saber si alguien ya gano, el juego sigue o se empato
  const [winner, setWinner] = useState(null);

  // nos permite resetear el juego, siempre que se
  // reseta en react los estados iniciales esta se reinicia
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  };

 

  // se ejecuta luego de cada click en el square,
  // ya que esta funcion se pasa como prop a square y handlerClick la ejecuta
  const updateBoard = (index) => {
    if (board[index] || winner) return;
    // clona el arreglo board, ya que es mala practica alterar los estados en react
    const newBoard = [...board];
    newBoard[index] = turn; // rellana el square con el turno ('X' o 'O')
    setBoard(newBoard);
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X; // actualiza el turno
    setTurn(newTurn);
    // guardar partoda
    window.localStorage.setItem('board', JSON.stringify(newBoard));
    window.localStorage.setItem('turn', JSON.stringify(newTurn));
    const newWinner = checkWinner(newBoard); // chekea si hay un ganador
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
