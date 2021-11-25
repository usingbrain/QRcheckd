import { MikroORM } from '@mikro-orm/core';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  const orm = await MikroORM.init({
    entities: [],
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    debug: process.env.NODE_ENV === 'poduction' ? true : false,
  });
})();
