import express from 'express';
import { addFriend, getFriends, deleteFriend, getSharedRoomId } from '../controllers/friendsCtrl';
const router: express.Router = express.Router();

router
    .post('/add-friend', addFriend)
    .post('/get-friends', getFriends)
    .post('/get-sharedRoomId', getSharedRoomId)
    .delete('/delete-friend', deleteFriend)
export default router;