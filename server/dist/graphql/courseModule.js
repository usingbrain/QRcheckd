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
exports.courseModule = (0, graphql_modules_1.createModule)({
    id: 'course-module',
    dirname: __dirname,
    typeDefs: [
        (0, graphql_modules_1.gql) `
      type Query {
        getCourses: CoursesResponse
      }

      type Mutation {
        createCourse(name: String): CourseResponse
      }

      type Course {
        id: Int
        name: String
        teacher: Int
      }

      type CourseResponse {
        error: String
        data: Course
      }

      type CoursesResponse {
        error: String
        data: [Course]
      }
    `,
    ],
    resolvers: {
        Query: {
            getCourses: (0, graphql_resolvers_1.combineResolvers)(isAuthenticated_1.isAuthenticated, (_, {}, { orm, req, }) => __awaiter(void 0, void 0, void 0, function* () {
                const courses = yield orm.em.find(Course_1.Course, {
                    teacher: req.session.userId,
                });
                const courseList = courses.map((course) => (Object.assign(Object.assign({}, course), { teacher: course.teacher.id })));
                return { data: courseList };
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
        },
    },
});
//# sourceMappingURL=courseModule.js.map