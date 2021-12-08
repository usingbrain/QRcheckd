import openOrCreate from '../../Assets/openclass.png';
import registerImg from '../../Assets/registerstudents.png';
import startImg from '../../Assets/startsession.png';
import attendanceImg from '../../Assets/classdata.png';
import studentData from '../../Assets/studentdata.png';

const imgStyle =
  'bg-white rounded-full h-16 w-16 flex justify-center items-center';
const info =
  'w-2/3 text-2xl h-20 flex flex-row md:pl-8 pl-1 pr-2 mb-8 items-center rounded-full justify-between';

interface Props {
  el: { color: string; text: string; img: string };
}

const Floop: React.FC<Props> = ({ el }) => {
  return (
    <div className={`${info} ${el.color}`}>
      <p>{el.text}</p>
      <div className={imgStyle}>
        <img src={el.img} alt={el.text} className="h-10 w-10" />
      </div>
    </div>
  );
};

const create = {
  color: 'bg-shades-one',
  text: 'Create or open a class',
  img: openOrCreate,
};

const register = {
  color: 'bg-shades-two',
  text: 'Register students',
  img: registerImg,
};

const start = {
  color: 'bg-shades-three',
  text: 'Start a session',
  img: startImg,
};

const access = {
  color: 'bg-shades-four',
  text: 'Access attendance data',
  img: attendanceImg,
};

const check = {
  color: 'bg-shades-five',
  text: 'Check individual student data',
  img: studentData,
};

const Instruction = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl my-8">Quick start</h1>
      <Floop el={create} />
      <Floop el={register} />
      <Floop el={start} />
      <Floop el={access} />
      <Floop el={check} />
    </div>
  );
};

export default Instruction;
