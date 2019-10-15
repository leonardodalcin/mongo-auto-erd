import { IEntity } from '@interfaces/IEntity'
import { IMapReducedProperty } from '@interfaces/IMapReducedProperty'
import { IProperty } from '@interfaces/IProperty'
import { IPropertyType } from '@interfaces/IPropertyType'
import { IRelationship } from '@interfaces/IRelationship'
import { Db, MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb'
import { forEachComment } from 'tslint'
import construct = Reflect.construct
interface ICollectionMapReduceProperty { _id: string; value: string }

function getDistinctItems(items: any[]){
  return items.filter(function(
    value,
    index,
    self
  ) {
    return self.indexOf(value) === index
  })
}
export class DBWrapper {
  public connectURL: string
  public databaseName: string
  public db!: Db

  constructor(connectURL: string, databaseName: string) {
    this.connectURL = connectURL
    this.databaseName = databaseName
  }

  public async isIDInCollection(
    id: ObjectId,
    collectionName: string
  ): Promise<boolean> {
    const collection = await this.db.collection(collectionName)
    if (!collection) {
      return false
    }
    const result = await collection.findOne({ _id: id })
    return !!result
  }

  public async findCollectionNameByEntityID(id: ObjectId): Promise<string | null> {
    const collectionNames = await this.getDBCollectionNames()
    for (let i = 0; i < collectionNames.length; i++) {
      if (await this.isIDInCollection(id, collectionNames[i])) {
        return collectionNames[i]
      }
    }
    return null
  }

  private async getRelationshipTargetCollectionName(property: IMapReducedProperty) {
    const objectIds = property.possibleValues.filter((value) => ObjectId.isValid(value))
    const targetCollectionNames = await Promise.all(objectIds.map((id) => this.findCollectionNameByEntityID(new ObjectId(id))))
    for(const collectionName of targetCollectionNames) {
      if (!!collectionName) {
        return collectionName
      }
    }
    return null
  }
  private async getRelationshipType() {

  }
  public async getCollectionRelationships(
    collectionName: string
  ) {
    // : Promise<IRelationship[]> {
    const mapReducedCollectionProperties = await this.mapReduceCollectionProperties(collectionName)
    const objectIdReducedProperties = mapReducedCollectionProperties.filter((property) => property.possibleTypes.includes('objectId'))
    /* *At this point we have an array with the following obj
    * {name: 'propName'
    *  possibleTypes: [contains objectId]
    *  possibleValues: []} */
    const relationshipProps = []
    for(const property of objectIdReducedProperties) {
      const targetCollectionName = await this.getRelationshipTargetCollectionName(property)
      if(!targetCollectionName) continue
      let relationshipProperty = {
        name: property.name,
        targetCollectionName: targetCollectionName,
        relationshipType: [0,0]
      }
      let distinctTypes = getDistinctItems(property.possibleTypes)
      relationshipProperty.relationshipType = [1,1]
      if(distinctTypes.includes('undefined') || distinctTypes.includes('null')) {
        relationshipProperty.relationshipType[0] = 0
      }
      const collection = await this.getCollectionByName(relationshipProperty.targetCollectionName)
      relationshipProps.push(relationshipProperty)

    }
    return relationshipProps

  }

  public async getEntityRelationships(
    entity: IEntity
  ): Promise<IRelationship[]> {
    const objectIdProperties = entity.properties.filter((property) => {
      return (property.name !== '_id' && property.possibleTypes.includes('objectId'))
    })

    const relationships = await Promise.all(
      objectIdProperties.map(async (property) => {
        const id = property.possibleValues[0]
        if (!ObjectId.isValid(property.possibleValues[0])) {
          return
        }
        const relatedCollectionName = await this.findCollectionNameByEntityID(
          new ObjectId(id)
        )
        if (relatedCollectionName) {
          return {
            propertyName: property.name,
            sourceCollectionName: entity.collectionName,
            targetCollectionName: relatedCollectionName,
            type: 'unknown',
          } as IRelationship
        } else {
          return undefined
        }
      })
    )
    return relationships.filter((relationship) => relationship !== undefined) as IRelationship[]
  }

  public async connect() {

    const client = new MongoClient(this.connectURL, { useNewUrlParser: true, useUnifiedTopology: true })
    await client.connect()
    this.db = client.db(this.databaseName)
  }

  public async getDBCollectionNames() {
    return (await this.db.collections()).map((col) => col.collectionName)
  }

  // Define item types of an array.
  public getTypesOfTheArray(items: any[]): IPropertyType[] {
    const floatRegExp = new RegExp(/^-?\d*(\.\d+)?$/)

    const intRegExp = new RegExp(/^\d+$/)
    return items.map(function(item, index) {
      let type: IPropertyType = 'unknown'
      if (typeof item === 'string') {
        type = 'string'
      }
      if (typeof item === 'undefined') {
        type = 'undefined'
      }
      if (item === null) {
        type = 'null'
      }
      if (item === 'false' || item === 'true') {
        type = 'boolean'
      }
      if (!isNaN(Date.parse(item))) {
        type = 'date'
      }
      if (floatRegExp.test(item)) {
        type = 'float'
      }
      if (intRegExp.test(item)) {
        type = 'int'
      }
      if (String(item).indexOf('ObjectId(') !== -1) {
        type = 'objectId'
      }

      if (type === 'string') {
        if (items[index].length === 50) {
          return 'string'
        } else {
          return 'enum'
        }
      }

      return type
    })
  }

  private async getCollectionByName(collectionName: string) {
    return this.db.collection(collectionName)
  }

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

  private async mapReduceCollectionProperties(collectionName: string, limitDocs = 50): Promise<IMapReducedProperty[]> {
    const collection = await this.db.collection(collectionName)
    const mapResult = await collection.mapReduce(
      function() {
        // tslint:disable-next-line
        for (let key in this) {
          // @ts-ignore
          emit(key, this[key])
        }
      },
      function(key, values) {
        // distinct
        if (!Array.isArray(values)) { return [] }
        const distinctItems: any[] = values.filter(function(
          value,
          index,
          self
        ) {
          return self.indexOf(value) === index
        })
        return distinctItems.join(';')
      },
      { out: { inline: 1 }, limit: limitDocs }
    )
    return mapResult.map(
      (item: { _id: string; value: string }) => {
        const possibleValues = item.value
          ? String(item.value).split(';')
          : [item.value]
        return {
          name: item._id,
          possibleTypes: this.getTypesOfTheArray(possibleValues),
          possibleValues: possibleValues.map((value) => {
            return value
              ? String(value)
                .replace(/ObjectId\("/g, '')
                .replace(/"\)/g, '')
              : value
          })
        }
    })
  }

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
