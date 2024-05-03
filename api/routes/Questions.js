const express = require("express");
const router = express.Router();
const { Questions } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

// Get Questions by SubRequirement
router.get("/:subrequirementId", validateToken, async (req, res) => {
  try {
    const subrequirementId = req.params.subrequirementId;
    const QuestionsBySubRequirement = await Questions.findAll({
      where: {
        SubRequirementID: subrequirementId,
      },
    });
    res.json(QuestionsBySubRequirement);
  } catch (error) {
    console.error("Error getting Questions by SubRequirement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Questions by ReferenceQuestion
router.get(
  "/byReferenceQuestion/:referencequestionId",
  validateToken,
  async (req, res) => {
    try {
      const referencequestionId = req.params.referencequestionId;
      const QuestionsByReferenceQuestion = await Questions.findAll({
        where: {
          ReferenceQuestionID: referencequestionId,
        },
      });
      res.json(QuestionsByReferenceQuestion);
    } catch (error) {
      console.error("Error getting Questions by ReferenceQuestion:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get Question by Id
router.get("/byId/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const questionsbyId = await Questions.findByPk(id);
    res.json(questionsbyId);
  } catch (error) {
    console.error("Error getting Question by Id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create Question
router.post("/", validateToken, async (req, res) => {
  try {
    const question = req.body;
    await Questions.create(question);
    res.json(question);
  } catch (error) {
    console.error("Error creating Question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
