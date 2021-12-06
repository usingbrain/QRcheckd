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

type formReducer = (
  state: boolean,
  action: { type: string; open: boolean }
) => boolean;

const form: formReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_FORM':
      return !action.open;
    default:
      return state;
  }
};

type historyReducer = (
  state: boolean,
  action: { type: string; showing: boolean }
) => boolean;

const history: historyReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_HISTORY':
      return !action.showing;
    default:
      return state;
  }
};

type currentListReducer = (
  state: User[] | null,
  action: { type: string; students: User[] | null }
) => User[] | null;

const currentList: currentListReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_LIST':
      return action.students;
    default:
      return state;
  }
};

const reducers = combineReducers({
  user,
  courses,
  selectedCourse,
  session,
  form,
  history,
  currentList,
});

export default reducers;
