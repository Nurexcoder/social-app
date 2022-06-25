const mongoose = require('mongoose');
require("dotenv/config");
mongoose_URI = process.env.DB_KEY;
mongoConnect = async () => {
    try {
        await mongoose.connect(mongoose_URI, () => {
            console.log("Connected to mongo Successfully!")
        });
    } catch (error) {
        console.error()
    }

}
module.exports = mongoConnect