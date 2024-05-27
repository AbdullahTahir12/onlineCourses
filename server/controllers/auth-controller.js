const User = require("../models/user-model");

const home = async (req, res) => {
  try {
    res.status(200).send("welcome to home router page");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ msg: "user already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });
    res.status(200).json({
      message: "User Created Successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    // console.log(userExist);
    if (!userExist) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const user = await userExist.comparePassword(password);
    if (user) {
      res.status(200).json({
        message: "login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({
        message: "invalid email or password",
      });
    }
  } catch (err) {
    // res.status(500).json({ message: "Login Error" });
    next(err);
  }
};

const user = async (req, res, next) => {
  try {
    const userData = req.user;
    console.log("auth controller", userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

module.exports = { home, register, login, user };
