import { IProperty } from 'source/interfaces/IProperty'
import { IRelationship } from 'source/interfaces/IRelationship'

export interface IEntity {
  collectionName: string
  properties: IProperty[]
  relationships: IRelationship[]
}
