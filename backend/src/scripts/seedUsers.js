require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const User = require("../models/User");

const seedUsers = async () => {
    try {
        await connectDB();

        // Remove existing users
        await User.deleteMany();

        // Hash passwords
        const adminPassword = await bcrypt.hash("admin123", 10);
        const studentPassword1 = await bcrypt.hash("09122004", 10);
        const studentPassword2 = await bcrypt.hash("15032005", 10);
        const studentPassword3 = await bcrypt.hash("20112004", 10);

        // Create users
        await User.insertMany([
            {
                name: "Admin",
                rollNumber: "ADMIN001",
                email: "admin@onevote.com",
                password: adminPassword,
                department: "Administration",
                year: 1,
                role: "Admin",
            },
            {
                name: "Harleen Kaur",
                rollNumber: "23DSE001",
                email: "harleen@college.edu",
                password: studentPassword1,
                department: "Data Science",
                year: 3,
                role: "Student",
            },
            {
                name: "Aman Sharma",
                rollNumber: "23CSE015",
                email: "aman@college.edu",
                password: studentPassword2,
                department: "Computer Science",
                year: 3,
                role: "Student",
            },
            {
                name: "Priya Singh",
                rollNumber: "23ECE022",
                email: "priya@college.edu",
                password: studentPassword3,
                department: "Electronics",
                year: 3,
                role: "Student",
            },
        ]);

        console.log("Users seeded successfully!");

        process.exit();
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

seedUsers();