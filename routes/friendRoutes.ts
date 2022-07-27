import express from 'express';
import { addFriend, getFriends } from '../controllers/friendsCtrl';
const router: express.Router = express.Router();

router
    .post('/add-friend', addFriend)
    .post('/get-friends', getFriends)

export default router;