import { IProperty } from '@interfaces/IProperty';
import { IRelationship } from '@interfaces/IRelationship';
export interface IEntity {
    name: string;
    properties: IProperty[];
    relationships: IRelationship[];
}
