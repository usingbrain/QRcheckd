import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AssignStudentResponse = {
  __typename?: 'AssignStudentResponse';
  data?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
};

export type AssignedSessionResponse = {
  __typename?: 'AssignedSessionResponse';
  data: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type AssignedStudentsResponse = {
  __typename?: 'AssignedStudentsResponse';
  data?: Maybe<Array<Maybe<Student>>>;
  error?: Maybe<Scalars['String']>;
};

export type Attendance = {
  __typename?: 'Attendance';
  attended: Scalars['Boolean'];
  date: Scalars['String'];
};

export type AttendanceResponse = {
  __typename?: 'AttendanceResponse';
  data?: Maybe<Array<Maybe<Attendance>>>;
  error?: Maybe<Scalars['String']>;
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['Int'];
  name: Scalars['String'];
  teacher: Scalars['Int'];
};

export type CourseOverview = {
  __typename?: 'CourseOverview';
  sessions: Array<Maybe<Session>>;
  studentTotal: Scalars['Int'];
};

export type CourseResponse = {
  __typename?: 'CourseResponse';
  data?: Maybe<Course>;
  error?: Maybe<Scalars['String']>;
};

export type CoursesResponse = {
  __typename?: 'CoursesResponse';
  data?: Maybe<Array<Maybe<Course>>>;
  error?: Maybe<Scalars['String']>;
};

export type Credentials = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type DeletionResponse = {
  __typename?: 'DeletionResponse';
  data?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
};

export type InputUser = {
  email: Scalars['String'];
  lastname: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  data: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignStudent: AssignStudentResponse;
  attend: AssignedSessionResponse;
  createCourse?: Maybe<CourseResponse>;
  createSession: SessionResponse;
  deleteCourse?: Maybe<DeletionResponse>;
  endSession: AssignedSessionResponse;
  loginUser?: Maybe<Response>;
  logoutUser?: Maybe<LogoutResponse>;
  registerUser?: Maybe<Response>;
};


export type MutationAssignStudentArgs = {
  courseId: Scalars['Int'];
};


export type MutationAttendArgs = {
  sessionId: Scalars['Int'];
};


export type MutationCreateCourseArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type MutationCreateSessionArgs = {
  courseId: Scalars['Int'];
};


export type MutationDeleteCourseArgs = {
  courseId: Scalars['Int'];
};


export type MutationEndSessionArgs = {
  sessionId: Scalars['Int'];
};


export type MutationLoginUserArgs = {
  credentials?: InputMaybe<Credentials>;
};


export type MutationRegisterUserArgs = {
  user?: InputMaybe<InputUser>;
};

export type OverviewResponse = {
  __typename?: 'OverviewResponse';
  data?: Maybe<CourseOverview>;
  error?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getAssignedStudents: AssignedStudentsResponse;
  getCourse?: Maybe<CourseResponse>;
  getCourseOverview: OverviewResponse;
  getCourses?: Maybe<CoursesResponse>;
  getIndividualAttendance: AttendanceResponse;
  getSessionAttendance: SessionAttendanceResponse;
  me?: Maybe<User>;
};


export type QueryGetAssignedStudentsArgs = {
  courseId: Scalars['Int'];
};


export type QueryGetCourseArgs = {
  courseId: Scalars['Int'];
};


export type QueryGetCourseOverviewArgs = {
  courseId: Scalars['Int'];
};


export type QueryGetIndividualAttendanceArgs = {
  courseId: Scalars['Int'];
  studentId: Scalars['Int'];
};


export type QueryGetSessionAttendanceArgs = {
  sessionId: Scalars['Int'];
};

export type Response = {
  __typename?: 'Response';
  data?: Maybe<User>;
  error?: Maybe<Scalars['String']>;
};

export type Session = {
  __typename?: 'Session';
  attendance: Scalars['Int'];
  course: Scalars['Int'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
};

export type SessionAttendanceResponse = {
  __typename?: 'SessionAttendanceResponse';
  data?: Maybe<Array<Maybe<Student>>>;
  error?: Maybe<Scalars['String']>;
};

export type SessionResponse = {
  __typename?: 'SessionResponse';
  data?: Maybe<Session>;
  error?: Maybe<Scalars['String']>;
};

export type Student = {
  __typename?: 'Student';
  email: Scalars['String'];
  id: Scalars['Int'];
  lastname: Scalars['String'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  lastname: Scalars['String'];
  name: Scalars['String'];
  role: Scalars['String'];
};

export type AssignStudentMutationVariables = Exact<{
  courseId: Scalars['Int'];
}>;


export type AssignStudentMutation = { __typename?: 'Mutation', assignStudent: { __typename?: 'AssignStudentResponse', error?: string | null | undefined, data?: boolean | null | undefined } };

export type AttendMutationVariables = Exact<{
  sessionId: Scalars['Int'];
}>;


export type AttendMutation = { __typename?: 'Mutation', attend: { __typename?: 'AssignedSessionResponse', error?: string | null | undefined, data: boolean } };

export type CreateCourseMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse?: { __typename?: 'CourseResponse', error?: string | null | undefined, data?: { __typename?: 'Course', id: number, name: string, teacher: number } | null | undefined } | null | undefined };

export type CreateSessionMutationVariables = Exact<{
  courseId: Scalars['Int'];
}>;


export type CreateSessionMutation = { __typename?: 'Mutation', createSession: { __typename?: 'SessionResponse', error?: string | null | undefined, data?: { __typename?: 'Session', id: number, createdAt: string, course: number } | null | undefined } };

export type DeleteCourseMutationVariables = Exact<{
  courseId: Scalars['Int'];
}>;


export type DeleteCourseMutation = { __typename?: 'Mutation', deleteCourse?: { __typename?: 'DeletionResponse', error?: string | null | undefined, data?: boolean | null | undefined } | null | undefined };

export type EndSessionMutationVariables = Exact<{
  sessionId: Scalars['Int'];
}>;


export type EndSessionMutation = { __typename?: 'Mutation', endSession: { __typename?: 'AssignedSessionResponse', error?: string | null | undefined, data: boolean } };

export type LoginMutationVariables = Exact<{
  credentials: Credentials;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUser?: { __typename?: 'Response', error?: string | null | undefined, data?: { __typename?: 'User', id: number, name: string, lastname: string, email: string, role: string } | null | undefined } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logoutUser?: { __typename?: 'LogoutResponse', error?: string | null | undefined, data: boolean } | null | undefined };

export type RegisterMutationVariables = Exact<{
  user: InputUser;
}>;


export type RegisterMutation = { __typename?: 'Mutation', registerUser?: { __typename?: 'Response', error?: string | null | undefined, data?: { __typename?: 'User', id: number, name: string, lastname: string, email: string, role: string } | null | undefined } | null | undefined };

export type AssignedStudentsQueryVariables = Exact<{
  courseId: Scalars['Int'];
}>;


export type AssignedStudentsQuery = { __typename?: 'Query', getAssignedStudents: { __typename?: 'AssignedStudentsResponse', error?: string | null | undefined, data?: Array<{ __typename?: 'Student', id: number, name: string, lastname: string, email: string } | null | undefined> | null | undefined } };

export type CourseOverviewQueryVariables = Exact<{
  courseId: Scalars['Int'];
}>;


export type CourseOverviewQuery = { __typename?: 'Query', getCourseOverview: { __typename?: 'OverviewResponse', error?: string | null | undefined, data?: { __typename?: 'CourseOverview', studentTotal: number, sessions: Array<{ __typename?: 'Session', id: number, createdAt: string, attendance: number } | null | undefined> } | null | undefined } };

export type CoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type CoursesQuery = { __typename?: 'Query', getCourses?: { __typename?: 'CoursesResponse', error?: string | null | undefined, data?: Array<{ __typename?: 'Course', id: number, name: string, teacher: number } | null | undefined> | null | undefined } | null | undefined };

export type GetCourseQueryVariables = Exact<{
  courseId: Scalars['Int'];
}>;


export type GetCourseQuery = { __typename?: 'Query', getCourse?: { __typename?: 'CourseResponse', error?: string | null | undefined, data?: { __typename?: 'Course', id: number, name: string, teacher: number } | null | undefined } | null | undefined };

export type IndividualAttendanceQueryVariables = Exact<{
  courseId: Scalars['Int'];
  studentId: Scalars['Int'];
}>;


export type IndividualAttendanceQuery = { __typename?: 'Query', getIndividualAttendance: { __typename?: 'AttendanceResponse', error?: string | null | undefined, data?: Array<{ __typename?: 'Attendance', attended: boolean, date: string } | null | undefined> | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, name: string, lastname: string, email: string, role: string } | null | undefined };

export type SessionAttendanceQueryVariables = Exact<{
  sessionId: Scalars['Int'];
}>;


export type SessionAttendanceQuery = { __typename?: 'Query', getSessionAttendance: { __typename?: 'SessionAttendanceResponse', error?: string | null | undefined, data?: Array<{ __typename?: 'Student', name: string, lastname: string, email: string } | null | undefined> | null | undefined } };


export const AssignStudentDocument = gql`
    mutation AssignStudent($courseId: Int!) {
  assignStudent(courseId: $courseId) {
    error
    data
  }
}
    `;

export function useAssignStudentMutation() {
  return Urql.useMutation<AssignStudentMutation, AssignStudentMutationVariables>(AssignStudentDocument);
};
export const AttendDocument = gql`
    mutation Attend($sessionId: Int!) {
  attend(sessionId: $sessionId) {
    error
    data
  }
}
    `;

export function useAttendMutation() {
  return Urql.useMutation<AttendMutation, AttendMutationVariables>(AttendDocument);
};
export const CreateCourseDocument = gql`
    mutation CreateCourse($name: String!) {
  createCourse(name: $name) {
    error
    data {
      id
      name
      teacher
    }
  }
}
    `;

export function useCreateCourseMutation() {
  return Urql.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument);
};
export const CreateSessionDocument = gql`
    mutation CreateSession($courseId: Int!) {
  createSession(courseId: $courseId) {
    error
    data {
      id
      createdAt
      course
    }
  }
}
    `;

export function useCreateSessionMutation() {
  return Urql.useMutation<CreateSessionMutation, CreateSessionMutationVariables>(CreateSessionDocument);
};
export const DeleteCourseDocument = gql`
    mutation DeleteCourse($courseId: Int!) {
  deleteCourse(courseId: $courseId) {
    error
    data
  }
}
    `;

export function useDeleteCourseMutation() {
  return Urql.useMutation<DeleteCourseMutation, DeleteCourseMutationVariables>(DeleteCourseDocument);
};
export const EndSessionDocument = gql`
    mutation EndSession($sessionId: Int!) {
  endSession(sessionId: $sessionId) {
    error
    data
  }
}
    `;

export function useEndSessionMutation() {
  return Urql.useMutation<EndSessionMutation, EndSessionMutationVariables>(EndSessionDocument);
};
export const LoginDocument = gql`
    mutation Login($credentials: Credentials!) {
  loginUser(credentials: $credentials) {
    error
    data {
      id
      name
      lastname
      email
      role
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logoutUser {
    error
    data
  }
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($user: InputUser!) {
  registerUser(user: $user) {
    error
    data {
      id
      name
      lastname
      email
      role
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const AssignedStudentsDocument = gql`
    query AssignedStudents($courseId: Int!) {
  getAssignedStudents(courseId: $courseId) {
    error
    data {
      id
      name
      lastname
      email
    }
  }
}
    `;

export function useAssignedStudentsQuery(options: Omit<Urql.UseQueryArgs<AssignedStudentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AssignedStudentsQuery>({ query: AssignedStudentsDocument, ...options });
};
export const CourseOverviewDocument = gql`
    query CourseOverview($courseId: Int!) {
  getCourseOverview(courseId: $courseId) {
    error
    data {
      studentTotal
      sessions {
        id
        createdAt
        attendance
      }
    }
  }
}
    `;

export function useCourseOverviewQuery(options: Omit<Urql.UseQueryArgs<CourseOverviewQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CourseOverviewQuery>({ query: CourseOverviewDocument, ...options });
};
export const CoursesDocument = gql`
    query Courses {
  getCourses {
    error
    data {
      id
      name
      teacher
    }
  }
}
    `;

export function useCoursesQuery(options: Omit<Urql.UseQueryArgs<CoursesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CoursesQuery>({ query: CoursesDocument, ...options });
};
export const GetCourseDocument = gql`
    query GetCourse($courseId: Int!) {
  getCourse(courseId: $courseId) {
    error
    data {
      id
      name
      teacher
    }
  }
}
    `;

export function useGetCourseQuery(options: Omit<Urql.UseQueryArgs<GetCourseQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCourseQuery>({ query: GetCourseDocument, ...options });
};
export const IndividualAttendanceDocument = gql`
    query IndividualAttendance($courseId: Int!, $studentId: Int!) {
  getIndividualAttendance(courseId: $courseId, studentId: $studentId) {
    error
    data {
      attended
      date
    }
  }
}
    `;

export function useIndividualAttendanceQuery(options: Omit<Urql.UseQueryArgs<IndividualAttendanceQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IndividualAttendanceQuery>({ query: IndividualAttendanceDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    lastname
    email
    role
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const SessionAttendanceDocument = gql`
    query SessionAttendance($sessionId: Int!) {
  getSessionAttendance(sessionId: $sessionId) {
    error
    data {
      name
      lastname
      email
    }
  }
}
    `;

export function useSessionAttendanceQuery(options: Omit<Urql.UseQueryArgs<SessionAttendanceQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SessionAttendanceQuery>({ query: SessionAttendanceDocument, ...options });
};