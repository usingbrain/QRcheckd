import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import React from "react";
import lottie from "lottie-web";
import UI from '../UI/StartpageUI';

const initUser = {
    email: '',
    password: ''
}

const Login: React.FC = () => {
    const [userInfo, setUserInfo] = useState(initUser);

    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (container.current) {
            lottie.loadAnimation({
                container: container.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: require('./Assets/loginanimation.json')
            })
        }
    }, [])

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
            <div className={UI.loginStyles.outerBox}>
                <div className={UI.loginStyles.lottieStyle} ref={container}></div>
                <div className={UI.loginStyles.loginStyle}>
                    <form className="w-full px-4">
                        <p className="text-xl text-white p-2 flex justify-center lg:text-3xl">Login</p>
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