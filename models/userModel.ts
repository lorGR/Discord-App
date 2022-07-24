import mongoose from 'mongoose';
import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

const UserSchema = new mongoose.Schema({
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

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;

export const UserValidation = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    username: Joi.string().alphanum().min(3).max(16).required(),
    password: joiPassword.string().minOfSpecialCharacters(1).minOfLowerCase(1).minOfUpperCase(1).minOfNumric(1).noWhiteSpaces().min(6).max(16).required(),
    repeatPassword: Joi.ref('password')
});
