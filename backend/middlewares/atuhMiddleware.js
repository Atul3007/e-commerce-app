const jwt = require("jsonwebtoken");
const { userModel } = require("../models/userModel");
let user_id;

const requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
       user_id = decoded.id;
       next();
   }

  } catch (error) {
    res.status(400).json({ message: "error in auth-middleware" });
    console.log("error in auth-middleware");
  }
};

const checkRole = async (req, res, next) => {
  try {
    const users = await userModel.findById({_id:user_id});
    if(users.role==='user'){
        res.status(200).json({message:"Not a admin"})
    }else{
        next();
    }
    next();
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  requireSignin,
  checkRole,
};
