import { Document, model, Schema } from 'mongoose'

interface IUserGroup extends Document {
  name: string
  users: string[]
}
const UserGroupModel = model<IUserGroup>(
  'UserGroup',
  new Schema({
    name: String,
    users: [Schema.Types.ObjectId]
  })
)

export default UserGroupModel
