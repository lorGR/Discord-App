import mongoose from "mongoose";
import Joi from "joi";
import UserModel from "./userModel";

const UserFriendSchema = new mongoose.Schema({
    user: {
        type: Object,
        required: true
    },
    friend: {
        type : Object,
        required: true
    }
});

const UserFriendModel = mongoose.model('UserFriend', UserFriendSchema);

export default UserFriendModel;