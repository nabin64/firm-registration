import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/LoginPage.module.css';
import Link from 'next/link';
import { message } from 'antd';

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: phoneNumber, password: password })
    };

    const res = await fetch('http://localhost:4000/login', requestOptions);
    const data = await res.json()

    try {
      if (res && data.success) {
        messageApi.success(data.msg);
      } else {
        messageApi.error(data.msg);
      }
    } catch (error) {
      messageApi.warning(data.msg);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.login} onSubmit={handleLogin}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/1f/New_Emblem_of_Nepal_Red.png"
          alt="Government of Nepal"
          style={{ width: '100px', height: '80px' }}
        />
        <label>
          Phone Number:
          <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
        <div className={styles.forgetUserContainer}>
          <Link href="/forgetpassword">
            <h3>Forget password</h3>
          </Link>
          <span className={styles.createUser}>
            <Link href="/registration">
              <h3><span>Create User ?</span></h3>
            </Link>
          </span>
        </div>
      </form>
      {contextHolder}
    </div>
  );
}

export default Home;
