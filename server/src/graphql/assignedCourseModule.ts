import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { createModule, gql } from 'graphql-modules';
import { Course } from '../entities/Course';
import { AssignedCourse } from '../entities/AssignedCourse';
import { User } from '../entities/User';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './isAuthenticated';

export const assignedCourseModule = createModule({
  id: 'assigned-course-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        getAssignedStudents(courseId: Int!): [Student]
      }

      type Mutation {
        assignStudent(studentId: Int!, courseId: Int!): Boolean!
      }

      type Student {
        name: String
        lastname: String
        email: String
      }
    `,
  ],
  resolvers: {
    Query: {
      getAssignedStudents: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { courseId }: { courseId: number },
          { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
        ) => {
          const assigments = await orm.em.find(AssignedCourse, {
            course_id: courseId,
          });
          return assigments.map(async (assigment) => {
            return await orm.em.findOne(User, assigment.student_id);
          });
        }
      ),
    },

    Mutation: {
      assignStudent: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { courseId, studentId }: { courseId: number; studentId: number },
          { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
        ) => {
          try {
            // check if course with courseId exist
            await orm.em.findOneOrFail(Course, courseId);
            // check if student with studentId exist
            await orm.em.findOneOrFail(User, studentId);
            // check if user already assigned to a course
            const check = await orm.em.findOne(AssignedCourse, {
              course_id: courseId,
              student_id: studentId,
            });
            if (check) return false;

            const newAssigment = orm.em.create(AssignedCourse, {
              course_id: courseId,
              student_id: studentId,
            });
            orm.em.persistAndFlush(newAssigment);
            return true;
          } catch (error) {
            console.error(error);
            return false;
          }
        }
      ),
    },
  },
});
