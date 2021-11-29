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
exports.assignedSessionModule = void 0;
const graphql_modules_1 = require("graphql-modules");
const Session_1 = require("../entities/Session");
const AssignedSession_1 = require("../entities/AssignedSession");
const User_1 = require("../entities/User");
exports.assignedSessionModule = (0, graphql_modules_1.createModule)({
    id: 'assigned-session-module',
    dirname: __dirname,
    typeDefs: [
        (0, graphql_modules_1.gql) `
      type Mutation {
        attend(studentId: Int!, sessionId: Int!): Boolean!
      }
    `,
    ],
    resolvers: {
        Mutation: {
            attend: (_, { studentId, sessionId }, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield orm.em.findOneOrFail(Session_1.Session, sessionId);
                    yield orm.em.findOneOrFail(User_1.User, studentId);
                    const check = yield orm.em.findOne(AssignedSession_1.AssignedSession, {
                        student_id: studentId,
                        session_id: sessionId,
                    });
                    console.log(check);
                    if (check)
                        return false;
                    const newAttendance = orm.em.create(AssignedSession_1.AssignedSession, {
                        student_id: studentId,
                        session_id: sessionId,
                    });
                    yield orm.em.persistAndFlush(newAttendance);
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
//# sourceMappingURL=assignedSessionModule.js.map