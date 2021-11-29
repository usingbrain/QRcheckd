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
          getSessionAttendance(sessionId: Int!): [Student]
        }

        type Mutation {
          createSession(courseId: Int!): Session
        }

        type Session {
          id: Int
          createdAt: String
          course: Int
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
            return attendances.map(async (attendance) => {
              return await orm.em.findOne(User, attendance.student_id);
            });
          }
        ),
      },
      Mutation: {
        createSession: async (
          _: any,
          { courseId }: { courseId: number },
          { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
        ) => {
          try {
            await orm.em.findOneOrFail(Course, courseId);
            const newSession = orm.em.create(Session, { course: courseId });
            await orm.em.persistAndFlush(newSession);
            return { ...newSession, course: newSession.course.id };
          } catch (error) {
            console.error(error);
            return null;
          }
        },
      },
    },
  });
