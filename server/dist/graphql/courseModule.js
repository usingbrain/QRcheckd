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
exports.courseModule = void 0;
const graphql_modules_1 = require("graphql-modules");
const Course_1 = require("../entities/Course");
const graphql_resolvers_1 = require("graphql-resolvers");
const isAuthenticated_1 = require("./isAuthenticated");
const AssignedCourse_1 = require("../entities/AssignedCourse");
const Session_1 = require("../entities/Session");
const AssignedSession_1 = require("../entities/AssignedSession");
exports.courseModule = (0, graphql_modules_1.createModule)({
    id: 'course-module',
    dirname: __dirname,
    typeDefs: [
        (0, graphql_modules_1.gql) `
      type Query {
        getCourses: CoursesResponse
        getCourse(courseId: Int!): CourseResponse
        getCourseOverview(courseId: Int!): OverviewResponse!
      }

      type Mutation {
        createCourse(name: String): CourseResponse
        deleteCourse(courseId: Int!): DeletionResponse
      }

      type Course {
        id: Int!
        name: String!
        teacher: Int!
      }

      type CourseResponse {
        error: String
        data: Course
      }

      type CoursesResponse {
        error: String
        data: [Course]
      }

      type OverviewResponse {
        error: String
        data: CourseOverview
      }

      type CourseOverview {
        studentTotal: Int!
        sessions: [Session]!
      }

      type DeletionResponse {
        error: String
        data: Boolean
      }
    `,
    ],
    resolvers: {
        Query: {
            getCourse: (0, graphql_resolvers_1.combineResolvers)(isAuthenticated_1.isAuthenticated, (_, { courseId }, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const course = yield orm.em.findOneOrFail(Course_1.Course, courseId);
                    return { data: Object.assign(Object.assign({}, course), { teacher: course.teacher.id }) };
                }
                catch (error) {
                    return { error: 'Course not found' };
                }
            })),
            getCourses: (0, graphql_resolvers_1.combineResolvers)(isAuthenticated_1.isAuthenticated, (_, {}, { orm, req, }) => __awaiter(void 0, void 0, void 0, function* () {
                const courses = yield orm.em.find(Course_1.Course, {
                    teacher: req.session.userId,
                });
                const courseList = courses.map((course) => (Object.assign(Object.assign({}, course), { teacher: course.teacher.id })));
                return { data: courseList };
            })),
            getCourseOverview: (0, graphql_resolvers_1.combineResolvers)(isAuthenticated_1.isAuthenticated, (_, { courseId }, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                const assigments = yield orm.em.find(AssignedCourse_1.AssignedCourse, {
                    course_id: courseId,
                });
                const studentTotal = assigments.length;
                const sessions = yield orm.em.find(Session_1.Session, { course: courseId });
                return { data: { studentTotal, sessions } };
            })),
        },
        Mutation: {
            createCourse: (0, graphql_resolvers_1.combineResolvers)(isAuthenticated_1.isAuthenticated, (_, { name }, { orm, req, }) => __awaiter(void 0, void 0, void 0, function* () {
                const newCourse = orm.em.create(Course_1.Course, {
                    name,
                    teacher: req.session.userId,
                });
                yield orm.em.persistAndFlush(newCourse);
                return { data: Object.assign(Object.assign({}, newCourse), { teacher: newCourse.teacher.id }) };
            })),
            deleteCourse: (0, graphql_resolvers_1.combineResolvers)(isAuthenticated_1.isAuthenticated, (_, { courseId }, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const sessionIds = [];
                    yield orm.em.nativeDelete(AssignedCourse_1.AssignedCourse, { course_id: courseId });
                    const sessions = yield orm.em.find(Session_1.Session, { course: courseId });
                    for (const session of sessions) {
                        sessionIds.push(session.id);
                        yield orm.em.getRepository(Session_1.Session).remove(session);
                    }
                    for (const id of sessionIds) {
                        yield orm.em.nativeDelete(AssignedSession_1.AssignedSession, { session_id: id });
                    }
                    yield orm.em.nativeDelete(Course_1.Course, courseId);
                    return { data: true };
                }
                catch (error) {
                    console.error(error);
                    return { data: false };
                }
            })),
        },
    },
});
//# sourceMappingURL=courseModule.js.map