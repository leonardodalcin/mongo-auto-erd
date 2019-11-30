import { IProperty } from './IProperty';
import { IRelationship } from './IRelationship';
export interface IEntity {
    name: string;
    properties: IProperty[];
    relationships: IRelationship[];
}
