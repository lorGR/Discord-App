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
        unique: true,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    src: {
        type: String,
        default: '../assets/svgs/user-profile-svgrepo-com.svg'
    },
    status: {
        type: Boolean,
        default: false
    }
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;

export const UserValidation = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    username: Joi.string().alphanum().min(3).max(16).required(),
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
    repeatPassword: Joi.ref('password')
});
