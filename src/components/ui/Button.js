import styles from './Button.module.css';

const Button = props => {
  return (
    <button
      onClick={props.onClick || null}
      disabled={props.disabled || false}
      form={props.form || null}
      className={styles.button}
    >
      {props.children}
    </button>
  );
};

export default Button;
