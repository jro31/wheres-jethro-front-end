import styles from './Form.module.css';

const Form = props => {
  return (
    <div className={styles['form-container']}>
      <form onSubmit={props.onSubmit} className={styles.form} id={props.id || null}>
        {props.children}
      </form>
    </div>
  );
};

export default Form;
