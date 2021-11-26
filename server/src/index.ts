import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { application } from './graphql/application';
import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import session from 'express-session';

(async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();
  const httpServer = http.createServer(app);

  app.use(
    session({
      name: 'qrcid',
      cookie: {
        maxAge: 1000 * 60 * 20, // 20 minutes
        sameSite: 'lax',
        secure: process.env.NODE_ENV !== 'development',
      },
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: true,
    })
  );

  const schema = application.createSchemaForApollo();
  const apolloServer = new ApolloServer({
    schema,
    context: (req: Request & { userId: number }, res: Response) => ({
      orm,
      req,
      res,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  httpServer.listen(4000, () => {
    console.log('server running');
  });
})();
