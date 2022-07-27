"use strict";
exports.__esModule = true;
exports.UserValidation = exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
var joi_1 = require("joi");
var joi_password_1 = require("joi-password");
var joiPassword = joi_1["default"].extend(joi_password_1.joiPasswordExtendCore);
exports.UserSchema = new mongoose_1["default"].Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    src: {
        type: String,
        "default": '../assets/svgs/user-profile-svgrepo-com.svg'
    },
    status: {
        type: Boolean,
        "default": false
    }
});
var UserModel = mongoose_1["default"].model("users", exports.UserSchema);
exports["default"] = UserModel;
exports.UserValidation = joi_1["default"].object({
    email: joi_1["default"].string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    username: joi_1["default"].string().alphanum().min(3).max(16).required(),
    password: joiPassword
        .string()
        .min(6)
        .max(16)
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required(),
    repeatPassword: joi_1["default"].ref('password')
});
