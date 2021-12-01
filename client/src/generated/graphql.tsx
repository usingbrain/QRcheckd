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

export type AssignedStudentsResponse = {
  __typename?: 'AssignedStudentsResponse';
  data?: Maybe<Array<Maybe<Student>>>;
  error?: Maybe<Scalars['String']>;
};

export type AssignStudentResponse = {
  __typename?: 'AssignStudentResponse';
  data?: Maybe<Scalars['Boolean']>;
  error?: Maybe<Scalars['String']>;
};

export type AttendResponse = {
  __typename?: 'AttendResponse';
  data: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type Course = {
  __typename?: 'Course';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  teacher?: Maybe<Scalars['Int']>;
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
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type InputUser = {
  email?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  assignStudent: AssignStudentResponse;
  attend: AttendResponse;
  createCourse?: Maybe<CourseResponse>;
  createSession: SessionResponse;
  loginUser?: Maybe<Response>;
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


export type MutationLoginUserArgs = {
  credentials?: InputMaybe<Credentials>;
};


export type MutationRegisterUserArgs = {
  user?: InputMaybe<InputUser>;
};

export type Query = {
  __typename?: 'Query';
  getAssignedStudents: AssignedStudentsResponse;
  getCourses?: Maybe<CoursesResponse>;
  getSessionAttendance: SessionAttendanceResponse;
  me?: Maybe<User>;
};


export type QueryGetAssignedStudentsArgs = {
  courseId: Scalars['Int'];
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
  course?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
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
  email?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  lastname?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
};

export type AssignStudentMutationVariables = Exact<{
  courseId: Scalars['Int'];
}>;


export type AssignStudentMutation = { __typename?: 'Mutation', assignStudent: { __typename?: 'AssignStudentResponse', error?: string | null | undefined, data?: boolean | null | undefined } };

export type AttendMutationVariables = Exact<{
  sessionId: Scalars['Int'];
}>;


export type AttendMutation = { __typename?: 'Mutation', attend: { __typename?: 'AttendResponse', error?: string | null | undefined, data: boolean } };

export type CreateCourseMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse?: { __typename?: 'CourseResponse', error?: string | null | undefined, data?: { __typename?: 'Course', id?: number | null | undefined, name?: string | null | undefined, teacher?: number | null | undefined } | null | undefined } | null | undefined };

export type CreateSessionMutationVariables = Exact<{
  courseId: Scalars['Int'];
}>;


export type CreateSessionMutation = { __typename?: 'Mutation', createSession: { __typename?: 'SessionResponse', error?: string | null | undefined, data?: { __typename?: 'Session', id?: number | null | undefined, createdAt?: string | null | undefined, course?: number | null | undefined } | null | undefined } };

export type LoginMutationVariables = Exact<{
  credentials: Credentials;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginUser?: { __typename?: 'Response', error?: string | null | undefined, data?: { __typename?: 'User', id?: number | null | undefined, name?: string | null | undefined, lastname?: string | null | undefined, email?: string | null | undefined, role?: string | null | undefined } | null | undefined } | null | undefined };

export type RegisterMutationVariables = Exact<{
  user: InputUser;
}>;


export type RegisterMutation = { __typename?: 'Mutation', registerUser?: { __typename?: 'Response', error?: string | null | undefined, data?: { __typename?: 'User', id?: number | null | undefined, name?: string | null | undefined, lastname?: string | null | undefined, email?: string | null | undefined, role?: string | null | undefined } | null | undefined } | null | undefined };

export type AssignedStudentsQueryVariables = Exact<{
  courseId: Scalars['Int'];
}>;


export type AssignedStudentsQuery = { __typename?: 'Query', getAssignedStudents: { __typename?: 'AssignedStudentsResponse', error?: string | null | undefined, data?: Array<{ __typename?: 'Student', name?: string | null | undefined, lastname?: string | null | undefined, email?: string | null | undefined } | null | undefined> | null | undefined } };

export type CoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type CoursesQuery = { __typename?: 'Query', getCourses?: { __typename?: 'CoursesResponse', error?: string | null | undefined, data?: Array<{ __typename?: 'Course', id?: number | null | undefined, name?: string | null | undefined, teacher?: number | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id?: number | null | undefined, name?: string | null | undefined, lastname?: string | null | undefined, email?: string | null | undefined, role?: string | null | undefined } | null | undefined };

export type SessionAttendanceQueryVariables = Exact<{
  sessionId: Scalars['Int'];
}>;


export type SessionAttendanceQuery = { __typename?: 'Query', getSessionAttendance: { __typename?: 'SessionAttendanceResponse', error?: string | null | undefined, data?: Array<{ __typename?: 'Student', name?: string | null | undefined, lastname?: string | null | undefined, email?: string | null | undefined } | null | undefined> | null | undefined } };


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