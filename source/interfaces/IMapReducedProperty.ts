import { IPropertyType } from '@interfaces/IPropertyType'

export interface IMapReducedProperty {
  name: string
  canBeUndefined: boolean
  canBeNull: boolean
  values: Array<{value: any, type: IPropertyType}>
}
