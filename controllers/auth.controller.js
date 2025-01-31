const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Convert email and username to lowercase to prevent duplicate issues
        const normalizedEmail = email.toLowerCase();
        const normalizedUsername = username.toLowerCase();

        // Check if username or email already exists
        const existingUser = await User.findOne({ where: { username: normalizedUsername } });
        if (existingUser) {
            return res.status(400).json({ error: "Username is already taken." });
        }

        const existingEmail = await User.findOne({ where: { email: normalizedEmail } });
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already registered." });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            username: normalizedUsername,
            email: normalizedEmail,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ensure email is lowercase to avoid case-sensitive login issues
        const normalizedEmail = email.toLowerCase();

        // Find user in the database
        const user = await User.findOne({ where: { email: normalizedEmail } });

        if (!user) {
            return res.status(401).json({ error: "User not found." });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        // Ensure JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing in .env!");
            return res.status(500).json({ error: "Server error: JWT_SECRET is not set" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ["id", "username", "email", "createdAt"]
        });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.json(user);
    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.logout = async (req, res) => {
    // Logout is usually handled on the client by deleting the JWT token
    res.json({ message: "User logged out successfully" });
};
