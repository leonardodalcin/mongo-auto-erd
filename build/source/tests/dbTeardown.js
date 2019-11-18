"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
async function dbTeardown() {
    await mongoose.connection.close();
    await global.mongod.stop();
}
exports.dbTeardown = dbTeardown;
//# sourceMappingURL=dbTeardown.js.map