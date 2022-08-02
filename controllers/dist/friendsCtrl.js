"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getFriendByRoomId = exports.getSharedRoomId = exports.deleteFriend = exports.getFriends = exports.addFriend = void 0;
var userModel_1 = require("../models/userModel");
var userFriends_1 = require("../models/userFriends");
var uuid_1 = require("uuid");
function addFriend(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, friendUsername, userDB, _b, friendDB, existFriend, sharedRoomId, _c, friendUser, userFriend, _d, friendUserDB, userFriendDB, error_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 6, , 7]);
                    _a = req.body, friendUsername = _a.friendUsername, userDB = _a.userDB;
                    if (!friendUsername || !userDB)
                        throw new Error("Couldn't find friendUsername or UserDB from req.body");
                    if (!(friendUsername !== userDB.username)) return [3 /*break*/, 4];
                    return [4 /*yield*/, Promise.all([
                            userModel_1["default"].findOne({ username: friendUsername }),
                            userFriends_1["default"].find({ 'user._id': userDB._id, 'friend.username': friendUsername })
                        ])];
                case 1:
                    _b = _e.sent(), friendDB = _b[0], existFriend = _b[1];
                    if (Object.keys(existFriend).length > 0)
                        throw new Error("You already are friends");
                    if (!friendDB)
                        throw new Error("Couldn't find user with username: " + friendUsername);
                    console.log(friendDB);
                    sharedRoomId = uuid_1.v4();
                    return [4 /*yield*/, Promise.all([
                            new userFriends_1["default"]({ user: userDB, friend: friendDB, sharedRoomId: sharedRoomId }),
                            new userFriends_1["default"]({ user: friendDB, friend: userDB, sharedRoomId: sharedRoomId })
                        ])];
                case 2:
                    _c = _e.sent(), friendUser = _c[0], userFriend = _c[1];
                    if (!friendUser)
                        throw new Error("Couldn't create friend user");
                    if (!userFriend)
                        throw new Error("Couldn't create user friend");
                    return [4 /*yield*/, Promise.all([
                            friendUser.save(),
                            userFriend.save()
                        ])];
                case 3:
                    _d = _e.sent(), friendUserDB = _d[0], userFriendDB = _d[1];
                    res.send({ friendUserDB: friendUserDB });
                    return [3 /*break*/, 5];
                case 4: throw new Error("Can't add yourself to friend list");
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_1 = _e.sent();
                    res.send({ error: error_1.message });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.addFriend = addFriend;
function getFriends(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userDB, userFriendsDB, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userDB = req.body.userDB;
                    if (!userDB)
                        throw new Error("Couldn't get userDB from req.body");
                    return [4 /*yield*/, userFriends_1["default"].find({ 'user.username': userDB.username })];
                case 1:
                    userFriendsDB = _a.sent();
                    if (userFriendsDB.length === 0)
                        throw new Error("This user doesn't have friends :(");
                    res.send({ userFriendsDB: userFriendsDB });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.send({ error: error_2.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getFriends = getFriends;
function deleteFriend(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, friendUsername, username, _b, error_3;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    _a = req.body, friendUsername = _a.friendUsername, username = _a.username;
                    return [4 /*yield*/, userFriends_1["default"].deleteOne({ 'friend.username': friendUsername, 'user.username': username })];
                case 1:
                    _b = (_c.sent());
                    if (!_b) return [3 /*break*/, 3];
                    return [4 /*yield*/, userFriends_1["default"].deleteOne({ 'friend.username': username, 'user.username': friendUsername })];
                case 2:
                    _b = (_c.sent());
                    _c.label = 3;
                case 3:
                    if (_b) {
                        res.send({ 'succses': true });
                    }
                    else {
                        res.send({ 'succses': false });
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _c.sent();
                    res.send({ error: error_3.message });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.deleteFriend = deleteFriend;
function getSharedRoomId(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, friendUsername, userDB, userFriendDB, sharedRoomId, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, friendUsername = _a.friendUsername, userDB = _a.userDB;
                    if (!friendUsername || !userDB)
                        throw new Error("Couldn't reiceve friendUsername or userDB wasn't found in req.body");
                    return [4 /*yield*/, userFriends_1["default"].findOne({ 'friend.username': friendUsername, 'user.username': userDB.username })];
                case 1:
                    userFriendDB = _b.sent();
                    if (!userFriendDB)
                        throw new Error("Couldn't find user with username " + userDB.usernmae + ", and a friend with username: " + friendUsername);
                    sharedRoomId = userFriendDB.sharedRoomId;
                    res.send({ sharedRoomId: sharedRoomId });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    res.send({ error: error_4.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getSharedRoomId = getSharedRoomId;
function getFriendByRoomId(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userDB, roomId, friendDB, friend, error_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, userDB = _a.userDB, roomId = _a.roomId;
                    if (!userDB || !roomId)
                        throw new Error("Couldn't reiceve userDB or roomId from req.body");
                    return [4 /*yield*/, userFriends_1["default"].findOne({ 'user.username': userDB.username, 'sharedRoomId': roomId })];
                case 1:
                    friendDB = _b.sent();
                    if (!friendDB)
                        throw new Error("Couldn't find user with username: " + userDB.username + " and share room id  of: " + roomId + ".");
                    friend = friendDB.friend;
                    res.send({ friend: friend });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _b.sent();
                    res.send({ error: error_5.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getFriendByRoomId = getFriendByRoomId;
