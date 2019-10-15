import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { IRelationship } from 'source/interfaces/IRelationship'

export interface IEntity {
  collectionName: string
  properties: IMapReducedProperty[]
  relationships: IRelationship[]
}
