import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class AssignedSession {
  @PrimaryKey()
  id!: number;

  @Property()
  session_id!: number;

  @Property()
  student_id!: number;
}
