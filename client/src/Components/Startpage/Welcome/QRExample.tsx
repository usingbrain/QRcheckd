import Lottie from 'react-lottie';
import animationData from '../Assets/qranimation.json';

const sectionStyle = "bg-white flex flex-row rounded-sm w-11/12 md:h-4/6 h-80 items-center m-auto invisible sm:visible";
const lottieStyle = "bg-green-light flex rounded-sm h-full w-1/2 flex-col justify-center items-center p-2";
const paragraph = "w-1/2 px-10 tracking-wider text-lg md:text-xl xl:px-32 xl:text-2xl leading-loose";

const QRExample: React.FC = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {}
    };

    return (
        <div className="h-screen w-full">
            <section className={sectionStyle}>
                <div className={paragraph}>
                    With a unique QR code for the current class session, teachers can easily
                    have their students sign in to class. No more wasting class time to manually
                    check attendance.
                </div>
                <div className={lottieStyle}>
                    <Lottie options={defaultOptions}
                        height={'100%'}
                        width={'100%'}
                    />
                </div>
            </section>
        </div>
    )
}

export default QRExample;