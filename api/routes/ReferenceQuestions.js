const express = require("express");
const router = express.Router();
const { ReferenceQuestions } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

// Get All ReferenceQuestions
router.get("/", validateToken, async (req, res) => {
  try {
    const allReferenceQuestions = await ReferenceQuestions.findAll();
    res.json(allReferenceQuestions);
  } catch (error) {
    console.error("Error getting all ReferenceQuestions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get ReferenceQuestion by id
router.get("/byId/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const referencequestionbyId = await ReferenceQuestions.findByPk(id);
    res.json(referencequestionbyId);
  } catch (error) {
    console.error("Error getting ReferenceQuestion by id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create ReferenceQuestion
router.post("/", validateToken, async (req, res) => {
  try {
    const referencequestion = req.body;
    await ReferenceQuestions.create(referencequestion);
    res.json(referencequestion);
  } catch (error) {
    console.error("Error creating ReferenceQuestion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get ReferenceQuestions by Questions list
router.post("/byIds", validateToken, async (req, res) => {
  try {
    const requestData = req.body;
    const referenceQuestionIds = requestData.map(
      (item) => item.ReferenceQuestionID
    );
    const referenceQuestions = await ReferenceQuestions.findAll({
      where: {
        ID: referenceQuestionIds,
      },
    });
    res.json(referenceQuestions);
  } catch (error) {
    console.error("Error getting ReferenceQuestions by IDs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
