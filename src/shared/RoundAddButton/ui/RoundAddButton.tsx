import styles from './RoundAddButton.module.css';
type TRoundAddButtonProp = {
  onClick: () => void;
  children: React.ReactNode;
};

export function RoundAddButton({ onClick, children }: TRoundAddButtonProp) {
  return (
    <button className={styles.roundAddButton} onClick={onClick}>
      {children}
    </button>
  );
}
