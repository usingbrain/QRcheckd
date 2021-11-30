import { Link } from "react-router-dom";
import React from "react";
import UI from '../UI/StartpageUI';
import { ReactComponent as QRLogo } from '../Assets/PerfectLogo.svg';

const Welcome: React.FC = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="h-20 w-32 m-auto my-4 md:h-28 md:w-40 lg:h-32 lg:w-44"><QRLogo /></div>
            <div className="flex w-screen sm:flex-row flex-col sm:items-start items-center w-full">
                <div className={UI.welcomeStyles.welcomeStyle}>
                    <p className="text-black py-4 text-xl lg:text-2xl xl:text-3xl">Welcome to QRcheckd!</p>
                    <p className="text-black py-4 text-md md:text-lg lg:text-xl xl:text-2xl invisible sm:visible">We help you take attendance quickly, easily, and without hassle.</p>
                </div>
                <div className={UI.welcomeStyles.buttonStyle}>
                    <ul className="w-full">
                        <li className="w-full">
                            <p><Link to={'/register'} className={UI.welcomeStyles.linkStyle}>Register</Link></p>
                        </li>
                        <li>
                            <p><Link to="/login" className={UI.welcomeStyles.linkStyle}>Login</Link></p>
                        </li>
                    </ul>
                </div></div>
            <div className={UI.welcomeStyles.textStyle}>
                <p className="text-white py-4 text-lg md:text-xl lg:text-2xl xl:text-3xl">Keep track of your classes in your profile.</p>
            </div>
            <div className={UI.welcomeStyles.exampleProfile}>
                <p className="text-white">Example Profile</p>
            </div>
        </div>
    )
}

export default Welcome;