import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
@Unique({ properties: ['email'] })
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  created_at: Date = new Date();

  @Property()
  name!: string;

  @Property()
  lastname!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  role!: 'TEACHER' | 'STUDENT';
}
