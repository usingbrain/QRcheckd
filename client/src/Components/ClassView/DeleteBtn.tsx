import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useDeleteCourseMutation } from '../../generated/graphql';
import { setCourses } from '../../store/actions';
import Course from '../../Types/course';

const btnStyle = {
  box: 'flex justify-center bg-green hover:bg-green-light py-4 rounded-sm text-lg mb-4 text-white h-16',
  button:
    'invisible md:visible w-0 md:w-full flex justify-center h-0 md:h-full',
  ptag: 'visible md:invisible md:w-0 md:h-0',
};

const alertStyle =
  'text-black flex flex-col items-center justify-evenly h-56 w-56 fixed inset-1/2';

const DeleteBtn: React.FC<{ courseId: number }> = ({ courseId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let success = false;
  const [askIfSure, setAskIfSure] = useState(false);

  const courses = useSelector(
    (state: { courses: Course[] | null }) => state.courses
  );

  const [, deleteCourse] = useDeleteCourseMutation();

  const handleDelete = async (courseId: number) => {
    const response = await deleteCourse({ courseId });
    if (response.error) {
    } // TODO: handle error
    if (response.data) {
      success = true;
      // filter the list, dispatch new one
      const coursesAfterDelete = courses?.filter(
        (course) => course.id !== courseId
      );
      // @ts-ignore
      dispatch(setCourses(coursesAfterDelete));
      setTimeout(() => navigate('/homepage'), 1000);
    }
  };

  const handleClick = () => {
    console.log('delete button clicked');
    // ask if sure!!!
    setAskIfSure(true);
  };

  useEffect(() => {
    console.log('askIfSure: ', askIfSure);
  }, [askIfSure]);

  return (
    <div className={btnStyle.box}>
      <button onClick={handleClick} className={btnStyle.button}>
        Delete course
      </button>
      {askIfSure && (
        <div className={alertStyle}>
          <h2>Are you sure you want to delete this course?</h2>
          <div>
            <button onClick={() => handleDelete(courseId)}>YES</button>
            <button onClick={() => setAskIfSure(false)}>CANCEL</button>
          </div>
        </div>
      )}
      {success && (
        <div className={alertStyle}>
          <h2>Course successfully deleted</h2>
        </div>
      )}
    </div>
  );
};

export default DeleteBtn;
