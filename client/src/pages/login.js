import { useState } from 'react';
import styles from '../styles/LoginPage.module.css';

export default function LoginPage() {

  const [isAdmin, setIsAdmin] = useState(false);



  const handleToggle = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className={styles.container}>
      <form className={styles.login} >
        <img src="https://upload.wikimedia.org/wikipedia/commons/1/1f/New_Emblem_of_Nepal_Red.png" alt="Government of Nepal" style={{ width: "100px", height: "80px" }} />

        <h2>{isAdmin ? 'Admin Login' : 'User Login'}</h2>
        <div className={styles.toggleContainer}>
          <span>User</span>
          <label className={styles.switch}>
            <input type="checkbox" checked={isAdmin} onChange={handleToggle} />
            <span className={styles.slider}></span>
          </label>
          <span>Admin</span>
        </div>
        <label>
          Email:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <button type="submit">Login</button>  <span> <p>Forget password</p></span>


      </form>

    </div>
  );
}
