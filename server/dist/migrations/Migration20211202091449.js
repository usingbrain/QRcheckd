'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Migration = require('@mikro-orm/migrations').Migration;

class Migration20211202091449 extends Migration {

  async up() {
    this.addSql('create table "assigned_session" ("id" serial primary key, "session_id" int4 not null, "student_id" int4 not null);');

    this.addSql('create table "assigned_course" ("id" serial primary key, "course_id" int4 not null, "student_id" int4 not null);');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "name" varchar(255) not null, "lastname" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" varchar(255) not null);');

    this.addSql('create table "course" ("id" serial primary key, "created_at" timestamptz(0) not null, "name" varchar(255) not null, "teacher_id" int4 not null);');

    this.addSql('create table "session" ("id" serial primary key, "created_at" timestamptz(0) not null, "closed" bool not null, "course_id" int4 not null);');

    this.addSql('alter table "course" add constraint "course_teacher_id_foreign" foreign key ("teacher_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "session" add constraint "session_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade;');

    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
exports.Migration20211202091449 = Migration20211202091449;
