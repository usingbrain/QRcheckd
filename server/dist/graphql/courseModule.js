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
exports.courseModule = (0, graphql_modules_1.createModule)({
    id: 'course-module',
    dirname: __dirname,
    typeDefs: [
        (0, graphql_modules_1.gql) `
      type Mutation {
        createCourse(course: InputCourse): Course
      }

      type Course {
        id: Int
        name: String
        teacher: Int
      }

      input InputCourse {
        name: String
        teacher: Int
      }
    `,
    ],
    resolvers: {
        Mutation: {
            createCourse: (_, { course }, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                const newCourse = orm.em.create(Course_1.Course, course);
                yield orm.em.persistAndFlush(newCourse);
                return Object.assign(Object.assign({}, newCourse), { teacher: newCourse.teacher.id });
            }),
        },
    },
});
//# sourceMappingURL=courseModule.js.map