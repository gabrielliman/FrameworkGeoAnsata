const express = require('express');
const router = express.Router();
const { Requirements } = require("../models");

// Get Requirements by SubSection
router.get("/:subsectionId", async (req, res) => {
    try {
        const subsectionId = req.params.subsectionId;
        const RequirementsBySubSection = await Requirements.findAll({
            where: {
                SubSectionID: subsectionId
            }
        });
        res.json(RequirementsBySubSection);
    } catch (error) {
        console.error("Error getting Requirements by SubSection:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get Requirement by Id
router.get("/byId/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const requirementsbyId = await Requirements.findByPk(id);
        res.json(requirementsbyId);
    } catch (error) {
        console.error("Error getting Requirement by Id:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Create Requirement
router.post("/", async (req, res) => {
    try {
        const requirements = req.body;
        await Requirements.create(requirements);
        res.json(requirements);
    } catch (error) {
        console.error("Error creating Requirement:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
