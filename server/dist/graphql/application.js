"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = void 0;
const graphql_modules_1 = require("graphql-modules");
const assignedCourseModule_1 = require("./assignedCourseModule");
const courseModule_1 = require("./courseModule");
const userModule_1 = require("./userModule");
exports.application = (0, graphql_modules_1.createApplication)({
    modules: [courseModule_1.courseModule, userModule_1.userModule, assignedCourseModule_1.assignedCourseModule],
});
//# sourceMappingURL=application.js.map