import express from "express";
import {
    acceptFriend,
    searchUsers,
    sendRequest,
    showAllFriends,
} from "../Controllers/friendsController.js";
import { protect } from "../Middlewares/authMiddleware.js";

//Router init
const router = express.Router();

//HTTP Methods
router.get("/show-friends", protect, showAllFriends);
router.get("/search-friends", protect, searchUsers);
router.post("/send-request/:id", protect, sendRequest);
router.post("/accept-request/:id", protect, acceptFriend);

//Export
export default router;
