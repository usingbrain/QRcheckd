"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = void 0;
const graphql_modules_1 = require("graphql-modules");
const assignedCourseModule_1 = require("./assignedCourseModule");
const assignedSessionModule_1 = require("./assignedSessionModule");
const courseModule_1 = require("./courseModule");
const userModule_1 = require("./userModule");
const sessionModule_1 = require("./sessionModule");
exports.application = (0, graphql_modules_1.createApplication)({
    modules: [
        courseModule_1.courseModule,
        userModule_1.userModule,
        sessionModule_1.sessionModule,
        assignedCourseModule_1.assignedCourseModule,
        assignedSessionModule_1.assignedSessionModule,
    ],
});
//# sourceMappingURL=application.js.map