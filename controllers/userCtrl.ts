import express from 'express';
import UserModel, { UserValidation } from '../models/userModel';

let userTag = 1000;

export async function register(req: express.Request, res: express.Response) {
    try {
        console.log("hero is working");
        const { email, username, password, rePassword } = req.body;
        console.log(req.body);
        if (!email || !username || !password || !rePassword) throw new Error("All fields must be filled");

        console.log("Register");

        const { error , value} = UserValidation.validate({ email, username, password, repeatPassword: rePassword });
        console.log(value);
        if(error) throw error;

        const userDB = new UserModel({ email, username, password, repeatPassword: rePassword, userTag});
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