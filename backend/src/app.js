const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");

// global middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// check route
app.get("/", (req,res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to OneVote API",
    });
});

app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;