const exampleProfile = "bg-black flex rounded-sm w-full h-full lg:w-2/3 justify-center items-center flex-col invisible sm:visible text-white";
const profileStyle = "h-screen w-1/2 h-1/2 sm:float-right invisible sm:visible mx-8 md:mx-4";

const QRExample: React.FC = () => {
    return (
        <div className="h-screen">
            <div className={profileStyle}>
                <p className={exampleProfile}>Example Profile</p>
            </div>
        </div>
    )
}

export default QRExample;