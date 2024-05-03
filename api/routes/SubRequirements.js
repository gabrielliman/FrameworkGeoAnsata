const express = require("express");
const router = express.Router();
const { SubRequirements } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

// Get SubRequirements by Requirement
router.get("/:requirementId", validateToken, async (req, res) => {
  try {
    const requirementId = req.params.requirementId;
    const SubRequirementsByRequirement = await SubRequirements.findAll({
      where: {
        RequirementID: requirementId,
      },
    });
    res.json(SubRequirementsByRequirement);
  } catch (error) {
    console.error("Error getting SubRequirements by Requirement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get SubRequirement by Id
router.get("/byId/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const subrequirementsbyId = await SubRequirements.findByPk(id);
    res.json(subrequirementsbyId);
  } catch (error) {
    console.error("Error getting SubRequirement by Id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create SubRequirement
router.post("/", validateToken, async (req, res) => {
  try {
    const subrequirements = req.body;
    await SubRequirements.create(subrequirements);
    res.json(subrequirements);
  } catch (error) {
    console.error("Error creating SubRequirement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
