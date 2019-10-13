import { IPropertyType } from '@interfaces/IPropertyType'

export interface IProperty {
  name: string
  possibleTypes: IPropertyType[]
  possibleValues: string[]
}
