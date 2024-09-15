import express from "express";
import { sendRequest } from "../Controllers/friendsController";

//Router init
const router = express.Router();

//HTTP Methods
router.post("/send-request", protect, sendRequest);

//Export
export default router;
