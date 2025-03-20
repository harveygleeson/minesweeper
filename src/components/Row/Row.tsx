import Cell, { CellDetails, OnCellClick } from "../Cell/Cell";
import styles from "./Row.module.css";

export interface RowProps {
  cellDetails: Array<CellDetails>;
  onCellClick: OnCellClick;
  rowNumber: number;
}

export const Row: React.FC<RowProps> = ({
  cellDetails,
  rowNumber,
  onCellClick,
}) => {
  return (
    <div className={styles["row"]}>
      {cellDetails.map((props, cellIndex) => {
        return (
          <Cell
            key={`${rowNumber}${cellIndex}`}
            {...props}
            onCellClick={onCellClick}
          />
        );
      })}
    </div>
  );
};

export default Row;
