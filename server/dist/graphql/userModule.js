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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModule = void 0;
const graphql_modules_1 = require("graphql-modules");
const User_1 = require("../entities/User");
const argon2_1 = __importDefault(require("argon2"));
exports.userModule = (0, graphql_modules_1.createModule)({
    id: 'user-module',
    dirname: __dirname,
    typeDefs: [
        (0, graphql_modules_1.gql) `
      type Query {
        loginUser(credentials: Credentials): User
        me: User
      }

      type Mutation {
        registerUser(user: InputUser): User
      }

      type User {
        id: Int
        name: String
        lastname: String
        email: String
        role: String
      }

      input InputUser {
        name: String
        lastname: String
        email: String
        password: String
        role: String
      }

      input Credentials {
        email: String
        password: String
      }
    `,
    ],
    resolvers: {
        Query: {
            me: (_, {}, { orm, req, }) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.userId))
                    return null;
                const user = orm.em.findOne(User_1.User, { id: req.session.userId });
                return user;
            }),
            loginUser: (_, { credentials }, { orm, req, store, }) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const loggedUser = yield orm.em.findOneOrFail(User_1.User, {
                        email: credentials.email,
                    });
                    const valid = yield argon2_1.default.verify(loggedUser.password, credentials.password);
                    if (!valid)
                        return null;
                    console.log(store);
                    req.session.userId = loggedUser.id;
                    console.log('SESS ID', req.session.id);
                    return loggedUser;
                }
                catch (error) {
                    console.error(error);
                    return null;
                }
            }),
        },
        Mutation: {
            registerUser: (_, { user }, { orm, req, }) => __awaiter(void 0, void 0, void 0, function* () {
                const hashedPass = yield argon2_1.default.hash(user.password);
                const newUser = orm.em.create(User_1.User, Object.assign(Object.assign({}, user), { password: hashedPass }));
                yield orm.em.persistAndFlush(newUser);
                req.session.userId = newUser.id;
                return newUser;
            }),
        },
    },
});
//# sourceMappingURL=userModule.js.map