import { useState } from 'react';
import styles from '../styles/Registration.module.css';

const RegistrationPage = () => {

    const [isAdmin, setIsAdmin] = useState(false);

    const handleToggle = () => {
        setIsAdmin(!isAdmin);
    };

    return (
        <div className={styles.container}>
            <form className={styles.Home_form}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/1f/New_Emblem_of_Nepal_Red.png" alt="Government of Nepal" style={{ width: "100px", height: "80px" }} />

                <div className={styles.toggleContainer}>

                    <span>User</span>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={isAdmin} onChange={handleToggle} />
                        <span className={styles.slider}></span>
                    </label>
                    <span>Admin</span>
                </div>

                <h2>{isAdmin ? 'Admin Registration' : 'User Registration'}</h2>

                {isAdmin ? (
                    <>
                        <input type="text" className={styles.Home_input} placeholder="Full Name" />
                        <input type="text" className={styles.Home_input} placeholder="Address" />
                        <input type="text" className={styles.Home_input} placeholder="Mobile No" />
                        <input type="email" className={styles.Home_input} placeholder="Email address" style={{ width: "365px" }} />
                        <input type="password" className={styles.Home_input} placeholder="Password" />

                    </>
                ) : (
                    <>
                        <input type="text" className={styles.Home_input} placeholder="Full Name" />
                        <input type="text" className={styles.Home_input} placeholder="Address" />
                        <input type="text" className={styles.Home_input} placeholder="Mobile No" />
                        <input type="email" className={styles.Home_input} placeholder="Email address" style={{ width: "365px" }} />
                        <input type="text" className={styles.Home_input} placeholder="PAN" />
                        <input type="password" className={styles.Home_input} placeholder="Password" />
                    </>
                )}

                <button type="submit">Register Now</button>
            </form>
        </div>
    );
};

export default RegistrationPage;
