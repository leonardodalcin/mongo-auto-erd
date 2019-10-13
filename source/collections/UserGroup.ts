import { User } from '@collections/User'
import {ObjectID} from 'mongodb'
import 'reflect-metadata'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
export class UserGroup {
  @ObjectIdColumn()
  public id: ObjectID = new ObjectID()

  @Column((type) => User)
  public users: Array<User['id']>

  constructor(userIDs: ObjectID[]) {
    this.users = userIDs
  }
}
