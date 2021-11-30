import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from '../mikro-orm.config';
import argon2 from 'argon2';
import { User } from '../entities/User';
import { Course } from '../entities/Course';
import { AssignedCourse } from '../entities/AssignedCourse';

const users = [
  {
    name: 'Bob',
    lastname: 'Bob',
    email: 'bob@bob.com',
    password: 'Boooob@1',
    role: 'TEACHER',
  },
  {
    name: 'Ben',
    lastname: 'Ben',
    email: 'ben@bob.com',
    password: 'Beeeen@1',
    role: 'STUDENT',
  },
  {
    name: 'Anna',
    lastname: 'Anna',
    email: 'anna@bob.com',
    password: 'Annnna@1',
    role: 'STUDENT',
  },
  {
    name: 'Andy',
    lastname: 'Andy',
    email: 'andy@bob.com',
    password: 'Annnndy@1',
    role: 'STUDENT',
  },
  {
    name: 'Lol',
    lastname: 'Lol',
    email: 'lol@bob.com',
    password: 'Looool@1',
    role: 'TEACHER',
  },
  {
    name: 'Guy',
    lastname: 'Guy',
    email: 'guy@bob.com',
    password: 'Guuuuy@1',
    role: 'STUDENT',
  },
  {
    name: 'Yone',
    lastname: 'Yone',
    email: 'yone@bob.com',
    password: 'Yoooone@1',
    role: 'STUDENT',
  },
];

const courses = [
  { name: 'Math 101', teacher: 1 },
  { name: 'CS 50', teacher: 1 },
  { name: 'Codeworks', teacher: 1 },
];

const coursesAssigment = [
  { course_id: 1, student_id: 2 },
  { course_id: 1, student_id: 3 },
  { course_id: 1, student_id: 4 },
  { course_id: 1, student_id: 6 },
  { course_id: 1, student_id: 7 },
  { course_id: 2, student_id: 2 },
  { course_id: 2, student_id: 3 },
  { course_id: 3, student_id: 2 },
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
    console.log('ANOTHER PASS, assigment', assigment);
    const newAssigment = orm.em.create(AssignedCourse, assigment);
    await orm.em.persistAndFlush(newAssigment);
    console.log(newAssigment);
  }

  orm.close();
})();
