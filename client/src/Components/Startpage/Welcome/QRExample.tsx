import UI from '../../UI/StartpageUI';

const QRExample: React.FC = () => {
    return (
        <div className="h-screen">
            <div className={UI.QRExampleStyles.profileStyle}>
                <p className={UI.QRExampleStyles.exampleProfile}>Example Profile</p>
            </div>
        </div>
    )
}

export default QRExample;