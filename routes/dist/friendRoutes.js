"use strict";
exports.__esModule = true;
var express_1 = require("express");
var friendsCtrl_1 = require("../controllers/friendsCtrl");
var router = express_1["default"].Router();
router
    .post('/add-friend', friendsCtrl_1.addFriend)
    .post('/get-friends', friendsCtrl_1.getFriends)
    .post('/get-sharedRoomId', friendsCtrl_1.getSharedRoomId)
    .post('/get-friendByRoomId', friendsCtrl_1.getFriendByRoomId)["delete"]('/delete-friend', friendsCtrl_1.deleteFriend);
exports["default"] = router;
