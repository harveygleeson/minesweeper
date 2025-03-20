import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board/Board";
import {
  recursivelyClearAllNeighbours,
  getInitialBoardDetails,
} from "./utils/utils";

const initial: Array<Array<number>> = [];
const rowCount = 18;
const colCount = 18;

for (let index = 0; index < rowCount; index++) {
  const row = Array.from({ length: colCount }, () =>
    Math.random() > 0.9 ? 1 : 0
  );
  initial.push(row);
}

function App() {
  const [board, setBoard] = useState(getInitialBoardDetails(initial));
  const onCellClick = (row: number, col: number, side: "right" | "left") => {
    if (side === "left") {
      setBoard((prevBoard) => {
        const isCellBomb = prevBoard[row][col].isBomb;
        const updatedBoard = prevBoard.map((row) =>
          row.map((cell) => ({ ...cell }))
        );
        if (isCellBomb) {
          window.alert("you lose");
          return getInitialBoardDetails(initial);
        } else {
          updatedBoard[row][col].state = "DESTROYED";
          const { bombNeighbourCount } = updatedBoard[row][col];
          if (bombNeighbourCount === 0) {
            return recursivelyClearAllNeighbours(row, col, updatedBoard);
          } else {
            updatedBoard[row][col].state = "DESTROYED";
            return updatedBoard;
          }
        }
      });
    } else {
      setBoard((prevBoard) => {
        const cellState = prevBoard[row][col].state;
        const updatedBoard = prevBoard.map((row) =>
          row.map((cell) => ({ ...cell }))
        );
        console.log("cellState", cellState, row, col);
        if (cellState === "NORMAL") updatedBoard[row][col].state = "FLAGGED";
        if (cellState === "FLAGGED") updatedBoard[row][col].state = "NORMAL";

        return updatedBoard;
      });
    }
  };
  return (
    <div className="App">
      <header className="App-header">Minesweeper</header>
      <Board rowProps={board} onCellClick={onCellClick} />
    </div>
  );
}

export default App;
