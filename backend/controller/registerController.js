const { userModel } = require("./../models/userModel");
const { hashpass, comparePass } = require("../helper/authHelper");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, address, role, question } = req.body;
    // console.log('req.body', req.body)
    if (
      !name ||
      !email | !phone ||
      !password ||
      !address ||
      !role ||
      !question
    ) {
      res.send({ error: "All fields required" });
    } else {
      const uniqueEmail = await userModel.findOne({ email });
      if (uniqueEmail) {
        res.send({
          message: "All ready registered, Please login",
        });
      } else {
        const hashPassword = await hashpass(password);
        const newUserData = new userModel({
          name,
          email,
          phone,
          password: hashPassword,
          address,
          role,
          question,
        });
        await newUserData.save();

        res.status(201).json({ message: "data inserted successfully" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in registration",
      sucess: false,
    });
  }
};

//login
const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(200).json({ message: "email,password required" });
  } else {
    const user = await userModel.findOne({ email });
    const compare = await comparePass(password, user.password);
    //console.log(user)
    if (compare) {
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ id: user._id }, jwtSecretKey);
      res.status(200).json({ message: "login success", token, user });
    } else {
      res.status(400).json({ message: "login failed" });
    }
  }
};

//forgot
const forgotpassController = async (req, res) => {
  const { email, question, password } = req.body;
  try {
    if (!email || !question) {
      res.status(400).json({ message: "all fields required" });
    } else {
      const user = await userModel.findOne({ email });
      if (user.email == email && user.question == question) {
        const hashPassword = await hashpass(password);
        const updatePass = await userModel.findByIdAndUpdate(user._id, {
          password: hashPassword,
        });
        res.status(200).json({ message: "password changed successfully" });
      } else {
        res.status(400).json({ message: "error in changing password" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "error in changing password" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id,name, address, email, phone, password, role } = req.body;
    //console.log(req.body);
    if (!email || !name || !address || !phone || !password) {
      res.status(400).json({ message: "all fields required" });
    } else {
    const hashPassword = await hashpass(password);
    const newProfile = await userModel.findByIdAndUpdate(id, {
      name,
      address,
      email,
      phone,
      password:hashPassword,
      role,
    },{new:true});
    res.status(200).json({ message: "profile updated successfully",newProfile });
  }
  } catch (error) {
    res.status(500).json({ message: "error in updating profile" });
  }
};

module.exports = {
  updateProfile,
  forgotpassController,
  registerController,
  loginController,
};
