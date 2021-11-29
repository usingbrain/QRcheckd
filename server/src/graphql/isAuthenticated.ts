import { Request } from 'express';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (_: any, {}, { req }: { req: Request }) =>
  req.session?.userId ? skip : [{ name: 'Not authenticated' }];
