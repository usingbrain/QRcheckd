import React from "react";
import { ReactComponent as QRLogo } from '../../../Assets/PerfectLogo2.svg';
import Prompt from "./Prompt";
import QRExample from "./QRExample";


const textStyle = "bg-black flex rounded-sm h-60 md:h-56 lg:h-60 xl:h-80 justify-center flex-col p-20 invisible sm:visible my-48 w-screen invisible sm:visible";

const Welcome: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-screen">
            <header className="h-20 w-32 m-2 md:h-28 md:w-40 lg:h-40 lg:w-48"><QRLogo /></header>
            <section><Prompt /></section>
            <div className={textStyle}>
                <p className="text-white py-4 text-lg md:text-xl lg:text-2xl xl:text-3xl">Students can scan a QR code to check attendance.</p>
            </div>
            <div className="h-screen w-full">
                <section className="h-screen"><QRExample /></section>
            </div>
        </div>
    )
}

export default Welcome;