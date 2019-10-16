export interface IRelationship {
  propertyName: string
  type: 'n-n' | '1-n' | '1-1' | 'unknown'
  sourceCollectionName: string
  targetCollectionName: string
}
