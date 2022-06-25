const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { fetchUser } = require("../middleware/fetchUser");
const Posts = require("../Models/Posts");
// const { async } = require("@firebase/util");
require("dotenv/config");

const JWT_SEC = process.env.JWT_SEC;

router.get("/", fetchUser, async (req, res) => {
    console.log(req.query);

    try {
        let users;
        if (req.query.username) {
            users = await User.find({
                username: { $regex: req.query.username, $options: "i" },
            });

            console.log(users);
        } else {
            users = await User.find();
            // .limit(limit * 1)
            // .skip((page - 1) * limit)
            // .exec();
            // res.status(200).json(users);
        }
        res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal error occured");
    }
});
router.put("/follow/:id", fetchUser, async (req, res) => {
    try {
        // console.log(req.user);
        console.log(req.params);

        const curUser = await User.findById(req.user.id);
        const isFollowed = curUser.followings.some(
            (id) => id === req.params.id
        );
        if (isFollowed) {
            return res.status(400).send("Already followed");
        }
        await User.findByIdAndUpdate(req.params.id, {
            $push: { followers: req.user.id },
        });
        await User.findByIdAndUpdate(req.user.id, {
            $push: { followings: req.params.id },
        });

        res.status(200).json("Following complete");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went error");
    }
});
router.put("/like/:id", fetchUser, async (req, res) => {
    try {
        console.log(req.user.id);
        const post = await Posts.findById(req.params.id);
        console.log(post);
        if (post.likedBy.length!==0) {
            console.log("Hi");
            const isLiked = post.likedBy.includes(req.user.id);
            console.log(isLiked);
            if (isLiked) {
                return res.status(400).send("Already liked");
            }
        }
        console.log("HEkko");

        await Posts.findByIdAndUpdate(req.params.id, {
            $push: { likedBy: req.user.id },
        });
        console.log("Hkko");
        res.status(200).send("Post Liked");
    } catch (error) {}
});
module.exports = router;
