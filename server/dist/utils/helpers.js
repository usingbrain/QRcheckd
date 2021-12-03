"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidRegisterInfo = void 0;
const validator_1 = __importDefault(require("validator"));
function isValidRegisterInfo(inputUser) {
    const fields = ['name', 'lastname', 'email', 'password', 'role'];
    for (const field of fields) {
        if (!inputUser[field])
            return { valid: false, error: 'All fields are required!' };
        if (field !== 'password' && !validator_1.default.isStrongPassword(inputUser[field]))
            return {
                valid: false,
                error: 'Password must have at least one lowercase and one uppercase letters, one symbol and at least 8 characters!',
            };
        if (field === 'email' && !validator_1.default.isEmail(inputUser[field]))
            return { valid: false, error: 'Invalid email format!' };
    }
    return { valid: true };
}
exports.isValidRegisterInfo = isValidRegisterInfo;
//# sourceMappingURL=helpers.js.map