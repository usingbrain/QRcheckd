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
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignedCourseModule = void 0;
const graphql_modules_1 = require("graphql-modules");
const Course_1 = require("../entities/Course");
const AssignedCourse_1 = require("../entities/AssignedCourse");
const User_1 = require("../entities/User");
exports.assignedCourseModule = (0, graphql_modules_1.createModule)({
    id: 'assigned-course-module',
    dirname: __dirname,
    typeDefs: [
        (0, graphql_modules_1.gql) `
      type Query {
        getAssignedStudents(courseId: Int!): [Student]
      }

      type Mutation {
        assignStudent(studentId: Int!, courseId: Int!): Boolean!
      }

      type Student {
        name: String
        lastname: String
        email: String
      }
    `,
    ],
    resolvers: {
        Query: {
            getAssignedStudents: (_, { courseId }, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                const assigments = yield orm.em.find(AssignedCourse_1.AssignedCourse, {
                    course_id: courseId,
                });
                return assigments.map((assigment) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield orm.em.findOne(User_1.User, assigment.student_id);
                }));
            }),
        },
        Mutation: {
            assignStudent: (_, { courseId, studentId }, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield orm.em.findOneOrFail(Course_1.Course, courseId);
                    yield orm.em.findOneOrFail(User_1.User, studentId);
                    const newAssigment = orm.em.create(AssignedCourse_1.AssignedCourse, {
                        course_id: courseId,
                        student_id: studentId,
                    });
                    orm.em.persistAndFlush(newAssigment);
                    return true;
                }
                catch (error) {
                    console.error(error);
                    return false;
                }
            }),
        },
    },
});
//# sourceMappingURL=assignedCourseModule.js.map