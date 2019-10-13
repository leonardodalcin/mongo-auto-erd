export interface IRelationship {
  type: 'n-n' | '1-n' | '1-1' | 'unknown'
  sourceCollectionName: string
  targetCollectionName: string
  propertyName: string
}
