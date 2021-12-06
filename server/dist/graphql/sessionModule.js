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
exports.sessionModule = void 0;
const graphql_modules_1 = require("graphql-modules");
const Session_1 = require("../entities/Session");
const Course_1 = require("../entities/Course");
const AssignedSession_1 = require("../entities/AssignedSession");
const User_1 = require("../entities/User");
const isAuthenticated_1 = require("./isAuthenticated");
const graphql_resolvers_1 = require("graphql-resolvers");
exports.sessionModule = (0, graphql_modules_1.createModule)({
    id: 'session-module',
    dirname: __dirname,
    typeDefs: [
        (0, graphql_modules_1.gql) `
        type Query {
          getSessionAttendance(sessionId: Int!): SessionAttendanceResponse!
        }

        type Mutation {
          createSession(courseId: Int!): SessionResponse!
        }

        type Session {
          id: Int!
          createdAt: String!
          course: Int!
          attendance: Int!
        }

        type SessionResponse {
          error: String
          data: Session
        }

        type SessionAttendanceResponse {
          error: String
          data: [Student]
        }
      `,
    ],
    resolvers: {
        Query: {
            getSessionAttendance: (0, graphql_resolvers_1.combineResolvers)(isAuthenticated_1.isAuthenticated, (_, { sessionId }, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                const attendances = yield orm.em.find(AssignedSession_1.AssignedSession, {
                    session_id: sessionId,
                });
                const studentList = attendances.map((attendance) => __awaiter(void 0, void 0, void 0, function* () {
                    return yield orm.em.findOne(User_1.User, attendance.student_id);
                }));
                return { data: studentList };
            })),
        },
        Mutation: {
            createSession: (0, graphql_resolvers_1.combineResolvers)(isAuthenticated_1.isAuthenticated, (_, { courseId }, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield orm.em.findOneOrFail(Course_1.Course, courseId);
                    const newSession = orm.em.create(Session_1.Session, { course: courseId });
                    yield orm.em.persistAndFlush(newSession);
                    return { data: Object.assign(Object.assign({}, newSession), { course: newSession.course.id }) };
                }
                catch (error) {
                    console.error(error);
                    return { error: 'Oops soemthing went wrong' };
                }
            })),
        },
        Session: {
            attendance: (parentSession, _, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                const rows = yield orm.em.find(AssignedSession_1.AssignedSession, {
                    session_id: parentSession.id,
                });
                return rows.length;
            }),
        },
    },
});
//# sourceMappingURL=sessionModule.js.map