import openOrCreate from '../../Assets/openclass.png';
import registerImg from '../../Assets/registerstudents.png';
import startImg from '../../Assets/startsession.png';
import attendanceImg from '../../Assets/classdata.png';
import studentData from '../../Assets/studentdata.png';

const imgStyle =
  'bg-white rounded-full h-16 w-16 flex justify-center items-center';
const info =
  'w-2/3 text-2xl h-20 flex md:pl-8 pl-1 pr-2 items-center rounded-full justify-between';

const Instruction = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-5xl my-8'>Quick start</h1>
      <p className={`${info} mb-4 bg-shades-one`}>
        Create or open a class
        <div className={imgStyle}>
          <img
            src={openOrCreate}
            alt='Open or create class'
            className='h-10 w-10'
          />
        </div>
      </p>
      <p className={`${info} my-4 bg-shades-two`}>
        Register students
        <div className={imgStyle}>
          <img
            src={registerImg}
            alt='Open or create class'
            className='h-10 w-10'
          />
        </div>
      </p>
      <p className={`${info} my-4 bg-shades-three`}>
        Start a session
        <div className={imgStyle}>
          <img
            src={startImg}
            alt='Open or create class'
            className='h-10 w-10'
          />
        </div>
      </p>
      <p className={`${info} my-4 bg-shades-four`}>
        Access attendance data
        <div className={imgStyle}>
          <img
            src={attendanceImg}
            alt='Open or create class'
            className='h-10 w-10'
          />
        </div>
      </p>
      <p className={`${info} my-4 bg-shades-five`}>
        Check individual student data
        <div className={imgStyle}>
          <img
            src={studentData}
            alt='Open or create class'
            className='h-10 w-10'
          />
        </div>
      </p>
    </div>
  );
};

export default Instruction;
