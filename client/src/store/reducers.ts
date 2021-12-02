import { combineReducers } from 'redux';
import User from '../Types/user';
import Course from '../Types/course';
import Session from '../Types/session';

type UserReducer = (
  state: User | null,
  action: { type: string; user: User }
) => User | null;

const user: UserReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    default:
      return state;
  }
};

type CoursesReducer = (
  state: Course[] | null,
  action: { type: string; courses: Course[] }
) => Course[] | null;

const courses: CoursesReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_COURSES':
      return action.courses;
    default:
      return state;
  }
};

type SelectedCourseReducer = (
  state: Course | null,
  action: { type: string; selected: Course }
) => Course | null;

const selectedCourse: SelectedCourseReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SELECTED':
      return action.selected;
    default:
      return state;
  }
};

type SessionReducer = (
  state: Session | null,
  action: { type: string; session: Session }
) => Session | null;

const session: SessionReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      return action.session;
    default:
      return state;
  }
};

const reducers = combineReducers({ user, courses, selectedCourse, session });

export default reducers;
