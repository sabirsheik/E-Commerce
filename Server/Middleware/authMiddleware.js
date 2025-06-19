const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Bad Request! Token is required" });
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token", error: err.message });
      }

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user;      
      req.userId = user._id;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: No Token Provided" });
  }
};

const checkRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized: Admin role required" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Admin role check failed", error: error.message });
  }
};

module.exports = {
  auth,
  checkRole,
};
