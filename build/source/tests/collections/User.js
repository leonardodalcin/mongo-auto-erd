"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserModel = mongoose_1.model('User', new mongoose_1.Schema({
    name: { type: String, required: false }
}));
exports.default = UserModel;
//# sourceMappingURL=User.js.map