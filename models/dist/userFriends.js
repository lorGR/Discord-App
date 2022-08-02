"use strict";
exports.__esModule = true;
exports.UserFriendSchema = void 0;
var mongoose_1 = require("mongoose");
exports.UserFriendSchema = new mongoose_1["default"].Schema({
    user: {
        // Create new Schema instead of Object ,a simple Schema of UserModel
        type: Object,
        required: true
    },
    friend: {
        // Create new Schema instead of Object ,a simple Schema of UserModel
        type: Object,
        required: true
    },
    sharedRoomId: {
        type: String,
        required: true
    }
});
var UserFriendModel = mongoose_1["default"].model('UserFriend', exports.UserFriendSchema);
exports["default"] = UserFriendModel;
