import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Course } from './Course';

@Entity()
export class Session {
  @PrimaryKey()
  id!: string;

  @Property()
  createdAt: Date = new Date();

  @ManyToOne(() => Course)
  course_id!: number;
}
