import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { IProperty } from '@interfaces/IProperty'
import { IRelationship } from 'source/interfaces/IRelationship'

export interface IEntity {
  collectionName: string
  properties: IProperty[]
  relationships: IRelationship[]
}
