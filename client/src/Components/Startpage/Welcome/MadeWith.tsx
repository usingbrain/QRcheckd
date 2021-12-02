import reactImg from '../Assets/reactqr.png';
import tailwindImg from '../Assets/tailwind.png';
import postGres from '../Assets/postgresqr.png';
import graphQlImg from '../Assets/graphql.png';

const sectionStyle = "bg-white flex flex-row rounded-sm w-11/12 md:h-2/6 h-80 items-center m-auto";
const imgStyle = "bg-white flex rouned-sm w-2/12 h-2/3 shadow-2xl justify-around m-auto";

const MadeWith: React.FC = () => {

    return (
        <div className="h-screen w-full">
            <h1 className="text-black text-3xl m-auto flex justify-center">Made using</h1>
            <section className={sectionStyle}>
                <div className={imgStyle}><img src={reactImg}></img></div>
                <div className={imgStyle}><img src={tailwindImg}></img></div>
                <div className={imgStyle}><img src={postGres}></img></div>
                <div className={imgStyle}><img src={graphQlImg}></img></div>
            </section>
        </div>
    )
}

export default MadeWith;