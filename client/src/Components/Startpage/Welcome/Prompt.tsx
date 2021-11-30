import React from "react";
import { Link } from "react-router-dom";
import UI from '../../UI/StartpageUI';
import Lottie from 'react-lottie';
import animationData from '../Assets/checklist.json';

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
            <section className={UI.promptStyles.promptStyle}>
                <article className={UI.promptStyles.welcomeStyle}>
                    <div className={UI.promptStyles.checklistStyle}>
                        <Lottie options={defaultOptions}
                            height={200}
                            width={'100%'}
                        />
                    </div>
                    <p className="text-black text-md md:text-lg lg:text-xl xl:text-2xl invisible sm:visible">We help you take attendance quickly, easily, and without hassle.</p>
                </article>
                <aside className={UI.promptStyles.buttonStyle}>
                    <ul className="w-full">
                        <li className="w-full">
                            <p><Link to={'/register'} className={UI.promptStyles.linkStyle}>Register</Link></p>
                        </li>
                        <li>
                            <p><Link to={"/login"} className={UI.promptStyles.linkStyle}>Login</Link></p>
                        </li>
                    </ul>
                </aside>
            </section>
        </div>
    )
}

export default Prompt;