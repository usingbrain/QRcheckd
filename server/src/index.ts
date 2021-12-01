import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { application } from './graphql/application';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import session, { MemoryStore } from 'express-session';
import http from 'http';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { Server } from 'socket.io';

(async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();
  const store = new MemoryStore();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(
    session({
      store,
      name: 'qrcid',
      cookie: {
        path: '/',
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 5, // 5 hours
        // sameSite: 'lax',
        // secure: false,
      },
      secret: 'dhslkfajsldkfjasld',
      resave: false,
      saveUninitialized: false,
    })
  );
  const httpServer = http.createServer(app);
  const io = new Server(httpServer);

  const schema = application.createSchemaForApollo();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: { req: Request; res: Response }) => {
      return {
        orm,
        req,
        res,
        io,
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  httpServer.listen(4000, () => {
    console.log('server running');
  });
})();
