import User from '../Types/user';
import Course from '../Types/course';
import Session from '../Types/session';
import Student from '../Types/student';

export const setUser = (user: User) => ({
  type: 'SET_USER',
  user,
});

export const setStudent = (student: Student | null) => ({
  type: 'SET_STUDENT',
  student,
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

export const setSessionId = (sessionId: number | null) => ({
  type: 'SET_SESSION_ID',
  sessionId,
});
export const setDate = (date: string | null) => ({
  type: 'SET_DATE',
  date,
});

export const setHistory = (showing: boolean) => ({
  type: 'SET_HISTORY',
  showing,
});

export const setCurrentList = (students: User[] | null) => ({
  type: 'SET_LIST',
  students,
});
