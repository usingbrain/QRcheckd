import { createModule, gql, Module } from 'graphql-modules';
import { User } from '../entities/User';
import { InputUser } from '../types/InputUser';
import { DocumentNode } from 'graphql';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import argon2 from 'argon2';
import { Credentials } from '../types/Credentials';
import { Request } from 'express';
import { MemoryStore } from 'express-session';

export const userModule: Module & { typeDefs: DocumentNode[] } = createModule({
  id: 'user-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        loginUser(credentials: Credentials): User
        me: User
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
      me: async (
        _: any,
        {},
        {
          orm,
          req,
        }: {
          orm: MikroORM<IDatabaseDriver<Connection>>;
          req: Request & { userId: number };
        }
      ) => {
        if (!req.session?.userId) return null;
        const user = orm.em.findOne(User, { id: req.session.userId });
        return user;
      },
      loginUser: async (
        _: any,
        { credentials }: { credentials: Credentials },
        {
          orm,
          req,
          store,
        }: {
          orm: MikroORM<IDatabaseDriver<Connection>>;
          req: Request & { userId: number };
          res: Response;
          store: any;
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

          console.log(store);
          req.session!.userId = loggedUser.id;
          console.log('SESS ID', req.session!.id);

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
        {
          orm,
          req,
        }: {
          orm: MikroORM<IDatabaseDriver<Connection>>;
          req: Request & { userId: number };
        }
      ) => {
        const hashedPass = await argon2.hash(user.password);
        const newUser = orm.em.create(User, { ...user, password: hashedPass });
        await orm.em.persistAndFlush(newUser);
        req.session!.userId = newUser.id;
        return newUser;
      },
    },
  },
});
