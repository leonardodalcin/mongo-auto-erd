"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserGroupModel = mongoose_1.model('UserGroup', new mongoose_1.Schema({
    name: String,
    users: [mongoose_1.Schema.Types.ObjectId]
}));
exports.default = UserGroupModel;
//# sourceMappingURL=UserGroup.js.map