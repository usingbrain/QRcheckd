import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { ReactComponent as QRLogo } from '../../../Assets/PerfectLogo2.svg';
import Lottie from 'react-lottie';
import animationData from '../Assets/loginanimation.json';

const initUser = {
    email: '',
    password: ''
}

const outerBox = "bg-white flex flex-row rounded-sm w-1/2 md:w-10/12 md:h-4/6 lg:w-9/12 h-80 items-center shadow-2xl m-auto";
const loginStyle = "bg-green flex rounded-sm w-full h-full md:w-1/2 flex-col justify-center items-center p-2";
const inputStyle = "text-white w-full border-b-2 border-b-white bg-green my-4 placeholder-green-light lg:text-xl";
const signupLink = "text-white bg-green p-2";
const loginBtn = "text-green my-4 bg-white py-1 flex justify-center w-full lg:text-xl";
const linkStyle = "flex text-white justify-center";
const lottieStyle = "md:w-1/2 w-0 invisible md:visible";

const Login: React.FC = () => {
    const [userInfo, setUserInfo] = useState(initUser);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {}
    };

    const userChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const validateForm = () => {
        return (
            !userInfo.email || !userInfo.password
        );
    };

    return (
        <div className="h-screen">
            <div className="h-20 w-32 m-auto md:my-4 md:h-28 md:w-40 lg:h-32 lg:w-44"><QRLogo /></div>
            <div className={outerBox}>
                <div className={lottieStyle}>
                    <Lottie options={defaultOptions}
                        height={400}
                        width={'100%'}
                    />
                </div>
                <div className={loginStyle}>
                    <form className="w-full px-4">
                        <p className="text-xl text-white p-2 flex justify-center lg:text-3xl">Welcome back.</p>
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
                            <button type="submit" disabled={validateForm()}>Login</button>
                        </div>
                    </form>
                    <div className={signupLink}>
                        <p className=" text-lg lg:text-xl">Don't have an account?</p>
                        <Link to={'/register'} className={linkStyle}> Sign up here.</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;