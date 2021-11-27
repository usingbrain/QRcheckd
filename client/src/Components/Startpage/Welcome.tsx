import { Link } from "react-router-dom";

const linkStyle = "text-white h-12 w-32 md:h-20 md:w-56 lg:w-72 border-2 border-white flex justify-center m-2 items-center";
const buttonWrapper = "bg-black flex rounded-sm max-w-sm h-60 w-60 md:w-80 md:h-56 lg:w-96 lg:h-60 xl:w-96 xl:h-80 sm:float-right sm:mx-16 justify-center items-center flex-col p-4 mx-auto xl:mx-32";
const welcomeWrapper = "bg-white flex rounded-sm max-w-sm h-60 w-60 md:w-80 md:h-56 lg:w-96 lg:h-60 xl:w-96 xl:h-80 sm:mx-16 justify-center flex-col p-4 invisible sm:visible xl:mx-32";

const Welcome = () => {
    return (
        <div>
            <div className={buttonWrapper}>
                <ul>
                    <li>
                        <p><Link to={'/register'} className={linkStyle}>Register</Link></p>
                    </li>
                    <li>
                        <p><Link to="/login" className={linkStyle}>Login</Link></p>
                    </li>
                </ul>
            </div>
            <div className={welcomeWrapper}>
                <p className="text-black py-4 text-lg md:text-xl lg:text-2xl xl:text-3xl">Welcome to QRcheckd!</p>
                <p className="text-black py-4 text-md md:text-lg lg:text-xl xl:text-2xl">We help you take attendance quickly, easily, and without hassle.</p>
            </div>
        </div>
    )
}

export default Welcome;