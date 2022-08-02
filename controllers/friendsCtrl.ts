import express from 'express'
import UserModel from '../models/userModel'
import UserFriendModel from '../models/userFriends'
import { v4 as uuidv4 } from 'uuid';
import { rmSync } from 'fs';

export async function addFriend(req: express.Request, res: express.Response) {
    try {
        const { friendUsername, userDB } = req.body;
        if (!friendUsername || !userDB) throw new Error("Couldn't find friendUsername or UserDB from req.body");
        if (friendUsername !== userDB.username) {

            const [friendDB, existFriend] = await Promise.all([
                UserModel.findOne({ username: friendUsername }),
                UserFriendModel.find({ 'user._id': userDB._id, 'friend.username': friendUsername })
            ]);

            if (Object.keys(existFriend).length > 0) throw new Error("You already are friends");
            if (!friendDB) throw new Error(`Couldn't find user with username: ${friendUsername}`);
            console.log(friendDB);

            const sharedRoomId = uuidv4();

            const [friendUser, userFriend] = await Promise.all([
                new UserFriendModel({ user: userDB, friend: friendDB, sharedRoomId }),
                new UserFriendModel({ user: friendDB, friend: userDB, sharedRoomId })
            ]);

            if (!friendUser) throw new Error("Couldn't create friend user");
            if (!userFriend) throw new Error("Couldn't create user friend");

            const [friendUserDB, userFriendDB] = await Promise.all([
                friendUser.save(),
                userFriend.save()
            ]);

            res.send({ friendUserDB });

        } else {
            throw new Error("Can't add yourself to friend list");
        }
    } catch (error) {
        res.send({ error: error.message });
    }
}

export async function getFriends(req: express.Request, res: express.Response) {
    try {
        const { userDB } = req.body;
        if (!userDB) throw new Error("Couldn't get userDB from req.body");

        const userFriendsDB = await UserFriendModel.find({ 'user.username': userDB.username });
        if (userFriendsDB.length === 0) throw new Error(`This user doesn't have friends :(`);

        res.send({ userFriendsDB });
    } catch (error) {
        res.send({ error: error.message });
    }
}

export async function deleteFriend(req: express.Request, res: express.Response) {
    try {
        const { friendUsername, username } = req.body;

        if
            (
            await UserFriendModel.deleteOne({ 'friend.username': friendUsername, 'user.username': username }) &&
            await UserFriendModel.deleteOne({ 'friend.username': username, 'user.username': friendUsername })
        ) {
            res.send({ 'succses': true });
        } else {
            res.send({ 'succses': false });
        }
    } catch (error) {
        res.send({ error: error.message });
    }
}

export async function getSharedRoomId(req: express.Request, res: express.Response) {
    try {
        const { friendUsername, userDB } = req.body;
        if (!friendUsername || !userDB) throw new Error("Couldn't reiceve friendUsername or userDB wasn't found in req.body");

        const userFriendDB = await UserFriendModel.findOne({ 'friend.username': friendUsername, 'user.username': userDB.username });
        if (!userFriendDB) throw new Error(`Couldn't find user with username ${userDB.usernmae}, and a friend with username: ${friendUsername}`);

        const { sharedRoomId } = userFriendDB;

        res.send({ sharedRoomId });
    } catch (error) {
        res.send({ error: error.message });
    }
}

export async function getFriendByRoomId(req: express.Request, res: express.Response) {
    try {
        const { userDB, roomId } = req.body;
        if (!userDB || !roomId) throw new Error("Couldn't reiceve userDB or roomId from req.body");

        const friendDB = await UserFriendModel.findOne({ 'user.username': userDB.username, 'sharedRoomId': roomId });
        if (!friendDB) throw new Error(`Couldn't find user with username: ${userDB.username} and share room id  of: ${roomId}.`);

        const { friend } = friendDB;

        res.send ({ friend });

    } catch (error) {
        res.send({ error: error.message });
    }
}