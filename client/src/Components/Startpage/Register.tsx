import { useState } from "react";
import React from "react";

const loginWrapper = "bg-black flex rounded-sm w-96 m-auto flex-col justify-center items-center p-2";
const inputStyle = "text-white h-12 w-38 md:h-16 md:w-56 lg:w-72 border-2 border-white bg-black my-2 p-2 placeholder-white";
const continueBtn = "text-white border-2 border-white my-2 bg-black p-1 flex justify-center";
const selector = "text-white border-2 border-white my-2 bg-black p-2 flex justify-center";

const initUser = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: ''
}

const Register: React.FC = () => {
    const [userInfo, setUserInfo] = useState(initUser);
    const [selectRole, setRoleValue] = useState<string>("default");

    const userChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const roleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setRoleValue(e.target.value);
    }

    return (
        <div>
            <div className={loginWrapper}>
                <form>
                    <div>
                        <input
                            name="firstname"
                            value={userInfo?.firstname}
                            className={inputStyle}
                            placeholder="First Name"
                            onChange={userChange}
                        />
                    </div>
                    <div>
                        <input
                            name="lastname"
                            value={userInfo?.lastname}
                            className={inputStyle}
                            placeholder="Last Name"
                            onChange={userChange}
                        />
                    </div>
                    <div>
                        <input
                            name="email"
                            value={userInfo?.email}
                            className={inputStyle}
                            placeholder="Email"
                            onChange={userChange}
                        />
                    </div>
                    <div>
                        <input
                            name="password"
                            value={userInfo?.password}
                            className={inputStyle}
                            placeholder="Password"
                            onChange={userChange}
                        />
                    </div>
                    <div className={selector}>
                        <select className="bg-black" value={selectRole} onChange={roleChange}>
                            <option disabled hidden selected value="default">Select Role</option>
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