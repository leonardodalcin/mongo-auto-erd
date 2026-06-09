import { IAggregatedProperty } from '@interfaces/IAggregatedProperty'
import { IPropertyType } from '@interfaces/IPropertyType'

export interface IProperty extends IAggregatedProperty {
  types: IPropertyType[]
}
