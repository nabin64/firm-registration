import React from 'react';
import { Formik, Form, Field, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link'
import { Button, message } from 'antd';
import styles from '../styles/registration.module.css';
import { useRouter } from 'next/router';
const SignupSchema = Yup.object().shape({
    fullName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    address: Yup.string().min(2, 'Too Short!').max(50, 'Too Long').required('required'),
    password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    phoneNumber: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
    role: Yup.string().required('Required')
});


const Register = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const registerUser = async (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
        try {
            const res = await fetch('http://localhost:4000/register', requestOptions)
            const data = await res.json()
            if (res && data.success) {
                messageApi.success(data.msg)
                router.push('/')
            } else {
                messageApi.error(data.msg)
            }

        } catch (error) {
            messageApi.warning(data.msg)

        }
    }

    return (
        <div className={styles.container}>

            <Formik
                initialValues={{
                    fullName: '',
                    address: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: '',
                    role: ''
                }}



                validationSchema={SignupSchema}
                onSubmit={values => {
                    // same shape as initial values
                    registerUser(values)

                }}
            >
                {({ errors, touched }) => (
                    <Form className={styles.Home_form}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/1/1f/New_Emblem_of_Nepal_Red.png"
                            alt="Government of Nepal"
                            style={{ width: '100px', height: '80px' }}
                        />
                        <h1>Register your user </h1>
                        <Field className={styles.Home_input} name="fullName" placeholder="Full Name" />
                        {errors.fullName && touched.fullName ? (
                            <div>{errors.fullName}</div>
                        ) : null}

                        <Field className={styles.Home_input} name="address" placeholder="Address" />
                        {errors.address && touched.address ? (
                            <div>{errors.address}</div>
                        ) : null}

                        <Field className={styles.Home_input} name="phoneNumber" placeholder="phoneNumber" />
                        {errors.phoneNumber && touched.phoneNumber ? <div>{errors.phoneNumber}</div> : null}

                        <Field className={styles.Home_input} name="password" placeholder="Password" />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}


                        <Field className={styles.Home_input} name="confirmPassword" placeholder="Confirm password" />
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <div>{errors.confirmPassword}</div>
                        ) : null}

                        <Field className={styles.Home_input} as="select" name="role">
                            <option value="">Select a role</option>
                            <option value="admin">Admin</option>
                            <option value="ward">Ward</option>
                            <option value="firm">Firm</option>
                        </Field>
                        {errors.role && touched.role ? <div>{errors.role}</div> : null}


                        <button type="submit">Submit</button>
                        Already have an account yet? <Link href="/">Login</Link> instead
                    </Form>
                )}
            </Formik>
            {contextHolder}
        </div>
    );
}

export default Register