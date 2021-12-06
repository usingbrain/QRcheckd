import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setForm, setSelected } from '../../store/actions';
import { useCreateCourseMutation } from '../../generated/graphql';
import { ReactComponent as CloseBtn } from '../../Assets/window-close-regular.svg';
import Course from '../../Types/course';
import Lottie from 'react-lottie';
import animationData from '../../Assets/addclass2.json';

const popUpStyle = 'w-full h-1/2 text-white pb-8';
const lottieStyle = 'invisible md:visible w-0 h-0 md:w-4/12 md:h-auto';

const AddForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const open = useSelector((state: { form: boolean }) => state.form);
  const selected = useSelector(
    (state: { selectedCourse: Course | null }) => state.selectedCourse
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, createCourse] = useCreateCourseMutation();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {},
  };

  useEffect(() => {
    // display new Course in ClassView
    if (selected && !open) navigate(`/homepage/classes/${selected.id}`);
  }, [selected, open, navigate]);

  async function addCourse(name: string) {
    const response = await createCourse({ name });
    const course = response.data?.createCourse?.data;
    if (course) {
      dispatch(setSelected(course));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.length > 1) addCourse(title);
    else {
      // TODO: display error
    }
    setTitle('');
    dispatch(setForm(open));
  }
  return (
    <div className='h-full w-1/2 flex justify-center flex-row border-4 mx-auto mt-16'>
      <section className={popUpStyle}>
        <section className='flex flex-row justify-between items-center bg-black p-8 h-20 mb-4 text-3xl'>
          <h1 className='font-bold md:text-3xl text-xl'>Add new class.</h1>
          <Link to='/homepage'>
            <button
              onClick={() => {
                dispatch(setForm(open));
              }}
            >
              <CloseBtn className='w-10 h-10' />
            </button>
          </Link>
        </section>
        <article className='flex flex-col md:h-3/4 w-full justify-center items-center p-0 h-0'>
          <div className={lottieStyle}>
            <Lottie options={defaultOptions} height={'100%'} width={'100%'} />
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className='flex flex-row items-center w-7/12 border-4 border-green'
          >
            <input
              className='h-14 w-full sm:w-full text-2xl text-black px-6 focus:outline-none'
              type='text'
              value={title}
              placeholder='Input class title.'
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              type='submit'
              className='bg-green text-white text-lg lg:text-2xl sm:text-xl w-5/12 lg:w-3/12 h-14'
            >
              Add
            </button>
          </form>
        </article>
      </section>
    </div>
  );
};

export default AddForm;
