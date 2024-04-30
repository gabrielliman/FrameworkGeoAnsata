const express = require('express');
const router = express.Router();
const { SubSections } = require("../models");

// Get SubSections by Section
router.get("/:sectionId", async (req, res) => {
    try {
        const sectionId = req.params.sectionId;
        const SubSectionsBySection = await SubSections.findAll({
            where: {
                SectionID: sectionId
            }
        });
        res.json(SubSectionsBySection);
    } catch (error) {
        console.error("Error getting SubSections by Section:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get SubSection by Id
router.get("/byId/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const subsectionbyId = await SubSections.findByPk(id);
        res.json(subsectionbyId);
    } catch (error) {
        console.error("Error getting SubSection by Id:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Create SubSection
router.post("/", async (req, res) => {
    try {
        const subsection = req.body;
        await SubSections.create(subsection);
        res.json(subsection);
    } catch (error) {
        console.error("Error creating SubSection:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
