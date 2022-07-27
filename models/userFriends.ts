import mongoose from "mongoose";

export const UserFriendSchema = new mongoose.Schema({
    user: {
        // Create new Schema instead of Object ,a simple Schema of UserModel
        type: Object,
        required: true
    },
    friend: {
        // Create new Schema instead of Object ,a simple Schema of UserModel
        type : Object,
        required: true
    }
});

const UserFriendModel = mongoose.model('UserFriend', UserFriendSchema);

export default UserFriendModel;