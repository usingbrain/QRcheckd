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
const core_1 = require("@mikro-orm/core");
const Session_1 = require("../entities/Session");
const AssignedSession_1 = require("../entities/AssignedSession");
const User_1 = require("../entities/User");
const graphql_resolvers_1 = require("graphql-resolvers");
const isAuthenticated_1 = require("./isAuthenticated");
exports.assignedSessionModule = (0, graphql_modules_1.createModule)({
    id: 'assigned-session-module',
    dirname: __dirname,
    typeDefs: [
        (0, graphql_modules_1.gql) `
      type Mutation {
        attend(sessionId: Int!): AssignedSessionResponse!
        endSession(sessionId: Int!): AssignedSessionResponse!
      }

      type AssignedSessionResponse {
        error: String
        data: Boolean!
      }
    `,
    ],
    resolvers: {
        Mutation: {
            attend: (0, graphql_resolvers_1.combineResolvers)(isAuthenticated_1.isAuthenticated, (_, { sessionId }, { orm, req, io, }) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const student_id = req.session.userId;
                    const session = yield orm.em.findOneOrFail(Session_1.Session, sessionId);
                    if (session.closed)
                        return { error: 'session closed', data: false };
                    yield orm.em.findOneOrFail(User_1.User, student_id);
                    const check = yield orm.em.findOne(AssignedSession_1.AssignedSession, {
                        student_id,
                        session_id: sessionId,
                    });
                    if (check)
                        return { error: 'Already assigned!', data: false };
                    const newAttendance = orm.em.create(AssignedSession_1.AssignedSession, {
                        student_id,
                        session_id: sessionId,
                    });
                    yield orm.em.persistAndFlush(newAttendance);
                    io.emit('attendance change', '');
                    return { data: true };
                }
                catch (error) {
                    console.error(error);
                    return { error: 'Not checked in!', data: false };
                }
            })),
            endSession: (0, graphql_resolvers_1.combineResolvers)(isAuthenticated_1.isAuthenticated, (_, { sessionId }, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const session = yield orm.em.findOneOrFail(Session_1.Session, sessionId);
                    (0, core_1.wrap)(session).assign({ closed: true }, { mergeObjects: true });
                    yield orm.em.flush();
                    return { data: true };
                }
                catch (error) {
                    console.error(error);
                    return { error: 'Session not ended!', data: false };
                }
            })),
        },
    },
});
//# sourceMappingURL=assignedSessionModule.js.map