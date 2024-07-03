const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');
const {sign} = require('jsonwebtoken');
const { validateToken } = require("../middlewares/AuthMiddlewares");


router.get("/:frameworkId/:userId", async (req, res) => {
  const frameworkId = req.params.frameworkId;
  const userId = req.params.userId;
  const InstancesByFrameworkandUser = await Instances.findAll({
    where: {
      FrameworkID: frameworkId,
      UserID: userId,
    },
  });
  res.json(InstancesByFrameworkandUser);
});

router.post("/", async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);
    const existingUser = await Users.findAll({
      where: {
        [Op.or]: [{ Username: Username }, { Email: Email }],
      },
    });
    if (existingUser.length > 0) {
      res.json({ error: "Username or email already exists" });
      return; // Exit the function to avoid further processing
    }else{
    await Users.create({
      Username: Username,
      Email: Email,
      Password: hashedPassword,
    });
    res.json({ confirmation: "User Created" });
  };
  } catch (error) {
    res.json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const user = await Users.findOne({ where: { Username: Username } });

    if (!user) {
      return res.json({ error: "User Doesn't Exist" });
    }

    const match = await bcrypt.compare(Password, user.Password);

    if (!match) {
      return res.json({ error: "Wrong Username And Password Combination" });
    }

    //JWT
    const acessToken = sign({Username: user.Username, ID: user.ID, Email: user.Email, Admin: user.IsAdministrator},secretOrPrivateKey=process.env.SECRET_KEY);
    res.cookie("accessToken", acessToken,{
      maxAge: 1000*60*60*24*30,
      httpOnly: true
    });
     return res.json({ confirmation: "YOU LOGGED IN!!!" });

     
  } catch (error) {
    console.error("Error logging in:", error);
    return res.json({ error: "Internal server error" });
  }
});


router.post("/logout", async (req, res) => {
  try{
  res.clearCookie("accessToken");
  res.json({ message: "Logged out successfully" });
}
catch(error){
  console.error("Error Logging out")
}});

router.get("/me", validateToken, async (req, res) => {
  try {
    const userId = req.user.ID;
    const user = await Users.findByPk(userId, {
      attributes: ["Username", "Email", "IsAdministrator"],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user info:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
