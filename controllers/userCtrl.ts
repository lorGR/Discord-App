import express from 'express';
import UserModel, { UserValidation } from '../models/userModel';

let userTag = 1000;

export async function register(req: express.Request, res: express.Response) {
    try {
        const { email, username, password, rePassword } = req.body;
        console.log(req.body);
        if (!email || !username || !password || !rePassword) throw new Error("All fields must be filled");

        const { error } = UserValidation.validate({ email, username, password, repeatPassword: rePassword });
        if(error) throw error;

        const userDB = new UserModel({ email, username, password, userTag});
        userTag++;
        await userDB.save();
        if(userDB) {
            res.send({ register: true, userDB });
        } else {
            res.send({ register: false});
        }
        
    } catch (error) {
        res.send({error: error.message});
    }
}