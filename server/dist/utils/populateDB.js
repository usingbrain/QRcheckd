"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("../mikro-orm.config"));
const argon2_1 = __importDefault(require("argon2"));
const User_1 = require("../entities/User");
const Course_1 = require("../entities/Course");
const AssignedCourse_1 = require("../entities/AssignedCourse");
const users = [
    {
        name: 'Bob',
        lastname: 'Bob',
        email: 'bob@bob.com',
        password: 'Boooob@1',
        role: 'TEACHER',
    },
    {
        name: 'Ben',
        lastname: 'Ben',
        email: 'ben@bob.com',
        password: 'Beeeen@1',
        role: 'STUDENT',
    },
    {
        name: 'Anna',
        lastname: 'Anna',
        email: 'anna@bob.com',
        password: 'Annnna@1',
        role: 'STUDENT',
    },
    {
        name: 'Andy',
        lastname: 'Andy',
        email: 'andy@bob.com',
        password: 'Annnndy@1',
        role: 'STUDENT',
    },
    {
        name: 'Lol',
        lastname: 'Lol',
        email: 'lol@bob.com',
        password: 'Looool@1',
        role: 'TEACHER',
    },
    {
        name: 'Guy',
        lastname: 'Guy',
        email: 'guy@bob.com',
        password: 'Guuuuy@1',
        role: 'STUDENT',
    },
    {
        name: 'Yone',
        lastname: 'Yone',
        email: 'yone@bob.com',
        password: 'Yoooone@1',
        role: 'STUDENT',
    },
];
const courses = [
    { name: 'Math 101', teacher: 1 },
    { name: 'CS 50', teacher: 1 },
    { name: 'Codeworks', teacher: 1 },
];
const coursesAssigment = [
    { course_id: 1, student_id: 2 },
    { course_id: 1, student_id: 3 },
    { course_id: 1, student_id: 4 },
    { course_id: 1, student_id: 6 },
    { course_id: 1, student_id: 7 },
    { course_id: 2, student_id: 2 },
    { course_id: 2, student_id: 3 },
    { course_id: 3, student_id: 2 },
];
(() => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    yield orm.getMigrator().up();
    for (const user of users) {
        const hashedPass = yield argon2_1.default.hash(user.password);
        const newUser = orm.em.create(User_1.User, Object.assign(Object.assign({}, user), { password: hashedPass }));
        yield orm.em.persistAndFlush(newUser);
    }
    for (const course of courses) {
        const newCourse = orm.em.create(Course_1.Course, course);
        yield orm.em.persistAndFlush(newCourse);
    }
    for (const assigment of coursesAssigment) {
        console.log('ANOTHER PASS, assigment', assigment);
        const newAssigment = orm.em.create(AssignedCourse_1.AssignedCourse, assigment);
        yield orm.em.persistAndFlush(newAssigment);
        console.log(newAssigment);
    }
    orm.close();
}))();
//# sourceMappingURL=populateDB.js.map