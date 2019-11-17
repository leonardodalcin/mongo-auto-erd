import { Document, model, Schema } from 'mongoose'

interface IPhoto extends Document {
  title: string
  user: string
}
const PhotoModel = model<IPhoto>(
  'Photo',
  new Schema({
    title: String,
    user: Schema.Types.ObjectId
  })
)

export default PhotoModel
