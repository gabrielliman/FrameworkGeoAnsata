const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');


const {sign} = require('jsonwebtoken')


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
    const acessToken = sign({Username: user.Username, ID: user.ID, Email: user.Email},secretOrPrivateKey=process.env.SECRET_KEY, {expiresIn: "15m"});
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

module.exports = router;
