import User from '../Types/user';
import Course from '../Types/course';

export const setUser = (user: User) => ({
  type: 'SET_USER',
  user,
});

export const setCourses = (courses: Course[]) => ({
  type: 'SET_COURSES',
  courses,
});

export const setSelected = (selected: Course) => ({
  type: 'SET_SELECTED',
  selected,
});
