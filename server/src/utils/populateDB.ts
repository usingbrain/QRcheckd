import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from '../mikro-orm.config';
import argon2 from 'argon2';
import { User } from '../entities/User';
import { Course } from '../entities/Course';
import { Session } from '../entities/Session';
import { AssignedSession } from '../entities/AssignedSession';
import { AssignedCourse } from '../entities/AssignedCourse';

const users = [
  {
    name: 'Bob',
    lastname: 'Elsher',
    email: 'bob@bob.com',
    password: 'Boooob@1',
    role: 'TEACHER',
  },
  {
    name: 'Ben',
    lastname: 'Levine',
    email: 'ben@bob.com',
    password: 'Beeeen@1',
    role: 'STUDENT',
  },
  {
    name: 'Anna',
    lastname: 'West',
    email: 'anna@bob.com',
    password: 'Annnna@1',
    role: 'STUDENT',
  },
  {
    name: 'Andy',
    lastname: 'Ellis',
    email: 'andy@bob.com',
    password: 'Annnndy@1',
    role: 'STUDENT',
  },
  {
    name: 'Brat',
    lastname: 'Hope',
    email: 'lol@bob.com',
    password: 'Looool@1',
    role: 'TEACHER',
  },
  {
    name: 'Guy',
    lastname: 'Gonzales',
    email: 'guy@bob.com',
    password: 'Guuuuy@1',
    role: 'STUDENT',
  },
  {
    name: 'Yone',
    lastname: 'Keller',
    email: 'yone@bob.com',
    password: 'Yoooone@1',
    role: 'STUDENT',
  },
  {
    name: 'Bartosz',
    lastname: 'Szatkowski',
    email: 'bartosz@bob.com',
    password: 'Bartosz@1',
    role: 'STUDENT',
  },
  {
    name: 'Maria',
    lastname: 'Sudermann',
    email: 'maria@bob.com',
    password: 'Maaaaria@1',
    role: 'STUDENT',
  },
  {
    name: 'Alexi',
    lastname: 'Bettinger',
    email: 'alexi@bob.com',
    password: 'Aleeeexi@1',
    role: 'STUDENT',
  },
];

const courses = [
  { name: 'Math 101', teacher: 1 },
  { name: 'CS50', teacher: 1 },
  { name: 'Codeworks', teacher: 1 },
  { name: 'TypeScript', teacher: 1 },
  { name: 'HireMe!', teacher: 1 },
  { name: 'Advanced Polish', teacher: 5 },
  { name: 'Literature', teacher: 5 },
];

const coursesAssigment = [
  { course_id: 1, student_id: 2 },
  { course_id: 1, student_id: 3 },
  { course_id: 1, student_id: 4 },
  { course_id: 1, student_id: 6 },
  { course_id: 1, student_id: 7 },
  { course_id: 2, student_id: 2 },
  { course_id: 2, student_id: 3 },
  { course_id: 2, student_id: 4 },
  { course_id: 2, student_id: 6 },
  { course_id: 3, student_id: 2 },
  { course_id: 3, student_id: 3 },
  { course_id: 3, student_id: 4 },
  { course_id: 3, student_id: 6 },
  { course_id: 3, student_id: 7 },
  { course_id: 3, student_id: 8 },
  { course_id: 3, student_id: 9 },
  { course_id: 3, student_id: 10 },
  { course_id: 4, student_id: 8 },
  { course_id: 4, student_id: 9 },
  { course_id: 4, student_id: 10 },
  { course_id: 5, student_id: 8 },
  { course_id: 5, student_id: 9 },
  { course_id: 5, student_id: 10 },
];

const sessions = [
  { course: 3, createdAt: 1636810916387 },
  { course: 3, createdAt: 1636983716387 },
  { course: 3, createdAt: 1637156516387 },
  { course: 3, createdAt: 1637329316387 },
  { course: 3, createdAt: 1637502116387 },
  { course: 3, createdAt: 1637674916387 },
  { course: 3, createdAt: 1637847716387 },
  { course: 3, createdAt: 1638020516387 },
  { course: 3, createdAt: 1638193316387 },
  { course: 3, createdAt: 1638366116387 },
  { course: 3, createdAt: 1638538916387 },
  { course: 3, createdAt: 1638711716387 },
];

const attendances = [
  { session_id: 1, student_id: 3 },
  { session_id: 1, student_id: 4 },
  { session_id: 1, student_id: 6 },
  { session_id: 1, student_id: 7 },
  { session_id: 1, student_id: 8 },
  { session_id: 1, student_id: 9 },
  { session_id: 1, student_id: 10 },
  { session_id: 2, student_id: 2 },
  { session_id: 2, student_id: 6 },
  { session_id: 2, student_id: 7 },
  { session_id: 2, student_id: 8 },
  { session_id: 2, student_id: 9 },
  { session_id: 2, student_id: 10 },
  { session_id: 3, student_id: 2 },
  { session_id: 3, student_id: 3 },
  { session_id: 3, student_id: 4 },
  { session_id: 3, student_id: 6 },
  { session_id: 3, student_id: 7 },
  { session_id: 3, student_id: 8 },
  { session_id: 3, student_id: 9 },
  { session_id: 3, student_id: 10 },
  { session_id: 4, student_id: 2 },
  { session_id: 4, student_id: 3 },
  { session_id: 4, student_id: 4 },
  { session_id: 4, student_id: 7 },
  { session_id: 4, student_id: 9 },
  { session_id: 4, student_id: 10 },
  { session_id: 5, student_id: 2 },
  { session_id: 5, student_id: 3 },
  { session_id: 5, student_id: 4 },
  { session_id: 5, student_id: 6 },
  { session_id: 5, student_id: 7 },
  { session_id: 5, student_id: 8 },
  { session_id: 5, student_id: 9 },
  { session_id: 5, student_id: 10 },
  { session_id: 6, student_id: 2 },
  { session_id: 6, student_id: 3 },
  { session_id: 6, student_id: 4 },
  { session_id: 6, student_id: 6 },
  { session_id: 6, student_id: 7 },
  { session_id: 6, student_id: 8 },
  { session_id: 6, student_id: 9 },
  { session_id: 6, student_id: 10 },
  { session_id: 7, student_id: 2 },
  { session_id: 7, student_id: 3 },
  { session_id: 7, student_id: 7 },
  { session_id: 7, student_id: 8 },
  { session_id: 7, student_id: 9 },
  { session_id: 8, student_id: 2 },
  { session_id: 8, student_id: 3 },
  { session_id: 8, student_id: 4 },
  { session_id: 8, student_id: 6 },
  { session_id: 8, student_id: 7 },
  { session_id: 8, student_id: 8 },
  { session_id: 8, student_id: 9 },
  { session_id: 8, student_id: 10 },
  { session_id: 9, student_id: 2 },
  { session_id: 9, student_id: 3 },
  { session_id: 9, student_id: 4 },
  { session_id: 9, student_id: 7 },
  { session_id: 9, student_id: 9 },
  { session_id: 9, student_id: 10 },
  { session_id: 10, student_id: 2 },
  { session_id: 10, student_id: 4 },
  { session_id: 10, student_id: 6 },
  { session_id: 10, student_id: 7 },
  { session_id: 10, student_id: 8 },
  { session_id: 10, student_id: 9 },
  { session_id: 10, student_id: 10 },
  { session_id: 11, student_id: 2 },
  { session_id: 11, student_id: 3 },
  { session_id: 11, student_id: 4 },
  { session_id: 11, student_id: 6 },
  { session_id: 11, student_id: 7 },
  { session_id: 11, student_id: 8 },
  { session_id: 11, student_id: 9 },
  { session_id: 11, student_id: 10 },
];

(async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  for (const user of users) {
    const hashedPass = await argon2.hash(user.password);
    const newUser = orm.em.create(User, { ...user, password: hashedPass });
    await orm.em.persistAndFlush(newUser);
  }

  for (const course of courses) {
    const newCourse = orm.em.create(Course, course);
    await orm.em.persistAndFlush(newCourse);
  }

  for (const assigment of coursesAssigment) {
    const newAssigment = orm.em.create(AssignedCourse, assigment);
    await orm.em.persistAndFlush(newAssigment);
  }

  for (const session of sessions) {
    const newSession = orm.em.create(Session, session);
    await orm.em.persistAndFlush(newSession);
  }

  for (const attendance of attendances) {
    const newAttendance = orm.em.create(AssignedSession, attendance);
    await orm.em.persistAndFlush(newAttendance);
  }

  orm.close();
})();
