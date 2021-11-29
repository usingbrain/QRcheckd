import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { createModule, gql } from 'graphql-modules';
import { Course } from '../entities/Course';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './isAuthenticated';

export const courseModule = createModule({
  id: 'course-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        getCourses(teacherId: Int): [Course]
      }

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
    Query: {
      getCourses: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { teacherId }: { teacherId: number },
          { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
        ) => {
          const courses = await orm.em.find(Course, { teacher: teacherId });
          return courses.map((course) => ({
            ...course,
            teacher: course.teacher.id,
          }));
        }
      ),
    },

    Mutation: {
      createCourse: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { course }: { course: Course },
          { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
        ) => {
          const newCourse = orm.em.create(Course, course);
          await orm.em.persistAndFlush(newCourse);
          return { ...newCourse, teacher: newCourse.teacher.id };
        }
      ),
    },
  },
});
