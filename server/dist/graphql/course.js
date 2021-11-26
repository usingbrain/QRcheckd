"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseModule = void 0;
const graphql_modules_1 = require("graphql-modules");
exports.courseModule = (0, graphql_modules_1.createModule)({
    id: 'course-module',
    dirname: __dirname,
    typeDefs: [
        (0, graphql_modules_1.gql) `
            type Query {
                createCourse(): string
            }
    `,
        (0, graphql_modules_1.gql) `
           type Course {
                id: number;
                name: string;
                teacher_id: number;
            }
    `,
    ],
    resolvers: {
        Query: {
            createCourse: () => 'hello world',
        },
    },
});
//# sourceMappingURL=course.js.map