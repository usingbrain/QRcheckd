import { ReactComponent as QRLogo } from '../Assets/PerfectLogo.svg';
import './Startpage.css';

const buttonStyle = "text-white h-12 w-32 md:h-20 md:w-56 lg:w-72 border-2 border-white my-2";
const buttonWrapper = "register-login flex rounded-sm max-w-sm h-30 w-60 md:w-80 md:h-56 lg:w-96 lg:h-60 xl:w-1/2 xl:h-80 float-right mx-16 justify-center items-center flex-col p-4";

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
        </div>
    )
}

export default Startpage;