import { Document } from 'mongoose';
interface IPhoto extends Document {
    title: string;
    user: string;
}
declare const PhotoModel: import("mongoose").Model<IPhoto, {}>;
export default PhotoModel;
