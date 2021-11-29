import { createModule, gql, Module } from 'graphql-modules';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { Session } from '../entities/Session';
import { AssignedSession } from '../entities/AssignedSession';
import { User } from '../entities/User';
import { Server } from 'socket.io';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './isAuthenticated';

export const assignedSessionModule: Module = createModule({
  id: 'assigned-session-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Mutation {
        attend(studentId: Int!, sessionId: Int!): Boolean!
      }
    `,
  ],
  resolvers: {
    Mutation: {
      attend: combineResolvers(
        isAuthenticated,
        async (
          _: any,
          { studentId, sessionId }: { studentId: number; sessionId: number },
          {
            orm,
            io,
          }: {
            orm: MikroORM<IDatabaseDriver<Connection>>;
            io: Server<any>;
          }
        ) => {
          try {
            // check if session with sessionId exist
            await orm.em.findOneOrFail(Session, sessionId);
            // check if student with studentId exist
            await orm.em.findOneOrFail(User, studentId);
            // check if already assigned
            const check = await orm.em.findOne(AssignedSession, {
              student_id: studentId,
              session_id: sessionId,
            });
            if (check) return false;

            const newAttendance = orm.em.create(AssignedSession, {
              student_id: studentId,
              session_id: sessionId,
            });
            await orm.em.persistAndFlush(newAttendance);
            io.emit('attendance change', '');
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
