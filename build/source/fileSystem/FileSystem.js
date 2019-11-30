"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class FileSystem {
    static writeObjToFile(filename, obj) {
        fs.writeFileSync(path.resolve(filename), JSON.stringify(obj));
    }
}
exports.FileSystem = FileSystem;
//# sourceMappingURL=FileSystem.js.map