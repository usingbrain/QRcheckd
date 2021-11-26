import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { createModule, gql } from 'graphql-modules';
import { Course } from '../entities/Course';

export const assignedCourseModule = createModule({
  id: 'assigned-course-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        getCourses(teacherId: Int): [Course]
      }

      type Course {
        id: Int
        name: String
        teacher: Int
      }
    `,
  ],
  resolvers: {
    Query: {
      getCourses: async (
        _: any,
        { teacherId }: { teacherId: number },
        { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
      ) => {
        const courses = await orm.em.find(Course, { teacher: teacherId });
        return courses.map((course) => ({
          ...course,
          teacher: course.teacher.id,
        }));
      },
    },
  },
});
