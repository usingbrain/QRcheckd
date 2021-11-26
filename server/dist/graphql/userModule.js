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
exports.userModule = void 0;
const graphql_modules_1 = require("graphql-modules");
const User_1 = require("../entities/User");
exports.userModule = (0, graphql_modules_1.createModule)({
    id: 'user-module',
    dirname: __dirname,
    typeDefs: [
        (0, graphql_modules_1.gql) `
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
    `,
    ],
    resolvers: {
        Mutation: {
            registerUser: (_, { user }, { orm }) => __awaiter(void 0, void 0, void 0, function* () {
                const newUser = orm.em.create(User_1.User, user);
                yield orm.em.persistAndFlush(newUser);
                return newUser;
            }),
        },
    },
});
//# sourceMappingURL=userModule.js.map