import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";

// @desc    Send friend request
// @route   POST /api/v1/users/friends/send-request
// @access  Private
const sendRequest = asyncHandler(async (req, res) => {
    try {
        const user = req.user._id;

        const { userId } = req.params;

        const targetUser = await User.findById(user);

        if (targetUser) {
            targetUser.friendRequests.push(userId);
            await targetUser.save();
            res.status(200).json({
                success: true,
                message: "Friend request sent.",
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

export { sendRequest };
