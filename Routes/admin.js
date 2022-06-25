const router = require("express").Router();
const UploadPage = require("../Models/UploadPage");
const user = require("../Models/User");
const { fetchAdmin, fetchApprovedUser } = require("../middleware/fetchUser.js");
const Subject = require("../Models/Subjects");

const File = router.get("/files", async (req, res) => {
    try {
        let TempUploadPage = await UploadPage.find();
        // console.log(TempUploadPage);
        res.status(200).json(TempUploadPage);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }
});

const Users = router.get("/users",fetchAdmin, async (req, res) => {
    try {
        let TempUser = await user.find();
        // console.log(TempUser);
        res.status(200).json(TempUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }
});
const Subjects = router.get("/subjects",fetchAdmin, async (req, res) => {
    try {
        let TempUser = await Subject.find();
        // console.log(TempUser);
        res.status(200).json(TempUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }
});

const ApproveSub = router.put("/subject", fetchAdmin, async (req, res) => {
    const { id, isApproved } = req.body;
    try {
        await Subject.findOneAndUpdate(
            { _id: id },
            { $set: { approved: isApproved } }
        );
        const tempSubject = await Subject.findOne({ _id: id });

        res.status(200).json(tempSubject);
    } catch (error) {
        res.status(500).send("Internal server error!");
        console.error(error.message);
    }
});

const ApproveFile = router.put("/file", fetchAdmin, async (req, res) => {
    const { id, isApproved } = req.body;
    try {
        await UploadPage.findOneAndUpdate(
            { _id: id },
            { $set: { approved: isApproved } }
        );
        const tempfile = await UploadPage.findOne({ _id: id });
        // console.log(tempfile);
        // const isSuccessfull = tempfile.approved; // De-structuring
        res.status(200).json(tempfile);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error!");
        console.error(error.message);
    }
});

const ApproveUser = router.put("/user", fetchApprovedUser, async (req, res) => {
    const { id, isApproved } = req.body;
    try {
        await user.findOneAndUpdate(
            { _id: id },
            { $set: { approved: isApproved } }
        );
        const tempUser = await user.findOne({ _id: id });
        const isSuccessfull = isApproved===tempUser.approved; // De-structuring
        res.status(200).json(tempUser);
    } catch (error) {
        res.status(500).send("Internal server error!");
        console.error(error.message);
    }
});

module.exports = router;
