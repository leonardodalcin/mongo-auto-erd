// Define item types of an array.
import { IPropertyType } from '@interfaces/IPropertyType'
import { Types } from 'mongoose'
const ObjectID = require('mongodb').ObjectID;

export function getPropertyType(item: any): IPropertyType {
  const floatRegExp = new RegExp(/^-?\d*(\.\d+)?$/)

  const intRegExp = new RegExp(/^\d+$/)
  let type: IPropertyType = 'unknown'
  if (typeof item === 'string') {
    type = 'string'
  }
  if (typeof item === 'undefined') {
    type = 'undefined'
  }
  if (item === null) {
    type = 'null'
  }
  if (item === 'false' || item === 'true') {
    type = 'boolean'
  }
  if (!isNaN(Date.parse(item))) {
    type = 'date'
  }
  if (floatRegExp.test(item)) {
    type = 'float'
  }
  if (intRegExp.test(item)) {
    type = 'int'
  }
  if (String(item).indexOf('ObjectId(') !== -1) {
    type = 'objectId'
  }
  if (ObjectID.isValid(String(item))) {
    type = 'objectId'
  }

  return type
}
