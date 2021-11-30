import { useState } from "react";
import React from "react";
import UI from '../UI/StartpageUI';

const initUser = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: ''
}

const Register: React.FC = () => {
    const [userInfo, setUserInfo] = useState(initUser);

    const validateForm = () => {
        return (
            !userInfo.firstname || !userInfo.lastname || !userInfo.email || !userInfo.password
        );
    };

    const userChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log('submitted');
    }

    return (
        <div>
            <div className={UI.registerStyles.registerStyle}>
                <h1 className="p-4 text-white text-xl xl:text-2xl">Register</h1>
                <form className="w-full px-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            required
                            name="firstname"
                            value={userInfo.firstname}
                            className={UI.registerStyles.inputStyle}
                            placeholder="First Name"
                            onChange={userChange}
                        />
                    </div>
                    <div>
                        <input
                            required
                            name="lastname"
                            value={userInfo.lastname}
                            className={UI.registerStyles.inputStyle}
                            placeholder="Last Name"
                            onChange={userChange}
                        />
                    </div>
                    <div>
                        <input
                            required
                            name="email"
                            value={userInfo.email}
                            className={UI.registerStyles.inputStyle}
                            placeholder="Email"
                            onChange={userChange}
                        />
                    </div>
                    <div>
                        <input
                            required
                            name="password"
                            value={userInfo.password}
                            className={UI.registerStyles.inputStyle}
                            placeholder="Password"
                            onChange={userChange}
                        />
                    </div>
                    <div className={UI.registerStyles.selector}>
                        <select className="bg-white" name="role" value={userInfo.role} onChange={userChange} required>
                            <option hidden value="default">Select Role</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <div className={UI.registerStyles.continueBtn}>
                        <button type="submit" disabled={validateForm()}>Continue</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;