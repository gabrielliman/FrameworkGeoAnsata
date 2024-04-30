const express = require("express");
const router = express.Router();
const { Answers } = require("../models");

// Get Answers by Instance and Question
router.get("/:instanceId/:questionId", async (req, res) => {
  try {
    const instanceId = req.params.instanceId;
    const questionId = req.params.questionId;
    const AnswersByInstanceAndQuestion = await Answers.findAll({
      where: {
        InstanceID: instanceId,
        QuestionID: questionId,
      },
    });
    res.json(AnswersByInstanceAndQuestion);
  } catch (error) {
    console.error("Error getting Answers by Instance and Question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Answer by Id
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const answerById = await Answers.findByPk(id);
    res.json(answerById);
  } catch (error) {
    console.error("Error getting Answer by Id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create Answer
router.post("/", async (req, res) => {
  try {
    const answer = req.body;
    await Answers.create(answer);
    res.json(answer);
  } catch (error) {
    console.error("Error creating Answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
