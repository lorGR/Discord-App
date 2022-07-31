"use strict";
exports.__esModule = true;
var express_1 = require("express");
var friendsCtrl_1 = require("../controllers/friendsCtrl");
var router = express_1["default"].Router();
router
    .post('/add-friend', friendsCtrl_1.addFriend)
    .post('/get-friends', friendsCtrl_1.getFriends)["delete"]("/delete-friend", friendsCtrl_1.deleteFriend);
exports["default"] = router;
