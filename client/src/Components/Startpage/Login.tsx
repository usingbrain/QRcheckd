import { ReactComponent as QRLogo } from '../Assets/PerfectLogo.svg';

const loginWrapper = "bg-black flex rounded-sm max-w-sm h-80 w-80 md:w-96 md:h-96 m-auto flex-col justify-center items-center p-2";
const inputStyle = "text-white h-12 w-32 md:h-16 md:w-56 lg:w-72 border-2 border-white bg-black my-2 p-2";
const signupLink = "text-white border-2 border-white my-2 bg-black";

const Login = () => {

    return (
        <div>
            <div className=" h-20 w-40 m-4"><QRLogo /></div>
            <div className={loginWrapper}>
                <form>
                    <div>
                        <input
                            className={inputStyle}
                            placeholder="Username..."
                        />
                    </div>
                    <div>
                        <input
                            className={inputStyle}
                            placeholder="Password..."
                        />
                    </div>
                    <button>Login</button>
                </form>
                <div className={signupLink}>
                    <p>Don't have an account? Link </p>
                </div>
            </div>
        </div>
    )
}

export default Login;