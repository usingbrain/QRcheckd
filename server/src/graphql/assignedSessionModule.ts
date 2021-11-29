import { createModule, gql, Module } from 'graphql-modules';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { Session } from '../entities/Session';
import { AssignedSession } from '../entities/AssignedSession';
import { User } from '../entities/User';

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
      attend: async (
        _: any,
        { studentId, sessionId }: { studentId: number; sessionId: number },
        { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
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
          console.log(check);
          if (check) return false;

          const newAttendance = orm.em.create(AssignedSession, {
            student_id: studentId,
            session_id: sessionId,
          });
          await orm.em.persistAndFlush(newAttendance);
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },
    },
  },
});
