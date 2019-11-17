"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Photo_1 = require("@tests/collections/Photo");
const User_1 = require("@tests/collections/User");
const UserGroup_1 = require("@tests/collections/UserGroup");
const mongoose = require("mongoose");
async function populateDatabase() {
    await mongoose.connect(await global.mongod.getUri(), {
        dbName: await global.mongod.getDbName(),
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const user = await User_1.default.create({ name: 'Test user name' });
    await User_1.default.create({ name: 'Test user name2' });
    await User_1.default.create({ name: undefined });
    await Photo_1.default.create({ title: 'Test photo name', user: user._id });
    await Photo_1.default.create({ title: 'Test photo name2', user: user._id });
    await UserGroup_1.default.create({
        name: 'Test user group',
        users: [user._id, user._id]
    });
    await UserGroup_1.default.create({
        name: 'Test user group2',
        users: [user._id, user._id]
    });
}
exports.populateDatabase = populateDatabase;
//# sourceMappingURL=dbSetup.js.map