"use strict";
exports.__esModule = true;
exports.UserValidation = void 0;
var mongoose_1 = require("mongoose");
var joi_1 = require("joi");
var joi_password_1 = require("joi-password");
var joiPassword = joi_1["default"].extend(joi_password_1.joiPasswordExtendCore);
var UserSchema = new mongoose_1["default"].Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    repeatPassword: {
        type: String,
        required: true
    },
    userTag: {
        type: Number,
        required: true
    }
});
var UserModel = mongoose_1["default"].model("users", UserSchema);
exports["default"] = UserModel;
exports.UserValidation = joi_1["default"].object({
    email: joi_1["default"].string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    username: joi_1["default"].string().alphanum().min(3).max(16).required(),
    password: joiPassword.string().minOfSpecialCharacters(1).minOfLowerCase(1).minOfUpperCase(1).minOfNumric(1).noWhiteSpaces().min(6).max(16).required(),
    repeatPassword: joi_1["default"].ref('password')
});
