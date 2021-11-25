'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Migration = require('@mikro-orm/migrations').Migration;

class Migration20211125195345 extends Migration {

  async up() {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "name" varchar(255) not null, "lastname" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" varchar(255) not null);');

    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

}
exports.Migration20211125195345 = Migration20211125195345;
