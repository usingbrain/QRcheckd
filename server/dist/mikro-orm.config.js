"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = require("./entities/Course");
const User_1 = require("./entities/User");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const Session_1 = require("./entities/Session");
const AssignedCourse_1 = require("./entities/AssignedCourse");
const AssignedSession_1 = require("./entities/AssignedSession");
dotenv_1.default.config();
console.log(process.env.DB_NAME);
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
        emit: 'js',
    },
    entities: [User_1.User, Course_1.Course, Session_1.Session, AssignedCourse_1.AssignedCourse, AssignedSession_1.AssignedSession],
    type: 'postgresql',
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    debug: process.env.NODE_ENV === 'poduction' ? true : false,
};
//# sourceMappingURL=mikro-orm.config.js.map