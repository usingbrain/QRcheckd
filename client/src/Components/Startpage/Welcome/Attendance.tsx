import attendImg from '../Assets/attendance.png';

const sectionStyle = "bg-white flex flex-row rounded-sm w-11/12 md:h-4/6 h-80 items-center m-auto invisible sm:visible my-32";
const outerStyle = "bg-white flex rounded-sm h-full w-1/2 lg:w-5/12 flex-col justify-center items-center p-2";
const paragraph = "w-1/2 lg:w-7/12 px-10 tracking-wider text-lg md:text-xl xl:px-32 xl:text-2xl leading-loose";
const imageStyle = "bg-white w-5/6 p-1/4";

const Attendance: React.FC = () => {

    return (
        <div className="h-screen w-full">
            <section className={sectionStyle}>
                <div className={outerStyle}>
                    <article className={imageStyle}>
                        <img src={attendImg} alt="attendance example" className="w-full h-full" />
                    </article>
                </div>
                <div className={paragraph}>
                    Once you begin a session, you'll recieve a list that
                    automatically updates as students sign in to class.
                </div>
            </section>
        </div>
    )
}

export default Attendance;