import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setForm } from '../../store/actions';
import { useCreateCourseMutation } from '../../generated/graphql';
import { ReactComponent as CloseBtn } from '../../Assets/window-close-regular.svg';

const AddForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const open = useSelector((state: { form: boolean }) => state.form);
  const dispatch = useDispatch();

  const [, createCourse] = useCreateCourseMutation();

  async function addCourse(name: string) {
    const response = await createCourse({ name });
    const courseId = response.data?.createCourse?.data?.id;
    return courseId;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.length > 1) addCourse(title);
    else {
      // display error
    }
    setTitle('');
    dispatch(setForm(open));
    // display new Course in ClassView
  }
  return (
    <div>
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
