import { createModule, gql, Module } from 'graphql-modules';
import { User } from '../entities/User';
import { InputUser } from '../types/InputUser';
import { DocumentNode } from 'graphql';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import argon2 from 'argon2';
import { Credentials } from '../types/Credentials';
import { Request } from 'express';

export const userModule: Module & { typeDefs: DocumentNode[] } = createModule({
  id: 'user-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        loginUser(credentials: Credentials): User
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

      input Credentials {
        email: String
        password: String
      }
    `,
  ],
  resolvers: {
    Query: {
      loginUser: async (
        _: any,
        { credentials }: { credentials: Credentials },
        {
          orm,
          req,
        }: {
          orm: MikroORM<IDatabaseDriver<Connection>>;
          req: Request & { userId: number };
        }
      ) => {
        try {
          const loggedUser = await orm.em.findOneOrFail(User, {
            email: credentials.email,
          });
          const valid = await argon2.verify(
            loggedUser.password,
            credentials.password
          );
          if (!valid) return null;
          req.session!.userId = loggedUser.id;
          return loggedUser;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    },
    Mutation: {
      registerUser: async (
        _: any,
        { user }: { user: InputUser },
        { orm }: { orm: MikroORM<IDatabaseDriver<Connection>> }
      ) => {
        const hashedPass = await argon2.hash(user.password);
        const newUser = orm.em.create(User, { ...user, password: hashedPass });
        await orm.em.persistAndFlush(newUser);
        return newUser;
      },
    },
  },
});
