import { Document } from 'mongoose';
interface IUserGroup extends Document {
    name: string;
    users: string[];
}
declare const UserGroupModel: import("mongoose").Model<IUserGroup, {}>;
export default UserGroupModel;
