import { createModule, gql, Module } from 'graphql-modules';
import { Connection, IDatabaseDriver, MikroORM, wrap } from '@mikro-orm/core';
import { Session } from '../entities/Session';
import { AssignedSession } from '../entities/AssignedSession';
import { User } from '../entities/User';
import { Server } from 'socket.io';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './isAuthenticated';
import { Request } from 'express';

export const assignedSessionModule: Module = createModule({
  id: 'assigned-session-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Mutation {
        attend(sessionId: Int!): AssignedSessionResponse!
        endSession(sessionId: Int!): AssignedSessionResponse!
      }

      type AssignedSessionResponse {
        error: String
        data: Boolean!
      }
    `,
  ],
  resolvers: {
    Mutation: {
      attend: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { sessionId }: { studentId: number; sessionId: number },
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
            // check if session with sessionId exist
            const session = await orm.em.findOneOrFail(Session, sessionId);
            // check if session is still open
            if (session.closed) return { error: 'session closed', data: false };
            // check if student with studentId exist
            await orm.em.findOneOrFail(User, student_id);
            // check if already assigned
            const check = await orm.em.findOne(AssignedSession, {
              student_id,
              session_id: sessionId,
            });
            if (check) return { error: 'Already assigned!', data: false };

            const newAttendance = orm.em.create(AssignedSession, {
              student_id,
              session_id: sessionId,
            });
            await orm.em.persistAndFlush(newAttendance);
            io.emit('attendance change', '');
            return { data: true };
          } catch (error) {
            console.error(error);
            return { error: 'Not checked in!', data: false };
          }
        }
      ),
      endSession: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { sessionId }: { sessionId: number },
          { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
        ) => {
          try {
            const session = await orm.em.findOneOrFail(Session, sessionId);
            wrap(session).assign({ closed: true }, { mergeObjects: true });
            await orm.em.flush();
            return { data: true };
          } catch (error) {
            console.error(error);
            return { error: 'Session not ended!', data: false };
          }
        }
      ),
    },
  },
});
