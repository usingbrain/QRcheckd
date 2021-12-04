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

const popUpStyle = "bg-green-light w-1/2 lg:w-2/3 h-1/2 mt-32 shadow-2xl text-white p-4";
const lottieStyle = "invisible md:visible w-0 h-0 md:w-1/2 md:h-1/2 m-auto mb-16";

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
    rendererSettings: {}
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
    <div className="w-full h-screen flex justify-center flex-row">
      <section className={popUpStyle}>
        <Link to="/homepage" className="flex justify-end mb-4">
          <button
            onClick={() => {
              dispatch(setForm(open));
            }}
          >
            <CloseBtn className="w-10 h-10" />
          </button>
        </Link>
        <article className="h-3/4 w-full justify-center p-0">
          <div className={lottieStyle}>
            <Lottie options={defaultOptions}
              height={200}
              width={'100%'}
            />
          </div>
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-row items-center w-full">
            <input
              className="h-14 w-5/6 sm:w-full"
              type="text"
              value={title}
              placeholder="Input class title."
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" className="bg-green text-white text-4xl w-2/12 h-14">+</button>
          </form>
        </article>
      </section>
    </div>
  );
};

export default AddForm;
