import { typeOf } from '@entity/typeOf'
import { IPropertyType } from '@interfaces/IPropertyType'
import { ObjectID } from 'mongodb'

describe('typeOf', () => {
  const values: any[] = [1, 0, -1, 1.1, 'aString', new ObjectID().toHexString(), String(new ObjectID()), String(new ObjectID()).toString(), new Date(), null, undefined, new Array(), { test: 'test' }]
  const oracle: IPropertyType[] = ['number', 'number', 'number', 'number', 'string', 'objectId', 'objectId', 'objectId', 'object', 'null', 'undefined', 'array', 'object']

  for (let i = 0; i < values.length; i++) {
    it(`value ${values[i]} should be ${oracle[i]}`, () => {
      expect(typeOf(values[i])).toBe(oracle[i])
    })
  }
})
