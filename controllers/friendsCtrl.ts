import express from 'express'
import UserModel from '../models/userModel'
import UserFriendModel from '../models/userFriends'

export async function addFriend(req: express.Request, res: express.Response) {
    try {
        const { friendUsername, userDB } = req.body;
        if (!friendUsername || !userDB) throw new Error("Couldn't find friendUsername or UserDB from req.body");

        const friendDB = await UserModel.findOne({ username: friendUsername });
        if (!friendDB) throw new Error(`Couldn;t find user with username: ${friendUsername}`);

        const friendUser = new UserFriendModel({ user: userDB, friend: friendDB });
        if (!friendUser) throw new Error("Couldn't create friend user");
        const friendUserDB = await friendUser.save();

        const userFriend = new UserFriendModel({ user: friendDB, friend: userDB });
        if (!userFriend) throw new Error("Couldn't create user friend");
        const userFriendDB = await userFriend.save();

        res.send({ friendUserDB });
    } catch (error) {
        res.send({ error: error.message });
    }
}

export async function getFriends(req: express.Request, res: express.Response) {
    try {
        const { userDB } = req.body;
        if (!userDB) throw new Error("Couldn't get userDB from req.body");

        const userFriendsDB = await UserFriendModel.find({ 'user._id': userDB._id });
        if (!userFriendsDB) throw new Error(`This user doesn't have friends :(`);

        res.send({ userFriendsDB });
    } catch (error) {
        res.send({ error: error.message });
    }
}