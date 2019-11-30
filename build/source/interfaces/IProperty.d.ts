import { IMapReducedProperty } from './IMapReducedProperty';
import { IPropertyType } from './IPropertyType';
export interface IProperty extends IMapReducedProperty {
    types: IPropertyType[];
}
