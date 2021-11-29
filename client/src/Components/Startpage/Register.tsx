import { useState } from "react";
import React from "react";

const registerWrapper = "bg-green flex rounded-sm xl:w-5/12 w-1/2 m-auto flex-col justify-center items-center p-2 shadow-lg";
const inputStyle = "text-white w-full border-b-2 border-b-white bg-green my-2 py-2 placeholder-green-light";
const continueBtn = "text-green my-2 bg-white p-2 flex justify-center my-4";
const selector = "text-green my-2 bg-white p-3 my-4 flex justify-center";

const initUser = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: ''
}

const Register: React.FC = () => {
    const [userInfo, setUserInfo] = useState(initUser);

    const userChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div>
            <div className={registerWrapper}>
                <h1 className="p-4 text-white text-xl xl:text-2xl">Register</h1>
                <form className="w-full px-4">
                    <div>
                        <input
                            name="firstname"
                            value={userInfo.firstname}
                            className={inputStyle}
                            placeholder="First Name"
                            onChange={userChange}
                        />
                    </div>
                    <div>
                        <input
                            name="lastname"
                            value={userInfo.lastname}
                            className={inputStyle}
                            placeholder="Last Name"
                            onChange={userChange}
                        />
                    </div>
                    <div>
                        <input
                            name="email"
                            value={userInfo.email}
                            className={inputStyle}
                            placeholder="Email"
                            onChange={userChange}
                        />
                    </div>
                    <div>
                        <input
                            name="password"
                            value={userInfo.password}
                            className={inputStyle}
                            placeholder="Password"
                            onChange={userChange}
                        />
                    </div>
                    <div className={selector}>
                        <select className="bg-white" name="role" value={userInfo.role} onChange={userChange} required>
                            <option hidden value="default">Select Role</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                        </select>
                    </div>
                    <div className={continueBtn}>
                        <button>Continue</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;