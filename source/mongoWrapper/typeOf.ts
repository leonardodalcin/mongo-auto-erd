import { IPropertyType } from '@interfaces/IPropertyType'
import { ObjectID } from 'mongodb'

function isObjectId(item: string | number | ObjectID) {
  if (String(item).indexOf('ObjectId(') !== -1) {
    return true
  }
  if (String(item).length === 12 || String(item).length === 24) {
    return /^[0-9a-fA-F]+$/.test(String(item)) || ObjectID.isValid(item)
  }
  return false
}

export function typeOf(item: any): IPropertyType {
  let itemType: IPropertyType = typeof item as IPropertyType
  if (itemType as IPropertyType & 'object' === 'object') {
    if (item === null) {
      itemType = 'null'
    }
    if (Array.isArray(item)) {
      itemType = 'array'
    }
  }
  if (isObjectId(item)) {
    itemType = 'objectId'
  }

  return itemType
}
