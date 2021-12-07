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
const graphql_resolvers_1 = require("graphql-resolvers");
const isAuthenticated_1 = require("./isAuthenticated");
const Session_1 = require("../entities/Session");
const AssignedSession_1 = require("../entities/AssignedSession");
exports.assignedCourseModule = (0, graphql_modules_1.createModule)({
    id: 'assigned-course-module',
    dirname: __dirname,
    typeDefs: [
        (0, graphql_modules_1.gql) `
      type Query {
        getAssignedStudents(courseId: Int!): AssignedStudentsResponse!
        getIndividualAttendance(
          courseId: Int!
          studentId: Int!
        ): AttendanceResponse!
      }

      type Mutation {
        assignStudent(courseId: Int!): AssignStudentResponse!
      }

      type Student {
        id: Int!
        name: String!
        lastname: String!
        email: String!
      }

      type Attendance {
        date: String!
        attended: Boolean!
      }

      type AssignedStudentsResponse {
        error: String
        data: [Student]
      }

      type AttendanceResponse {
        error: String
        data: [Attendance]
      }

      type AssignStudentResponse {
        error: String
        data: Boolean
      }
    `,
    ],
    resolvers: {
        Query: {
            getAssignedStudents: (0, graphql_resolvers_1.combineResolvers)(isAuthenticated_1.isAuthenticated, (_, { courseId }, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                const assigments = yield orm.em.find(AssignedCourse_1.AssignedCourse, {
                    course_id: courseId,
                });
                const assigmentList = assigments.map((assigment) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield orm.em.findOne(User_1.User, assigment.student_id);
                }));
                return { data: assigmentList };
            })),
            getIndividualAttendance: (0, graphql_resolvers_1.combineResolvers)(isAuthenticated_1.isAuthenticated, (_, { courseId, studentId }, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                const courseSessions = yield orm.em.find(Session_1.Session, {
                    course: courseId,
                });
                const studentAttended = yield orm.em.find(AssignedSession_1.AssignedSession, {
                    student_id: studentId,
                });
                const studentSessions = studentAttended.map((attendance) => attendance.session_id);
                const attendance = courseSessions.map((session) => {
                    const attended = studentSessions.includes(session.id);
                    return { date: session.createdAt, attended };
                });
                return { data: attendance };
            })),
        },
        Mutation: {
            assignStudent: (0, graphql_resolvers_1.combineResolvers)(isAuthenticated_1.isAuthenticated, (_, { courseId }, { orm, req, io, }) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const student_id = req.session.userId;
                    yield orm.em.findOneOrFail(Course_1.Course, courseId);
                    yield orm.em.findOneOrFail(User_1.User, student_id);
                    const check = yield orm.em.findOne(AssignedCourse_1.AssignedCourse, {
                        course_id: courseId,
                        student_id,
                    });
                    if (check)
                        return { error: 'Already assigned' };
                    const newAssigment = orm.em.create(AssignedCourse_1.AssignedCourse, {
                        course_id: courseId,
                        student_id,
                    });
                    yield orm.em.persistAndFlush(newAssigment);
                    io.emit('ASSIGNMENT_CHANGE', '');
                    return { data: true };
                }
                catch (error) {
                    console.error(error);
                    return { error: 'Not assigned' };
                }
            })),
        },
    },
});
//# sourceMappingURL=assignedCourseModule.js.map