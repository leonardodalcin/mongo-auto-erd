"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeOf_1 = require("@entity/typeOf");
const mongodb_1 = require("mongodb");
describe('typeOf', () => {
    const values = [
        1,
        0,
        -1,
        1.1,
        'aString',
        new mongodb_1.ObjectID().toHexString(),
        String(new mongodb_1.ObjectID()),
        String(new mongodb_1.ObjectID()).toString(),
        new Date(),
        null,
        undefined,
        new Array(),
        { test: 'test' },
        'BrandManaged'
    ];
    const oracle = [
        'number',
        'number',
        'number',
        'number',
        'string',
        'objectId',
        'objectId',
        'objectId',
        'object',
        'null',
        'undefined',
        'array',
        'object',
        'string'
    ];
    for (let i = 0; i < values.length; i++) {
        it(`value ${values[i]} should be ${oracle[i]}`, () => {
            expect(typeOf_1.typeOf(values[i])).toBe(oracle[i]);
        });
    }
});
//# sourceMappingURL=typeOf.tests.js.map