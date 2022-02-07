import { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = props => {
  const [logoutError, setLogoutError] = useState('');

  const logoutHandler = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/logout`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Unable to logout');
      }

      const data = await response.json();

      if (data.logged_out) {
        props.setLoggedIn(false);
      } else {
        throw new Error('Unable to logout');
      }
    } catch (error) {
      setLogoutError(error);
    }
  };

  return (
    <div className={styles.navbar}>
      <div onClick={logoutHandler} className={styles['logout-button']}>
        Logout
      </div>
      {/* TODO - Display logout error */}
    </div>
  );
};

export default Navbar;
