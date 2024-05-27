const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Invalid or missing token" });
  }

  const jwtToken = authHeader.replace("Bearer ", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    if (!userData) {
      console.log("msg from middleware");
      return res.status(404).json({ message: "User not found" });
    }

    req.token = jwtToken;
    req.user = userData;
    req.userID = userData._id;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Unauthorized token" });
  }
};

module.exports = authMiddleware;
