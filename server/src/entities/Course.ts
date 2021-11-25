import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './User';

@Entity()
export class Course {
  @PrimaryKey()
  id!: string;

  @Property()
  createdAt: Date = new Date();

  @Property()
  name!: string;

  @OneToMany(() => User, (user) => user.id)
  teacher_id!: string;
}
