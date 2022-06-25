const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            unique:true
        },
        year: {
            type: Number,
            required: true,
        },
        semester: {
            type: Number,
            required: true
        },
        approved: {
            type: Boolean,
            default: null
        },
        createdBy: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Subject", SubjectSchema)