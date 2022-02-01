import styles from './FullPageSpinner.module.css';

const FullPageSpinner = props => {
  return (
    <div className={styles['spinner-container']}>
      <div className={styles.spinner}></div>
      <div className={styles['spinner-text']}>{props.text}</div>
    </div>
  );
};

export default FullPageSpinner;
