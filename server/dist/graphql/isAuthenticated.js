"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const graphql_resolvers_1 = require("graphql-resolvers");
const isAuthenticated = (_, {}, { req }) => { var _a; return ((_a = req.session) === null || _a === void 0 ? void 0 : _a.userId) ? graphql_resolvers_1.skip : [{ name: 'Not authenticated' }]; };
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=isAuthenticated.js.map