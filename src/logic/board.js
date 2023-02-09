import { WINNER_COMBOS } from "../constants";

// Funcion que nos permite saber si luego de cada movimiento el juego termina
export const checkWinner = (boardCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardCheck[a] &&
      boardCheck[a] == boardCheck[b] &&
      boardCheck[b] == boardCheck[c]
    ) {
      return boardCheck[a];
    }
  }
  return null;
};

 // nos permite saber si el juego ha acabado, esto chekeando
// si todas las celdas estan ya ocupadas
export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square != null);
};
