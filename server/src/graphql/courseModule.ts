import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { createModule, gql } from 'graphql-modules';
import { Course } from '../entities/Course';

export const courseModule = createModule({
  id: 'course-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Mutation {
        createCourse(course: InputCourse): Course
      }

      type Course {
        id: Int
        name: String
        teacher: Int
      }

      input InputCourse {
        name: String
        teacher: Int
      }
    `,
  ],
  resolvers: {
    Mutation: {
      createCourse: async (
        _: any,
        { course }: { course: Course },
        { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
      ) => {
        const newCourse = orm.em.create(Course, course);
        await orm.em.persistAndFlush(newCourse);
        return { ...newCourse, teacher: newCourse.teacher.id };
      },
    },
  },
});
