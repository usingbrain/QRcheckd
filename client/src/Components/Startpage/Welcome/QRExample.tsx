const sectionStyle = "bg-white flex flex-row rounded-sm w-10/12 md:h-4/6 h-80 items-center m-auto invisible sm:visible";
const profileStyle = "bg-green flex rounded-sm h-full w-1/2 flex-col justify-center items-center p-2";
const lottieStyle = "w-1/2";

const QRExample: React.FC = () => {
    return (
        <div className="h-screen w-full">
            <section className={sectionStyle}>
                <div className={lottieStyle}>
                    lottie
                </div>
                <div className={profileStyle}>
                    Example profile
                </div>
            </section>
        </div>
    )
}

export default QRExample;