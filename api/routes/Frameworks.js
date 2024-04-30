const express = require('express');
const router = express.Router();
const { Frameworks } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

// Get All Frameworks
router.get("/",validateToken, async (req, res) => {
  try {
    const allFrameworks = await Frameworks.findAll();
    res.json(allFrameworks);
  } catch (error) {
    console.error("Error getting all Frameworks:", error);
    res.status(500).json({ error: "Internal server error" });
  }}
);

// Get Framework by id
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const frameworkbyId = await Frameworks.findByPk(id);
    res.json(frameworkbyId);
  } catch (error) {
    console.error("Error getting Framework by id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create Framework
router.post("/", async (req, res) => {
  try {
    const framework = req.body;
    await Frameworks.create(framework);
    res.json(framework);
  } catch (error) {
    console.error("Error creating Framework:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
