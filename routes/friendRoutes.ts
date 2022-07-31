import express from 'express';
import { addFriend, getFriends, deleteFriend } from '../controllers/friendsCtrl';
const router: express.Router = express.Router();

router
    .post('/add-friend', addFriend)
    .post('/get-friends', getFriends)
    .delete("/delete-friend", deleteFriend)
export default router;