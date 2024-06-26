const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")


require("dotenv").config();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");

const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT

database.connect();

console.log("connection established ")

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your Server is up and running ",
    });
});

//db connect 

//middlewares 
app.use(express.json());
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your Server is up and running ",
    });
});

//server activate
app.listen(PORT, () => {
    console.log(`App is running at PORT ${PORT}`);
});

console.log("connection established through middlewares")