import { IEntity } from '@interfaces/IEntity'

export const ERD: IEntity[] = [
  {
    name: 'users',
    properties: [
      {
        name: '__v',
        types: ['number', 'number', 'number'],
        values: [0, 0, 0]
      },
      {
        name: '_id',
        types: ['objectId', 'objectId', 'objectId'],
        values: [
          '5dd1ee368eb901861a2be463',
          '5dd1ee368eb901861a2be464',
          '5dd1ee368eb901861a2be465'
        ]
      },
      {
        name: 'name',
        types: ['string', 'string'],
        values: ['Test user name', 'Test user name2']
      }
    ],
    relationships: [
      {
        propertyNames: ['_id'],
        targetCollectionName: 'users'
      }
    ]
  },
  {
    name: 'photos',
    properties: [
      {
        name: '__v',
        types: ['number', 'number'],
        values: [0, 0]
      },
      {
        name: '_id',
        types: ['objectId', 'objectId'],
        values: ['5dd1ee368eb901861a2be466', '5dd1ee368eb901861a2be467']
      },
      {
        name: 'title',
        types: ['string', 'string'],
        values: ['Test photo name', 'Test photo name2']
      },
      {
        name: 'user',
        types: ['objectId', 'objectId'],
        values: ['5dd1ee368eb901861a2be463', '5dd1ee368eb901861a2be463']
      }
    ],
    relationships: [
      {
        propertyNames: ['_id'],
        targetCollectionName: 'photos'
      },
      {
        propertyNames: ['user'],
        targetCollectionName: 'users'
      }
    ]
  },
  {
    name: 'usergroups',
    properties: [
      {
        name: '__v',
        types: ['number', 'number'],
        values: [0, 0]
      },
      {
        name: '_id',
        types: ['objectId', 'objectId'],
        values: ['5dd1ee368eb901861a2be468', '5dd1ee368eb901861a2be469']
      },
      {
        name: 'name',
        types: ['string', 'string'],
        values: ['Test user group', 'Test user group2']
      },
      {
        name: 'users',
        types: ['objectId', 'objectId', 'objectId', 'objectId'],
        values: [
          '5dd1ee368eb901861a2be463',
          '5dd1ee368eb901861a2be463',
          '5dd1ee368eb901861a2be463',
          '5dd1ee368eb901861a2be463'
        ]
      }
    ],
    relationships: [
      {
        propertyNames: ['_id'],
        targetCollectionName: 'usergroups'
      },
      {
        propertyNames: ['users'],
        targetCollectionName: 'users'
      }
    ]
  }
]
