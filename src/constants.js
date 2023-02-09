// ENUM para diferenciar cada turno
export const TURNS = {
  X: "x",
  O: "o",
};

//ENUM de todas las jugadas posibles para ganar, que luego usaremos para comprobar
// si un jugador logro hacer alguna de estas, y así ganar
export const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
