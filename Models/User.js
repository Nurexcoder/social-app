const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username:{
            type: String,
            required: true,
            unique:true
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true,
        },
        profilePic:{
            type:String,
        },
        followers:{
            type:Array,
            default:[]
          },
          followings:{
            type:Array,
            default:[]
          },
          resetLink:{
            type:String
          }
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("User", UserSchema);
