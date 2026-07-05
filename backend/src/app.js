const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

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

module.exports = app;