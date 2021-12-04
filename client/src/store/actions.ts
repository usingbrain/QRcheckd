import User from '../Types/user';
import Course from '../Types/course';
import Session from '../Types/session';

export const setUser = (user: User) => ({
  type: 'SET_USER',
  user,
});

export const setCourses = (courses: Course[]) => ({
  type: 'SET_COURSES',
  courses,
});

export const setSelected = (selected: Course | null) => ({
  type: 'SET_SELECTED',
  selected,
});

export const setSession = (session: Session | null) => ({
  type: 'SET_SESSION',
  session,
});

export const setForm = (open: boolean) => ({
  type: 'SET_FORM',
  open,
});
