import { OnCellClick } from "../Cell/Cell";
import Row, { RowProps } from "../Row/Row";
import styles from "./Board.module.css";

export interface BoardProps {
  rowProps: Array<RowProps["cellDetails"]>;
  onCellClick: OnCellClick;
}

export const Board: React.FC<BoardProps> = ({ rowProps, onCellClick }) => {
  return (
    <div className={styles["board-container"]}>
      <div className={styles["board"]}>
        {rowProps.map((props, index) => {
          return (
            <Row
              rowNumber={index}
              key={index}
              cellDetails={props}
              onCellClick={onCellClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;
