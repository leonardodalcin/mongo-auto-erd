import { IMapReducedProperty } from '@interfaces/IMapReducedProperty';
import { IPropertyType } from '@interfaces/IPropertyType';
export interface IProperty extends IMapReducedProperty {
    types: IPropertyType[];
}
