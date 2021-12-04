import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setForm, setSelected } from '../../store/actions';
import { useCreateCourseMutation } from '../../generated/graphql';
import { ReactComponent as CloseBtn } from '../../Assets/window-close-regular.svg';
import Course from '../../Types/course';

const popUpStyle = "w-1/2 h-5/6 bg-green"

const AddForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const open = useSelector((state: { form: boolean }) => state.form);
  const selected = useSelector(
    (state: { selectedCourse: Course | null }) => state.selectedCourse
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [, createCourse] = useCreateCourseMutation();

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
    <div className={popUpStyle}>
      <Link to="/homepage">
        <button>
          <CloseBtn className="w-10 h-10" />
        </button>
      </Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={title}
          placeholder="input the course title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add new course</button>
      </form>
    </div>
  );
};

export default AddForm;
