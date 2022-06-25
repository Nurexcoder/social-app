const express = require("express");
const cors = require("cors");
require("dotenv/config");
const mongoConnect = require("./db");
const fireApp = require("./firebaseAuth");

const authRoute = require("./Routes/auth");
const postsRoute = require("./Routes/posts");
const usersRoute = require("./Routes/users");
// const subjectsRoute = require("./Routes/Subjects");
// const adminRoute = require("./Routes/admin");

const app = express();


mongoConnect();
app.use(express.json()); 
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use("/auth", authRoute);
app.use("/posts", postsRoute);
app.use("/users", usersRoute);
// app.use("/admin", adminRoute);
// app.use("/subjects", subjectsRoute);


app.use("/", (req, res) => {
    res.send("Hi I am ON");
});

app.listen(PORT, () =>
    console.log(`Server Running on Port: http://localhost:${PORT}`)
);
