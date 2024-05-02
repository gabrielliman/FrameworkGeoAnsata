const express = require("express");
const router = express.Router();
const { Instances } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");


// Get Instances by Framework && User
router.get("/:frameworkId",validateToken, async (req, res) => {
  try {
    const userId = req.user.ID;
    const frameworkId = req.params.frameworkId;
    const InstancesByFrameworkandUser = await Instances.findAll({
      where: {
        FrameworkID: frameworkId,
        UserID: userId,
      },
    });
    res.json(InstancesByFrameworkandUser);
  } catch (error) {
    console.error("Error getting Instances by Framework and User:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Instance by Id
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const instancebyId = await Instances.findByPk(id);
    res.json(instancebyId);
  } catch (error) {
    console.error("Error getting Instance by Id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create Instance
router.post("/", async (req, res) => {
  try {
    const instance = req.body;
    await Instances.create(instance);
    res.json(instance);
  } catch (error) {
    console.error("Error creating Instance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
