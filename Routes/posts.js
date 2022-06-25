const multer = require("multer");
const { validationResult } = require("express-validator");
const router = require("express").Router();
const {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
} = require("firebase/storage");
// const {storageRef}=require('firebase')

const Posts = require("../Models/Posts");
const storage = getStorage();

// 'file' comes from the Blob or File API

const { fetchUser, fetchAdmin } = require("../middleware/fetchUser");
const User = require("../Models/User");
// const router = express.router()

const Upload = router.post(
    "/",
    [fetchUser, multer().single("file")],
    async (req, res) => {
        try {
            let metadata = {
                contentType: req.file.mimetype,
                name: req.file.originalname,
            };
            // storage.put(req.file.buffer, metadata);
            // }
            const storageRef = ref(storage, `${req.file.originalname}`);
            const snapshot = await uploadBytes(
                storageRef,
                req.file.buffer,
                metadata
            );
            const downloadUrl = await getDownloadURL(snapshot.ref);

            const UploadData = await Posts.create({
                img: downloadUrl,
                title: req.body.title,
                desc: req.body.desc,
                createdBy: req.user.id,
            });
            res.status(200).json(UploadData);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error!");
        }
    }
);

const File = router.get("/", fetchUser, async (req, res) => {
    try {
        console.log("Hi");
        // console.clear();
        const { page = 1, limit = 5 } = req.query;
        console.log(req.user.id);
        const params = req.query;
        const tempFollowings = await User.find(
            { _id: req.user.id },
            "followings"
        );
        let followings = tempFollowings[0].followings;
        console.log(followings);
        // const posts=await Posts.find({'createdBy':{$elemMatch:{}}})
        let followedUsersPosts = await Posts.find({
            createdBy: { $in: followings },
        })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        console.log(followedUsersPosts);
        const posts=followedUsersPosts
        posts.forEach((post, i,arr) => {
            console.log(arr)
            arr[i]["likes"] =
            posts[i].likedBy.length;
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }
});

module.exports = router;
