const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.registerUser = async (username, email, password) => {
    try {
        email = email.toLowerCase();

        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("Email is already in use.");
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = await User.create({ username, email, password: hashedPassword });

        return newUser;
    } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
    }
};

exports.loginUser = async (email, password) => {
    try {
        email = email.toLowerCase();

        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error("User not found.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Wrong password.");
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return token;
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
};

exports.getUserProfile = async (userId) => {
    return await User.findByPk(userId, {
        attributes: ["id", "username", "email", "createdAt"]
    });
};

exports.logoutUser = () => {
    return { message: "User logged out successfully" };
};
