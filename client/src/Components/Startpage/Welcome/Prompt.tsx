import React from "react";
import { Link } from "react-router-dom";
import Lottie from 'react-lottie';
import animationData from '../Assets/checklist.json';

const linkStyle = "flex text-white w-full h-12 md:h-14 lg:h-20 xl:h-24 border-2 border-white justify-center my-4 md:my-8 items-center md:text-xl hover:bg-green-light xl:text-2xl";
const promptStyle = "bg-white flex flex-row rounded-sm w-1/2 sm:w-10/12 h-80 lg:h-96 items-center m-auto my-8";
const checklistStyle = "invisible sm:visible w-0 sm:w-1/2 h-full";
const buttonStyle = "bg-green flex rounded-sm h-full w-full sm:w-1/2 lg:w-4/12 justify-center items-center flex-col px-8 lg:px-8 xl:px-16 hover:shadow-2xl";
const welcomeStyle = "flex rounded-sm justify-center flex-col sm:items-start items-center w-0 sm:w-1/2 sm:p-4 m-auto";

const Prompt: React.FC = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {}
    };

    return (
        <div className="w-full">
            <header className="flex flex-col">
                <p className="text-black text-2xl lg:text-3xl xl:text-5xl m-auto py-4">Welcome to QRcheckd!</p>
            </header>
            <section className={promptStyle}>
                <article className={welcomeStyle}>
                    <div className={checklistStyle}>
                        <Lottie options={defaultOptions}
                            height={200}
                            width={'100%'}
                        />
                    </div>
                    <p className="text-black text-md md:text-lg lg:text-xl xl:text-2xl invisible sm:visible">We help you take attendance quickly, easily, and without hassle.</p>
                </article>
                <aside className={buttonStyle}>
                    <ul className="w-full">
                        <li className="w-full">
                            <p><Link to={'/register'} className={linkStyle}>Register</Link></p>
                        </li>
                        <li>
                            <p><Link to={"/login"} className={linkStyle}>Login</Link></p>
                        </li>
                    </ul>
                </aside>
            </section>
        </div>
    )
}

export default Prompt;