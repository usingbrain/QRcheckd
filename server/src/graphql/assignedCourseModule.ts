import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { createModule, gql } from 'graphql-modules';
import { Course } from '../entities/Course';
import { AssignedCourse } from '../entities/AssignedCourse';
import { User } from '../entities/User';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './isAuthenticated';
import { Request } from 'express';

export const assignedCourseModule = createModule({
  id: 'assigned-course-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        getAssignedStudents(courseId: Int!): AssignedStudentsResponse!
      }

      type Mutation {
        assignStudent(courseId: Int!): AssignSTudentResponse!
      }

      type Student {
        name: String
        lastname: String
        email: String
      }

      type AssignedStudentsResponse {
        error: String
        data: [Student]
      }

      type AssignStudentResponse {
        error: String
        data: Boolean
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
          { courseId }: { courseId: number },
          {
            orm,
            req,
          }: { orm: MikroORM<IDatabaseDriver<Connection>>; req: Request }
        ) => {
          try {
            const student_id = req.session!.userId;
            // check if course with courseId exist
            await orm.em.findOneOrFail(Course, courseId);
            // check if student with studentId exist
            await orm.em.findOneOrFail(User, student_id);
            // check if user already assigned to a course
            const check = await orm.em.findOne(AssignedCourse, {
              course_id: courseId,
              student_id,
            });
            if (check) return false;

            const newAssigment = orm.em.create(AssignedCourse, {
              course_id: courseId,
              student_id,
            });
            await orm.em.persistAndFlush(newAssigment);
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
