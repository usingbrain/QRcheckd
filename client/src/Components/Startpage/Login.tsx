import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";
import UI from '../UI/StartpageUI';
import { ReactComponent as QRLogo } from '../../Assets/PerfectLogo2.svg';
import Lottie from 'react-lottie';
import animationData from './Assets/loginanimation.json';

const initUser = {
    email: '',
    password: ''
}

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
            <div className={UI.loginStyles.outerBox}>
                <div className={UI.loginStyles.lottieStyle}>
                    <Lottie options={defaultOptions}
                        height={400}
                        width={'100%'}
                    />
                </div>
                <div className={UI.loginStyles.loginStyle}>
                    <form className="w-full px-4">
                        <p className="text-xl text-white p-2 flex justify-center lg:text-3xl">Welcome back.</p>
                        <div>
                            <input
                                value={userInfo.email}
                                name="email"
                                className={UI.loginStyles.inputStyle}
                                placeholder="Email..."
                                onChange={userChange}
                            />
                        </div>
                        <div>
                            <input
                                value={userInfo.password}
                                name="password"
                                className={UI.loginStyles.inputStyle}
                                placeholder="Password..."
                                onChange={userChange}
                            />
                        </div>
                        <div className={UI.loginStyles.loginBtn}>
                            <button type="submit" disabled={validateForm()}>Login</button>
                        </div>
                    </form>
                    <div className={UI.loginStyles.signupLink}>
                        <p className=" text-lg lg:text-xl">Don't have an account?</p>
                        <Link to={'/register'} className={UI.loginStyles.linkStyle}> Sign up here.</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;