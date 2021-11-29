import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { createModule, gql } from 'graphql-modules';
import { Course } from '../entities/Course';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './isAuthenticated';
import { Request } from 'express';

export const courseModule = createModule({
  id: 'course-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        getCourses: [Course]
      }

      type Mutation {
        createCourse(name: String): Course
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
      getCourses: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          {},
          {
            orm,
            req,
          }: { orm: MikroORM<IDatabaseDriver<Connection>>; req: Request }
        ) => {
          const courses = await orm.em.find(Course, {
            teacher: req.session!.userId,
          });
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
          { name }: { name: string },
          {
            orm,
            req,
          }: { orm: MikroORM<IDatabaseDriver<Connection>>; req: Request }
        ) => {
          const newCourse = orm.em.create(Course, {
            name,
            teacher: req.session!.userId,
          });
          await orm.em.persistAndFlush(newCourse);
          return { ...newCourse, teacher: newCourse.teacher.id };
        }
      ),
    },
  },
});
