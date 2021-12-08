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
const Session_1 = require("../entities/Session");
const AssignedSession_1 = require("../entities/AssignedSession");
const AssignedCourse_1 = require("../entities/AssignedCourse");
const users = [
    {
        name: 'Bob',
        lastname: 'Elsher',
        email: 'bob@bob.com',
        password: 'Boooob@1',
        role: 'TEACHER',
    },
    {
        name: 'Ben',
        lastname: 'Levine',
        email: 'ben@bob.com',
        password: 'Beeeen@1',
        role: 'STUDENT',
    },
    {
        name: 'Anna',
        lastname: 'West',
        email: 'anna@bob.com',
        password: 'Annnna@1',
        role: 'STUDENT',
    },
    {
        name: 'Andy',
        lastname: 'Ellis',
        email: 'andy@bob.com',
        password: 'Annnndy@1',
        role: 'STUDENT',
    },
    {
        name: 'Brat',
        lastname: 'Hope',
        email: 'lol@bob.com',
        password: 'Looool@1',
        role: 'TEACHER',
    },
    {
        name: 'Guy',
        lastname: 'Gonzales',
        email: 'guy@bob.com',
        password: 'Guuuuy@1',
        role: 'STUDENT',
    },
    {
        name: 'Yone',
        lastname: 'Keller',
        email: 'yone@bob.com',
        password: 'Yoooone@1',
        role: 'STUDENT',
    },
    {
        name: 'Bartosz',
        lastname: 'Szatkowski',
        email: 'bartosz@bob.com',
        password: 'Bartosz@1',
        role: 'STUDENT',
    },
    {
        name: 'Maria',
        lastname: 'Sudermann',
        email: 'maria@bob.com',
        password: 'Maaaaria@1',
        role: 'STUDENT',
    },
    {
        name: 'Alexi',
        lastname: 'Bettinger',
        email: 'alexi@bob.com',
        password: 'Aleeeexi@1',
        role: 'STUDENT',
    },
];
const courses = [
    { name: 'Math 101', teacher: 1 },
    { name: 'CS50', teacher: 1 },
    { name: 'Codeworks', teacher: 1 },
    { name: 'TypeScript', teacher: 1 },
    { name: 'HireMe!', teacher: 1 },
    { name: 'Advanced Polish', teacher: 5 },
    { name: 'Literature', teacher: 5 },
];
const coursesAssigment = [
    { course_id: 1, student_id: 2 },
    { course_id: 1, student_id: 3 },
    { course_id: 1, student_id: 4 },
    { course_id: 1, student_id: 6 },
    { course_id: 1, student_id: 7 },
    { course_id: 2, student_id: 2 },
    { course_id: 2, student_id: 3 },
    { course_id: 2, student_id: 4 },
    { course_id: 2, student_id: 6 },
    { course_id: 3, student_id: 2 },
    { course_id: 3, student_id: 3 },
    { course_id: 3, student_id: 4 },
    { course_id: 3, student_id: 6 },
    { course_id: 3, student_id: 7 },
    { course_id: 3, student_id: 8 },
    { course_id: 3, student_id: 9 },
    { course_id: 3, student_id: 10 },
    { course_id: 4, student_id: 8 },
    { course_id: 4, student_id: 9 },
    { course_id: 4, student_id: 10 },
    { course_id: 5, student_id: 8 },
    { course_id: 5, student_id: 9 },
    { course_id: 5, student_id: 10 },
];
const sessions = [
    { course: 3, createdAt: 1636810916387 },
    { course: 3, createdAt: 1636983716387 },
    { course: 3, createdAt: 1637156516387 },
    { course: 3, createdAt: 1637329316387 },
    { course: 3, createdAt: 1637502116387 },
    { course: 3, createdAt: 1637674916387 },
    { course: 3, createdAt: 1637847716387 },
    { course: 3, createdAt: 1638020516387 },
    { course: 3, createdAt: 1638193316387 },
    { course: 3, createdAt: 1638366116387 },
    { course: 3, createdAt: 1638538916387 },
    { course: 3, createdAt: 1638711716387 },
];
const attendances = [
    { session_id: 1, student_id: 3 },
    { session_id: 1, student_id: 4 },
    { session_id: 1, student_id: 6 },
    { session_id: 1, student_id: 7 },
    { session_id: 1, student_id: 8 },
    { session_id: 1, student_id: 9 },
    { session_id: 1, student_id: 10 },
    { session_id: 2, student_id: 2 },
    { session_id: 2, student_id: 6 },
    { session_id: 2, student_id: 7 },
    { session_id: 2, student_id: 8 },
    { session_id: 2, student_id: 9 },
    { session_id: 2, student_id: 10 },
    { session_id: 3, student_id: 2 },
    { session_id: 3, student_id: 3 },
    { session_id: 3, student_id: 4 },
    { session_id: 3, student_id: 6 },
    { session_id: 3, student_id: 7 },
    { session_id: 3, student_id: 8 },
    { session_id: 3, student_id: 9 },
    { session_id: 3, student_id: 10 },
    { session_id: 4, student_id: 2 },
    { session_id: 4, student_id: 3 },
    { session_id: 4, student_id: 4 },
    { session_id: 4, student_id: 7 },
    { session_id: 4, student_id: 9 },
    { session_id: 4, student_id: 10 },
    { session_id: 5, student_id: 2 },
    { session_id: 5, student_id: 3 },
    { session_id: 5, student_id: 4 },
    { session_id: 5, student_id: 6 },
    { session_id: 5, student_id: 7 },
    { session_id: 5, student_id: 8 },
    { session_id: 5, student_id: 9 },
    { session_id: 5, student_id: 10 },
    { session_id: 6, student_id: 2 },
    { session_id: 6, student_id: 3 },
    { session_id: 6, student_id: 4 },
    { session_id: 6, student_id: 6 },
    { session_id: 6, student_id: 7 },
    { session_id: 6, student_id: 8 },
    { session_id: 6, student_id: 9 },
    { session_id: 6, student_id: 10 },
    { session_id: 7, student_id: 2 },
    { session_id: 7, student_id: 3 },
    { session_id: 7, student_id: 7 },
    { session_id: 7, student_id: 8 },
    { session_id: 7, student_id: 9 },
    { session_id: 8, student_id: 2 },
    { session_id: 8, student_id: 3 },
    { session_id: 8, student_id: 4 },
    { session_id: 8, student_id: 6 },
    { session_id: 8, student_id: 7 },
    { session_id: 8, student_id: 8 },
    { session_id: 8, student_id: 9 },
    { session_id: 8, student_id: 10 },
    { session_id: 9, student_id: 2 },
    { session_id: 9, student_id: 3 },
    { session_id: 9, student_id: 4 },
    { session_id: 9, student_id: 7 },
    { session_id: 9, student_id: 9 },
    { session_id: 9, student_id: 10 },
    { session_id: 10, student_id: 2 },
    { session_id: 10, student_id: 4 },
    { session_id: 10, student_id: 6 },
    { session_id: 10, student_id: 7 },
    { session_id: 10, student_id: 8 },
    { session_id: 10, student_id: 9 },
    { session_id: 10, student_id: 10 },
    { session_id: 11, student_id: 2 },
    { session_id: 11, student_id: 3 },
    { session_id: 11, student_id: 4 },
    { session_id: 11, student_id: 6 },
    { session_id: 11, student_id: 7 },
    { session_id: 11, student_id: 8 },
    { session_id: 11, student_id: 9 },
    { session_id: 11, student_id: 10 },
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
        const newAssigment = orm.em.create(AssignedCourse_1.AssignedCourse, assigment);
        yield orm.em.persistAndFlush(newAssigment);
    }
    for (const session of sessions) {
        const newSession = orm.em.create(Session_1.Session, session);
        yield orm.em.persistAndFlush(newSession);
    }
    for (const attendance of attendances) {
        const newAttendance = orm.em.create(AssignedSession_1.AssignedSession, attendance);
        yield orm.em.persistAndFlush(newAttendance);
    }
    orm.close();
}))();
//# sourceMappingURL=populateDB.js.map