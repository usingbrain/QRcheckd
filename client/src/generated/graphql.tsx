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

export type Course = {
  __typename?: 'Course';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  teacher?: Maybe<Scalars['Int']>;
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
  assignStudent: Scalars['Boolean'];
  attend: Scalars['Boolean'];
  createCourse?: Maybe<Course>;
  createSession?: Maybe<Session>;
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


export type MutationRegisterUserArgs = {
  user: InputUser;
};

export type Query = {
  __typename?: 'Query';
  getAssignedStudents?: Maybe<Array<Maybe<Student>>>;
  getCourses?: Maybe<Array<Maybe<Course>>>;
  getSessionAttendance?: Maybe<Array<Maybe<Student>>>;
  loginUser?: Maybe<Response>;
  me?: Maybe<User>;
};


export type QueryGetAssignedStudentsArgs = {
  courseId: Scalars['Int'];
};


export type QueryGetSessionAttendanceArgs = {
  sessionId: Scalars['Int'];
};


export type QueryLoginUserArgs = {
  credentials: Credentials;
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

export type RegisterMutationVariables = Exact<{
  user: InputUser;
}>;


export type RegisterMutation = { __typename?: 'Mutation', registerUser?: { __typename?: 'Response', error?: string | null | undefined, data?: { __typename?: 'User', id?: number | null | undefined, name?: string | null | undefined, lastname?: string | null | undefined, email?: string | null | undefined, role?: string | null | undefined } | null | undefined } | null | undefined };


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