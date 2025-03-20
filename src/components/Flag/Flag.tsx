import styles from "./Flag.module.css";

export const Flag: React.FC = () => {
  return (
    <div className={styles["flag"]}>
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(10, 0)">
          <rect x="15" y="10" width="8" height="80" fill="black" />

          <path
            d="M23 10 H75 L50 40 L23 25 Z"
            fill="red"
            stroke="black"
            strokeWidth="4"
          />

          <path
            d="M23 25 L50 40 L75 10"
            stroke="black"
            strokeWidth="6"
            opacity="0.4"
          />

          <rect x="10" y="85" width="20" height="10" fill="black" />
        </g>
      </svg>
    </div>
  );
};

export default Flag;
