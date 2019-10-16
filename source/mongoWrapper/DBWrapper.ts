import { IEntity } from '@interfaces/IEntity'
import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { IProperty } from '@interfaces/IProperty'
import { IPropertyType } from '@interfaces/IPropertyType'
import { IRelationship } from '@interfaces/IRelationship'
import { Db, MongoClient } from 'mongodb'
import construct = Reflect.construct

export class DBWrapper {

  // public async getCollectionRelationships(
  //   collectionName: string
  // ) {
  //   // : Promise<IRelationship[]> {
  //   const mapReducedCollectionProperties = await this.mapReduceCollectionProperties(collectionName)
  //   const objectIdReducedProperties = mapReducedCollectionProperties.filter((property) => property.possibleTypes.includes('objectId'))
  //   /* *At this point we have an array with the following obj
  //   * {name: 'propName'
  //   *  possibleTypes: [contains objectId]
  //   *  possibleValues: []} */
  //   const relationshipProps = []
  //   for (const property of objectIdReducedProperties) {
  //     const targetCollectionName = await this.getRelationshipTargetCollectionName(property)
  //     if (!targetCollectionName) { continue }
  //     const relationshipProperty = {
  //       name: property.name,
  //       targetCollectionName,
  //       relationshipType: [0, 0]
  //     }
  //
  //     relationshipProps.push(relationshipProperty)
  //
  //   }
  //   return relationshipProps
  //
  // }

  // public async getEntityRelationships(
  //   entity: IEntity
  // ): Promise<IRelationship[]> {
  //   const objectIdProperties = entity.properties.filter((property) => {
  //     return (property.name !== '_id' && property.possibleTypes.includes('objectId'))
  //   })
  //
  //   const relationships = await Promise.all(
  //     objectIdProperties.map(async (property) => {
  //       const id = property.possibleValues[0]
  //       if (!ObjectId.isValid(property.possibleValues[0])) {
  //         return
  //       }
  //       const relatedCollectionName = await this.findCollectionNameByEntityID(
  //         new ObjectId(id)
  //       )
  //       if (relatedCollectionName) {
  //         return {
  //           propertyName: property.name,
  //           sourceCollectionName: entity.collectionName,
  //           targetCollectionName: relatedCollectionName,
  //           type: 'unknown',
  //         } as IRelationship
  //       } else {
  //         return undefined
  //       }
  //     })
  //   )
  //   return relationships.filter((relationship) => relationship !== undefined) as IRelationship[]
  // }

  // public async getEntityProperties(collectionName: string): Promise<IMapReducedProperty[]> {
  //   const mapResult = await this.mapReduceCollectionProperties(collectionName)
  //   const entityProperties: IMapReducedProperty[] = mapResult.map(
  //     (item: { _id: string; value: string }) => {
  //       const possibleValues = item.value
  //         ? String(item.value).split(';')
  //         : [item.value]
  //       return {
  //         name: item._id,
  //         possibleTypes: this.getTypesOfTheArray(possibleValues),
  //         possibleValues: possibleValues.map((value) => {
  //           return value
  //             ? String(value)
  //               .replace(/ObjectId\("/g, '')
  //               .replace(/"\)/g, '')
  //             : value
  //         })
  //       }
  //     }
  //   )
  //   return entityProperties
  // }

  // // Returns an array of {_id: propertyName, value: val1;val2;val3;} using distinct values
  // public async getEntity(collectionName: string): Promise<IEntity> {
  //
  //   const
  //   const entityRelationships: IRelationship[] = await this.getEntityRelationships(
  //     { collectionName, properties: entityProperties, relationships: [] }
  //   )
  //
  //   const entity: IEntity = {
  //     collectionName,
  //     properties: entityProperties,
  //     relationships: entityRelationships
  //   }
  //   return entity
  // }
}
