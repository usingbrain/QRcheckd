import { Link } from "react-router-dom";
import React from "react";

const linkStyle = "flex text-white w-full h-12 lg:h-20 xl:h-24 border-2 border-white justify-center my-2 items-center md:text-xl hover:bg-green-light xl:text-2xl";
const buttonWrapper = "bg-green flex rounded-sm h-52 sm:h-72 lg:h-96 w-1/2 lg:w-4/12 xl:3/12 sm:float-right justify-center items-center flex-col px-8 mx-4 lg:px-16 xl:px-32";
const welcomeWrapper = "bg-white flex rounded-sm  justify-center flex-col p-4 m-auto sm:items-start items-center";
const textWrapper = "bg-black flex rounded-sm h-60 md:h-56 lg:h-60 xl:h-80 justify-center flex-col p-20 invisible sm:visible my-64 w-screen invisible sm:visible";
const exampleProfile = "bg-black flex rounded-sm h-60 w-60 md:w-80 md:h-56 lg:w-96 lg:h-60 xl:w-96 xl:h-80 sm:float-right sm:mx-16 justify-center items-center flex-col p-4 mx-auto xl:mx-32 invisible sm:visible";

const Welcome: React.FC = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex w-screen sm:flex-row flex-col sm:items-start items-center w-full">
                <div className={welcomeWrapper}>
                    <p className="text-black py-4 text-lg md:text-xl lg:text-2xl xl:text-3xl">Welcome to QRcheckd!</p>
                    <p className="text-black py-4 text-md md:text-lg lg:text-xl xl:text-2xl invisible sm:visible">We help you take attendance quickly, easily, and without hassle.</p>
                </div>
                <div className={buttonWrapper}>
                    <ul className="w-full">
                        <li className="w-full">
                            <p><Link to={'/register'} className={linkStyle}>Register</Link></p>
                        </li>
                        <li>
                            <p><Link to="/login" className={linkStyle}>Login</Link></p>
                        </li>
                    </ul>
                </div></div>

            <div className={textWrapper}>
                <p className="text-white py-4 text-lg md:text-xl lg:text-2xl xl:text-3xl">Keep track of all of your classes in your profile.</p>
            </div>
            <div className={exampleProfile}>
                <p className="text-white">Example Profile</p>
            </div>
        </div>
    )
}

export default Welcome;