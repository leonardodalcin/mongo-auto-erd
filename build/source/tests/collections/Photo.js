"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PhotoModel = mongoose_1.model('Photo', new mongoose_1.Schema({
    title: String,
    user: mongoose_1.Schema.Types.ObjectId
}));
exports.default = PhotoModel;
//# sourceMappingURL=Photo.js.map