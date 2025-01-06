import mongoose, { Schema, Types, model } from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  uid: string;
  photoURL?: string;
  groups: Types.ObjectId[];
  frequentGroups: Types.ObjectId[];
  frequentUsers: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is invalid",
    ],
  },
  fullName: {
    type: String,
    required: [true, "Name is required"],
  },
  uid: {
    type: String,
    required: [true, "UID is required"],
  },
  photoURL: {
    type: String,
  },
  groups: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  frequentGroups: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  frequentUsers: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const User = mongoose.models?.User || model<IUser>("User", UserSchema);
export default User;
