import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { createModule, gql } from 'graphql-modules';
import { Course } from '../entities/Course';
import { AssignedCourse } from '../entities/AssignedCourse';
import { User } from '../entities/User';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './isAuthenticated';
import { Request } from 'express';
import { Session } from '../entities/Session';
import { AssignedSession } from '../entities/AssignedSession';
import { Server } from 'socket.io';

export const assignedCourseModule = createModule({
  id: 'assigned-course-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        getAssignedStudents(courseId: Int!): AssignedStudentsResponse!
        getIndividualAttendance(
          courseId: Int!
          studentId: Int!
        ): AttendanceResponse!
      }

      type Mutation {
        assignStudent(courseId: Int!): AssignStudentResponse!
      }

      type Student {
        name: String!
        lastname: String!
        email: String!
      }

      type Attendance {
        date: String!
        attended: Boolean!
      }

      type AssignedStudentsResponse {
        error: String
        data: [Student]
      }

      type AttendanceResponse {
        error: String
        data: [Attendance]
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
          const assigmentList = assigments.map(async (assigment) => {
            return await orm.em.findOne(User, assigment.student_id);
          });
          return { data: assigmentList };
        }
      ),
      getIndividualAttendance: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { courseId, studentId }: { courseId: number; studentId: number },
          { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
        ) => {
          const courseSessions = await orm.em.find(Session, {
            course: courseId,
          });
          const studentAttended = await orm.em.find(AssignedSession, {
            student_id: studentId,
          });
          const studentSessions = studentAttended.map(
            (attendance) => attendance.session_id
          );
          const attendance = courseSessions.map((session) => {
            const attended = studentSessions.includes(session.id);
            return { date: session.createdAt, attended };
          });
          return { data: attendance };
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
            io,
          }: {
            orm: MikroORM<IDatabaseDriver<Connection>>;
            req: Request;
            io: Server<any>;
          }
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
            if (check) return { error: 'Already assigned' };

            const newAssigment = orm.em.create(AssignedCourse, {
              course_id: courseId,
              student_id,
            });
            await orm.em.persistAndFlush(newAssigment);
            io.emit('ASSIGNMENT_CHANGE', '');
            return { data: true };
          } catch (error) {
            console.error(error);
            return { error: 'Not assigned' };
          }
        }
      ),
    },
  },
});
