import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";

// @desc    Show All Friends
// @route   POST /api/v1/users/friends/show-friends
// @access  Private
const showAllFriends = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate(
            "friends",
            "name email"
        );

        if (user) {
            const friendsList = user.friends;

            res.status(200).json({
                success: true,
                message: "Friends List Generated",
                data: { count: friendsList.length, friends: friendsList },
            });
        } else {
            res.status(400).json({
                success: false,
                message: "User does not exists!",
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

// @desc    Search for users
// @route   POST /api/v1/users/friends/search-friends
// @access  Private
const searchUsers = asyncHandler(async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please provide a name to search",
            });
        }

        const users = await User.find({
            name: { $regex: name, $options: "i" },
        }).select("name email");

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found with that name",
            });
        }

        res.status(200).json({
            success: true,
            message: "Search done",
            data: { users },
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});

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
                message: "Friend request sent!",
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

// @desc    Accept friend request
// @route   POST /api/v1/users/friends/accept-request
// @access  Private
const acceptFriend = asyncHandler(async (req, res) => {
    try {
        const user = req.user._id;

        const { targetUser } = req.params;

        const reqSentUser = await User.findById(targetUser);
        const reqAcceptUser = await User.findById(user);

        if (reqAcceptUser && reqSentUser) {
            reqAcceptUser.friends.push(reqSentUser);
            reqSentUser.friends.push(reqAcceptUser);

            //Removing request from the reqSentUser's document
            reqSentUser.friendRequests = reqSentUser.friendRequests.filter(
                (requestId) => requestId.toString() != reqAcceptUser
            );

            await reqAcceptUser.save();
            await reqSentUser.save();

            res.status(200).json({
                success: true,
                message: "Friend Request Accepted!",
            });
        } else {
            res.status(400).json({
                success: false,
                message: "User does not exists",
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, err: err.message });
    }
});
export { showAllFriends, searchUsers, sendRequest, acceptFriend };
