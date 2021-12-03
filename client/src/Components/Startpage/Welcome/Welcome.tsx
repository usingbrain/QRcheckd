import React from "react";
import Prompt from "./Prompt";
import QRExample from "./QRExample";
import { ReactComponent as QRLogo } from '../../../Assets/thePerfectestLogo2.svg';
import Attendance from "./Attendance";


const qrBarStyle = "bg-black flex rounded-sm h-60 md:h-56 lg:h-60 xl:h-80 justify-center flex-col p-20 invisible sm:visible my-40 w-screen invisible sm:visible";
const header = "bg-white flex rounded-sm h-0 sm:h-56 lg:h-60 xl:h-80 justify-center flex-col sm:p-8 p-0 w-screen shadow-lg invisible sm:visible";
const textStyle = "bg-green flex rounded-sm h-60 md:h-56 lg:h-60 xl:h-80 justify-center flex-col p-20 invisible sm:visible my-0 w-screen invisible sm:visible";

const Welcome: React.FC = () => {
    return (
        <div className="flex flex-col w-screen h-screen">
            <header className={header}>
                <div className="h-1/4 w-1/4 lg:h-1/5 lg:w-1/5 xl:h-1/6 xl:w-1/6 flex items-center invisible sm:visible"><QRLogo /></div>
            </header>
            <section><Prompt /></section>
            <article className={qrBarStyle}>
                <p className="text-white py-4 text-lg md:text-xl lg:text-2xl xl:text-3xl">Students can scan a QR code to check attendance.</p>
            </article>
            <div className="h-screen w-full">
                <section className="h-screen"><QRExample /></section>
            </div>
            <article className={textStyle}>
                <p className="text-white py-4 text-lg md:text-xl lg:text-2xl xl:text-4xl">Get attendance data in real time.</p>
            </article>
            <div className="h-screen w-full">
                <section className="h-screen"><Attendance /></section>
            </div>
            <footer className="border-t-2 border-grey-light">
                <div className="mx-8 text-grey-light">@ 2021 QRcheckd. Do whateva.</div>
            </footer>
        </div>
    )
}

export default Welcome;