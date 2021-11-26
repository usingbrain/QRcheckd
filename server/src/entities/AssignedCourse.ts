import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class AssignedCourse {
  @PrimaryKey()
  id!: number;

  @Property()
  course_id!: number;

  @Property()
  student_id!: number;
}
