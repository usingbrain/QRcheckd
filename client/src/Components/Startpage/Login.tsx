import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import React from "react";
import lottie from "lottie-web";
import UI from '../UI/StartpageUI';
import { ReactComponent as QRLogo } from '../../Assets/PerfectLogo2.svg';

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
            <div className="h-20 w-32 m-auto md:my-4 md:h-28 md:w-40 lg:h-32 lg:w-44"><QRLogo /></div>
            <div className={UI.loginStyles.outerBox}>
                <div className={UI.loginStyles.lottieStyle} ref={container}></div>
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