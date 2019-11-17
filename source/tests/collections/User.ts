import { Document, model, Schema } from 'mongoose'

interface IUser extends Document {
  name: string
}
const UserModel = model<IUser>(
  'User',
  new Schema({
    name: { type: String, required: false }
  })
)

export default UserModel
