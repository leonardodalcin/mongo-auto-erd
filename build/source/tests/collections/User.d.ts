import { Document } from 'mongoose';
interface IUser extends Document {
    name: string;
}
declare const UserModel: import("mongoose").Model<IUser, {}>;
export default UserModel;
