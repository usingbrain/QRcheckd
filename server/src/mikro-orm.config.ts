import { Course } from './entities/Course';
import { User } from './entities/User';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
    emit: 'js',
  },
  entities: [User, Course],
  type: 'postgresql',
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  debug: process.env.NODE_ENV === 'poduction' ? true : false,
} as Parameters<typeof MikroORM.init>[0];
