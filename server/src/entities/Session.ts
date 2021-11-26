import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Course } from './Course';

@Entity()
export class Session {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt: Date = new Date();

  @ManyToOne()
  course!: Course;
}
