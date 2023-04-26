import { useState } from 'react';
import styles from '../styles/Registration.module.css';

class User {
    constructor({ fullName, address, mobileNo, email, password, userType }) {
        this.fullName = fullName;
        this.address = address;
        this.mobileNo = mobileNo;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }
}

const RegistrationPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const handleToggle = () => {
        setIsAdmin(!isAdmin);
        console.log(isAdmin)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, address, mobileNo, email, password } = e.target;
        const newUser = new User({
            fullName: fullName.value,
            address: address.value,
            mobileNo: mobileNo.value,
            email: email.value,
            password: password.value,
            userType: isAdmin ? 'admin' : 'user',
        });
        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });
            const data = await response.text();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.Home_form} onSubmit={handleSubmit}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/1f/New_Emblem_of_Nepal_Red.png"
                    alt="Government of Nepal"
                    style={{ width: '100px', height: '80px' }}
                />

                <div className={styles.toggleContainer}>
                    <span>User</span>
                    <label className={styles.switch}>
                        <input type="checkbox" checked={isAdmin} onChange={handleToggle} />
                        <span className={styles.slider}></span>
                    </label>
                    <span>Admin</span>
                </div>

                <h2>{isAdmin ? 'Admin Registration' : 'User Registration'}</h2>

                <input type="text" className={styles.Home_input} name="fullName" placeholder="Full Name" />
                <input type="text" className={styles.Home_input} name="address" placeholder="Address" />
                <input type="text" className={styles.Home_input} name="mobileNo" placeholder="Mobile No" />
                <input type="email" className={styles.Home_input} name="email" placeholder="Email address" style={{ width: '365px' }} />
                <input type="password" className={styles.Home_input} name="password" placeholder="Password" />

                <button type="submit">Register Now</button>
            </form>
        </div>
    );
};

export default RegistrationPage;
