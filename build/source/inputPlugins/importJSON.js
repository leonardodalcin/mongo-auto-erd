"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function importJSON(path) {
    return JSON.parse(fs_1.readFileSync(path));
}
exports.importJSON = importJSON;
//# sourceMappingURL=importJSON.js.map