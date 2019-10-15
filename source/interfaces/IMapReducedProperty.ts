import { IPropertyType } from '@interfaces/IPropertyType'

export interface IMapReducedProperty {
  name: string
  possibleTypes: IPropertyType[]
  possibleValues: string[]
}

