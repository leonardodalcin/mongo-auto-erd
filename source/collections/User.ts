import {ObjectID} from 'mongodb'
import 'reflect-metadata'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
export class User {

    @ObjectIdColumn()
    public id: ObjectID = new ObjectID()
    @Column()
    public name = 'name'

    constructor() {return this}
}
