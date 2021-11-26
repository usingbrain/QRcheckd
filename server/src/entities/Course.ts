import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './User';

@Entity()
export class Course {
  @PrimaryKey()
  id!: string;

  @Property()
  createdAt: Date = new Date();

  @Property()
  name!: string;

  @ManyToOne(() => User)
  teacher_id!: number;
}
