import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { IRelationship } from 'source/interfaces/IRelationship'
import { IProperty } from '@interfaces/IProperty'

export interface IEntity {
  collectionName: string
  properties: IProperty[]
  relationships: IRelationship[]
}
