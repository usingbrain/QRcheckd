import { useState } from "react";
import React from "react";

const loginWrapper = "bg-black flex rounded-sm w-96 m-auto flex-col justify-center items-center p-2";
const inputStyle = "text-white h-12 w-38 md:h-16 md:w-56 lg:w-72 border-2 border-white bg-black my-2 p-2 placeholder-white";
const continueBtn = "text-white border-2 border-white my-2 bg-black p-1 flex justify-center";
const selector = "text-white border-2 border-white my-2 bg-black p-2 flex justify-center";

const userInfoInit = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
}

const Register: React.FC = () => {
    const [userInfo, setUserInfo] = useState(userInfoInit);

    const userChange = (e: { target: HTMLInputElement }) => {
        const { value } = e.target;
    }

    return (
        <div>
            <div className={loginWrapper}>
                <form>
                    <div>
                        <input
                            className={inputStyle}
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <input
                            className={inputStyle}
                            placeholder="Last Name"
                        />
                    </div>
                    <div>
                        <input
                            className={inputStyle}
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <input
                            className={inputStyle}
                            placeholder="Password"
                        />
                    </div>
                    <div className={selector}>
                        <select className="bg-black">
                            <option disabled hidden selected>Select Role</option>
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