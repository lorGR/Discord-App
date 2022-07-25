import express from 'express';
import UserModel, { UserValidation } from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
const saltRounds = 10;

let userTag = 1000;

export async function register(req: express.Request, res: express.Response) {
    try {
        const { email, username, password, rePassword } = req.body;
        if (!email || !username || !password || !rePassword) throw new Error("Couldn't get all fields from req.body");

        const { error } = UserValidation.validate({ email, username, password, repeatPassword: rePassword });
        if (error) throw error;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const userDB = new UserModel({ email, username, password: hash, userTag });
        userTag++;
        await userDB.save();

        if (userDB) {
            res.send({ register: true, userDB });
        } else {
            res.send({ register: false });
        }

    } catch (error) {
        res.send({ error: error.message });
    }
}

export async function login(req: express.Request, res: express.Response) {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error("Couldn't get all fields from req.body");

        const userDB = await UserModel.findOne({ email });
        if (!userDB) throw new Error("User with that email can't be found")
        if (!userDB.password) throw new Error("No password in DB");
        
        const isMatch = await bcrypt.compare(password, userDB.password);
        if (!isMatch) throw new Error("Email or password do not match");

        //sending cookie
        const cookie = { userId: userDB._id };
        const secret = process.env.JWT_SECRET;

        if (!secret) throw new Error("Couldn't find secret");

        const JWTCookie = jwt.encode(cookie, secret);

        res.cookie("user", JWTCookie);
        res.send({ login:true, userDB });

    } catch (error) {
        res.send({ error: error.message });
    }
}