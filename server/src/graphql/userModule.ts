import { createModule, gql, Module } from 'graphql-modules';
import { User } from '../entities/User';
import { InputUser } from '../types/InputUser';
import { DocumentNode } from 'graphql';
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import argon2 from 'argon2';
import { Credentials } from '../types/Credentials';
import { Request } from 'express';
import { isValidRegisterInfo } from '../utils/helpers';

export const userModule: Module & { typeDefs: DocumentNode[] } = createModule({
  id: 'user-module',
  dirname: __dirname,
  typeDefs: [
    gql`
      type Query {
        loginUser(credentials: Credentials): Response
        me: User
      }

      type Mutation {
        registerUser(user: InputUser): Response
      }

      type Response {
        error: String
        data: User
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
        }: {
          orm: MikroORM<IDatabaseDriver<Connection>>;
          req: Request & { userId: number };
          res: Response;
        }
      ) => {
        try {
          const loggedUser = await orm.em.findOneOrFail(User, {
            email: credentials.email,
          });
          if (!loggedUser) return { error: 'Invalid login and/or password' };

          const valid = await argon2.verify(
            loggedUser.password,
            credentials.password
          );
          if (!valid) return { error: 'Invalid login and/or password.' };

          req.session!.userId = loggedUser.id;

          return { data: loggedUser };
        } catch (error) {
          console.error(error);
          return { error: 'Oops something went wrong!' };
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
        const registerFieldsValidation = isValidRegisterInfo(user);
        if (registerFieldsValidation.valid)
          return { error: registerFieldsValidation.error };

        const hashedPass = await argon2.hash(user.password);
        const newUser = orm.em.create(User, { ...user, password: hashedPass });
        await orm.em.persistAndFlush(newUser);
        req.session!.userId = newUser.id;
        return { data: newUser };
      },
    },
  },
});
