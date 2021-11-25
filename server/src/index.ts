import { MikroORM } from '@mikro-orm/core';
import { User } from './entities/User';
import mikroOrmConfig from './mikro-orm.config';

(async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const user = orm.em.create(User, {
    name: 'Bob',
    lastname: 'Banana',
    email: 'bob2@bob.com',
    password: 'Bob',
    role: 'TEACHER',
  });
  orm.em.persistAndFlush(user);
  //orm.em.create(Course, { name: 'CS50', teacherId: '1' });
})();
