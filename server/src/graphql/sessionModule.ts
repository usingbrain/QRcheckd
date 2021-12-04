import { createModule, gql, Module } from 'graphql-modules';
import { DocumentNode } from 'graphql';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { Session } from '../entities/Session';
import { Course } from '../entities/Course';
import { AssignedSession } from '../entities/AssignedSession';
import { User } from '../entities/User';
import { isAuthenticated } from './isAuthenticated';
import { combineResolvers } from 'graphql-resolvers';

export const sessionModule: Module & { typeDefs: DocumentNode[] } =
  createModule({
    id: 'session-module',
    dirname: __dirname,
    typeDefs: [
      gql`
        type Query {
          getSessionAttendance(sessionId: Int!): SessionAttendanceResponse!
        }

        type Mutation {
          createSession(courseId: Int!): SessionResponse!
        }

        type Session {
          id: Int!
          createdAt: String!
          course: Int!
          attendance: Int!
        }

        type SessionResponse {
          error: String
          data: Session
        }

        type SessionAttendanceResponse {
          error: String
          data: [Student]
        }
      `,
    ],

    resolvers: {
      Query: {
        getSessionAttendance: combineResolvers(
          isAuthenticated,
          async (
            _: any,
            { sessionId }: { sessionId: number },
            { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
          ) => {
            const attendances = await orm.em.find(AssignedSession, {
              session_id: sessionId,
            });
            const studentList = attendances.map(async (attendance) => {
              return await orm.em.findOne(User, attendance.student_id);
            });
            return { data: studentList };
          }
        ),
      },

      Mutation: {
        createSession: combineResolvers(
          isAuthenticated,
          async (
            _: any,
            { courseId }: { courseId: number },
            { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
          ) => {
            try {
              await orm.em.findOneOrFail(Course, courseId);
              const newSession = orm.em.create(Session, { course: courseId });
              await orm.em.persistAndFlush(newSession);
              return { data: { ...newSession, course: newSession.course.id } };
            } catch (error) {
              console.error(error);
              return { error: 'Oops soemthing went wrong' };
            }
          }
        ),
      },

      Session: {
        attendance: async (
          parentSession: Session,
          _: any,
          { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
        ) => {
          const rows = await orm.em.find(AssignedSession, {
            session_id: parentSession.id,
          });
          return rows.length;
        },
      },
    },
  });
