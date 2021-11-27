import { ReactComponent as QRLogo } from '../Assets/PerfectLogo.svg';

const buttonStyle = "text-white h-12 w-32 md:h-20 md:w-56 lg:w-72 border-2 border-white my-2";
const buttonWrapper = "bg-black flex rounded-sm max-w-sm h-60 w-60 md:w-80 md:h-56 lg:w-96 lg:h-60 xl:w-96 xl:h-80 sm:float-right sm:mx-16 justify-center items-center flex-col p-4 mx-auto xl:mx-32";
const welcomeWrapper = "bg-white flex rounded-sm max-w-sm h-60 w-60 md:w-80 md:h-56 lg:w-96 lg:h-60 xl:w-96 xl:h-80 sm:mx-16 justify-center flex-col p-4 invisible sm:visible md:text-lg lg:text-xl xl:text-2xl xl:mx-32";

const Startpage = () => {
    return (
        <div>
            <div className=" h-24 w-40 m-4"><QRLogo /></div>
            <div className={buttonWrapper}>
                <div>
                    <button className={buttonStyle}>Register</button>
                </div>
                <div>
                    <button className={buttonStyle}>Login</button>
                </div>
            </div>
            <div className={welcomeWrapper}>
                <p className="text-black py-4">Welcome to QRcheckd!</p>
                <p className="text-black py-4">We help you take attendance quickly, easily, and without hassle.</p>
            </div>
        </div>
    )
}

export default Startpage;