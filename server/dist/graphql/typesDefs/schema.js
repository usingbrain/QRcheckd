"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
const inputUser_1 = require("./inputUser");
const Query = `
    type Query {
        registerUser(user: InputUser!): User
    }
`;
makeExecutableSchema({
    typeDefs: [Query, user_1.typeDef, inputUser_1.typeDef],
    resolvers: {},
});
//# sourceMappingURL=schema.js.map