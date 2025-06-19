const User = require("../models/user");
const jwt = require("jsonwebtoken");
const createToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };
    const options = { expiresIn: "20m" };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if username is taken
        const existingName = await User.findOne({ name });
        if (existingName) {
            return res.status(400).json({ message: "Username already taken" });
        }

        // Check if email is taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create the user
        const user = await User.create({ name, email, password });

        // Create token
        const token = createToken(user);

        // Send response
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};


const login = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = createToken(user);

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        next(error);
        return res.status(500).json({ message: "Internal Server Error", Error: error })
    }
};
const userProfile = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
};



module.exports = {
    register,
    login,
    userProfile
}