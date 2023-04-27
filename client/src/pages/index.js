import { useState } from 'react';
import { useRouter } from 'next/router'; // import useHistory hook from react-router-dom
import styles from '../styles/LoginPage.module.css';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleToggle = () => {
    setIsAdmin(!isAdmin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // send login data to the server for verification
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, userType: isAdmin ? 'admin' : 'user' }),
    });

    const data = await response.json();

    if (data.success) {
      // if login successful, redirect to another page
      router.push('/registration'); // Red
    } else {
      // show error message
      alert(data.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.login} onSubmit={handleSubmit}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/1f/New_Emblem_of_Nepal_Red.png"
          alt="Government of Nepal"
          style={{ width: '100px', height: '80px' }}
        />

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
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit">Login</button>
        <div className={styles.forgetUserContainer}>
          <Link href ="/forgetpassword">
          <h3>Forget password</h3>
          </Link>
          <span className={styles.createUser}>
            <Link href="/registration">
              <h3><span>Create User ?</span></h3>
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
