import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

const loginWrapper = "bg-green flex rounded-sm sm:h-96 w-1/2 lg:w-5/12 h-72 m-auto flex-col justify-center items-center p-2";
const inputStyle = "text-white w-full border-b-2 border-b-white bg-green my-2 placeholder-green-light lg:text-xl";
const signupLink = "text-white bg-green p-2";
const loginBtn = "text-green my-2 bg-white py-1 flex justify-center w-full lg:text-xl";
const linkStyle = "flex text-white justify-center";

const initUser = {
    email: '',
    password: ''
}

const Login: React.FC = () => {
    const [userInfo, setUserInfo] = useState(initUser);

    const userChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div>
            <div className={loginWrapper}>
                <form className="w-full px-4">
                    <p className="text-xl text-white p-2 flex justify-center lg:text-3xl">Login</p>
                    <div>
                        <input
                            value={userInfo.email}
                            name="email"
                            className={inputStyle}
                            placeholder="Email..."
                            onChange={userChange}
                        />
                    </div>
                    <div>
                        <input
                            value={userInfo.password}
                            name="password"
                            className={inputStyle}
                            placeholder="Password..."
                            onChange={userChange}
                        />
                    </div>
                    <div className={loginBtn}>
                        <button>Login</button>
                    </div>
                </form>
                <div className={signupLink}>
                    <p className=" text-lg lg:text-xl">Don't have an account?</p>
                    <Link to={'/register'} className={linkStyle}> Sign up here.</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;