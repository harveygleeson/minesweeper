import { ReactNode } from "react";
import Flag from "../Flag/Flag";
import styles from "./Cell.module.css";
import One from "../Numbers/One";
import Two from "../Numbers/Two";
import Three from "../Numbers/Three";
import Four from "../Numbers/Four";
import Five from "../Numbers/Five";
import Six from "../Numbers/Six";
import Seven from "../Numbers/Seven";
import Eight from "../Numbers/Eight";

export type CellDetails = Omit<CellProps, "onCellClick">;

type CellState = "FLAGGED" | "NORMAL" | "DESTROYED";

export type OnCellClick = (
  row: number,
  column: number,
  type: "right" | "left"
) => void;

export interface CellProps {
  state: CellState;
  row: number;
  column: number;
  bombNeighbourCount: number;
  isBomb: boolean;
  onCellClick: (row: number, col: number, clickType: "left" | "right") => void;
}

export const Cell: React.FC<CellProps> = ({
  state,
  isBomb,
  row,
  bombNeighbourCount,
  column,
  onCellClick,
}) => {
  return (
    <div
      onClick={(e) => {
        console.log("left click");
        onCellClick(row, column, "left");
      }}
      className={styles["cell"]}
      onContextMenu={(e) => {
        console.log("right click");
        e.preventDefault();
        onCellClick(row, column, "right");
      }}
    >
      <div className={styles["cell-content"]}>
        {getCellDisplay(state, bombNeighbourCount, isBomb, row, column)}
      </div>
    </div>
  );
};

const getCellDisplay = (
  state: CellState,
  bombNeighbourCount: number,
  isBomb: boolean,
  row: number,
  col: number
) => {
  // return `${row} ${col}`;
  switch (state) {
    case "FLAGGED":
      return <Flag />;
    case "DESTROYED":
      if (isBomb) return "L";
      if (bombNeighbourCount > 0)
        return mapNeighbourCountToComponent[bombNeighbourCount];
      return <div className={styles["clear"]} />;
    case "NORMAL":
      return " ";
  }
};
export default Cell;

const mapNeighbourCountToComponent: Record<number, ReactNode> = {
  1: <One />,
  2: <Two />,
  3: <Three />,
  4: <Four />,
  5: <Five />,
  6: <Six />,
  7: <Seven />,
  8: <Eight />,
};
