import { useState } from 'react';
import styles from '../styles/ForgotPasswordPage.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // send email to server for password reset
    const response = await fetch('http://localhost:4000/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.success) {
      alert('An email has been sent to your email address with instructions on how to reset your password.');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.forgotPassword} onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <label>
          Email:
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
