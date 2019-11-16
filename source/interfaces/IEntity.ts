import { IProperty } from '@interfaces/IProperty'
import { IRelationship } from 'source/interfaces/IRelationship'

export interface IEntity {
  name: string
  properties: IProperty[]
  relationships: IRelationship[]
}
