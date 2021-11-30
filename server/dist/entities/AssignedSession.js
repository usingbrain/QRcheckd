"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignedSession = void 0;
const core_1 = require("@mikro-orm/core");
let AssignedSession = class AssignedSession {
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], AssignedSession.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], AssignedSession.prototype, "session_id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], AssignedSession.prototype, "student_id", void 0);
AssignedSession = __decorate([
    (0, core_1.Entity)()
], AssignedSession);
exports.AssignedSession = AssignedSession;
//# sourceMappingURL=AssignedSession.js.map