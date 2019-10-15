import { IPropertyType } from '@interfaces/IPropertyType'

export interface IMapReducedProperty {
  name: string
  values: {value: any, type: IPropertyType}[]
}

