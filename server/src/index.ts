import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { application } from './graphql/application';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

(async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();
  const httpServer = http.createServer(app);

  const schema = application.createSchemaForApollo();
  const apolloServer = new ApolloServer({
    schema,
    context: { orm },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  httpServer.listen(4000, () => {
    console.log('server running');
  });
})();
