import { CellDetails } from "../components/Cell/Cell";

export type CellPosition = { row: number; column: number };

const getBombNeighbourCounts = (board: Array<Array<number>>) => {
  const resultBoard: Array<Array<number>> = [];

  for (let row = 0; row < board.length; row++) {
    const resultRow: Array<number> = [];
    for (let column = 0; column < board[row].length; column++) {
      let surroundingBombs = 0;
      const neighbourCells = determineNeighbourCells(
        row,
        column,
        board.length,
        board[0].length
      );
      neighbourCells.forEach((cell) => {
        if (checkCellIsBomb(cell, board)) surroundingBombs += 1;
      });

      resultRow.push(surroundingBombs);
    }
    resultBoard.push(resultRow);
  }
  return resultBoard;
};

const isBomb = (number: number) => number === 1;

const checkCellIsBomb = (
  cellPosition: CellPosition,
  board: Array<Array<number>>
) => board[cellPosition.row][cellPosition.column] === 1;

export const getInitialBoardDetails = (
  initialBombState: Array<Array<number>>
) => {
  const bombNeighbourCountBoard = getBombNeighbourCounts(initialBombState);
  const boardDetails: Array<Array<CellDetails>> = [];

  bombNeighbourCountBoard.forEach((row, rowIndex) => {
    const rowDetails: Array<CellDetails> = [];
    row.forEach((bombNeighbourCount, colIndex) => {
      const cell = {
        state: "NORMAL",
        bombNeighbourCount,
        isBomb: isBomb(initialBombState[rowIndex][colIndex]),
        row: rowIndex,
        column: colIndex,
      } satisfies CellDetails;
      rowDetails.push(cell);
    });
    boardDetails.push(rowDetails);
  });
  return boardDetails;
};

export const recursivelyClearAllNeighbours = (
  row: number,
  col: number,
  board: Array<Array<CellDetails>>
) => {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  newBoard[row][col].state = "DESTROYED";
  const neighbourCellPositions = determineNeighbourCells(
    row,
    col,
    newBoard.length,
    newBoard[0].length
  );

  neighbourCellPositions.forEach((position) => {
    const cell = newBoard[position.row][position.column];
    const neighbourState = cell.state;

    if (cell.bombNeighbourCount > 0) {
      cell.state = "DESTROYED";
      return;
    }

    if (
      cell.bombNeighbourCount === 0 &&
      neighbourState === "NORMAL" &&
      !cell.isBomb
    ) {
      cell.state = "DESTROYED";
      recursivelyClearAllNeighbours(position.row, position.column, newBoard);
      return;
    }
  });
  return newBoard;
};

const determineNeighbourCells = (
  row: number,
  column: number,
  boardHeight: number,
  boardWidth: number
) => {
  const isFirstRow = row === 0;
  const isLastRow = row === boardHeight - 1;
  const isFirstCol = column === 0;
  const isLastCol = column === boardWidth - 1;

  const neighbourCells: Array<CellPosition> = [];

  // Add vertical neighbors
  if (!isFirstRow) neighbourCells.push({ row: row - 1, column });
  if (!isLastRow) neighbourCells.push({ row: row + 1, column });

  // Add horizontal neighbors
  if (!isFirstCol) neighbourCells.push({ row, column: column - 1 });
  if (!isLastCol) neighbourCells.push({ row, column: column + 1 });

  // Add diagonal neighbors
  if (!isFirstRow && !isFirstCol)
    neighbourCells.push({ row: row - 1, column: column - 1 });
  if (!isFirstRow && !isLastCol)
    neighbourCells.push({ row: row - 1, column: column + 1 });
  if (!isLastRow && !isFirstCol)
    neighbourCells.push({ row: row + 1, column: column - 1 });
  if (!isLastRow && !isLastCol)
    neighbourCells.push({ row: row + 1, column: column + 1 });

  return neighbourCells;
};
