import mongoose, { Schema } from "mongoose";

export interface IUser {
    id: "string";
    name: "string";
    password: "string";
    email: "string";
}

export const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);