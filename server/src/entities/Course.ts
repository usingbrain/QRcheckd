import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './User';

@Entity()
export class Course {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt: Date = new Date();

  @Property()
  name!: string;

  @ManyToOne()
  teacher!: User;
}
