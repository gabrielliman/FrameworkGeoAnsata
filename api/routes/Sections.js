const express = require("express");
const router = express.Router();
const { Sections } = require("../models");

// Get Sections by Framework
router.get("/:frameworkId", async (req, res) => {
  try {
    const frameworkId = req.params.frameworkId;
    const SectionsByFramework = await Sections.findAll({
      where: {
        FrameworkID: frameworkId,
      },
    });
    res.json(SectionsByFramework);
  } catch (error) {
    console.error("Error getting Sections by Framework:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Section by Id
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sectionbyId = await Sections.findByPk(id);
    res.json(sectionbyId);
  } catch (error) {
    console.error("Error getting Section by Id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create Section
router.post("/", async (req, res) => {
  try {
    const section = req.body;
    await Sections.create(section);
    res.json(section);
  } catch (error) {
    console.error("Error creating Section:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
