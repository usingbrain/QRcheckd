import { createModule, gql, Module } from 'graphql-modules';
import { User } from '../entities/User';
import { InputUser } from '../types/InputUser';
import { DocumentNode } from 'graphql';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';

export const userModule: Module & { typeDefs: DocumentNode[] } = createModule({
  id: 'user-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        hello: String
      }

      type Mutation {
        registerUser(user: InputUser): User
      }

      type User {
        id: Int
        name: String
        lastname: String
        email: String
        role: String
      }

      input InputUser {
        name: String
        lastname: String
        email: String
        password: String
        role: String
      }
    `,
  ],
  resolvers: {
    Query: {
      hello: () => 'banana',
    },
    Mutation: {
      registerUser: async (
        _: any,
        { user }: { user: InputUser },
        { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
      ) => {
        const newUser = orm.em.create(User, user);
        await orm.em.persistAndFlush(newUser);
        return newUser;
      },
    },
  },
});