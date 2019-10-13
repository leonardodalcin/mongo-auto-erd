import {ObjectID} from 'mongodb'
import 'reflect-metadata'
import {Column, Entity, ObjectIdColumn} from 'typeorm'
@Entity()
export class Photo {

  @ObjectIdColumn()
  public id: ObjectID = new ObjectID()
  @Column()
  public URL: string = 'mockedURL'

  @Column()
  public userId: ObjectID

  constructor(userId: ObjectID) {
    this.userId = userId
  }

}
