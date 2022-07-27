"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UserFriendSchema = new mongoose_1["default"].Schema({
    user: {
        // Create new Schema instead of Object ,a simple Schema of UserModel
        type: Object,
        required: true
    },
    friend: {
        // Create new Schema instead of Object ,a simple Schema of UserModel
        type: Object,
        required: true
    }
});
var UserFriendModel = mongoose_1["default"].model('UserFriend', UserFriendSchema);
exports["default"] = UserFriendModel;
