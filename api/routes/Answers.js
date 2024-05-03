const express = require("express");
const router = express.Router();
const { Answers } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

// Get Answers by Instance and Question
router.get("/:instanceId/:questionId", validateToken, async (req, res) => {
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
router.get("/byId/:id", validateToken, async (req, res) => {
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
router.post("/", validateToken, async (req, res) => {
  try {
    const answersList = req.body; // Recebe a lista de objetos de entrada

    const updatedAnswers = [];
    for (const answerData of answersList) {
      // Procura uma resposta com o mesmo InstanceID e QuestionID
      const existingAnswer = await Answers.findOne({
        where: {
          InstanceID: answerData.InstanceID,
          QuestionID: answerData.QuestionID,
        },
      });

      if (existingAnswer) {
        // Atualiza a resposta existente
        await Answers.update(answerData, {
          where: {
            InstanceID: answerData.InstanceID,
            QuestionID: answerData.QuestionID,
          },
        });
        updatedAnswers.push(existingAnswer);
      } else {
        // Cria uma nova resposta
        const newAnswer = await Answers.create(answerData);
        updatedAnswers.push(newAnswer);
      }
    }

    res.json(updatedAnswers);
  } catch (error) {
    console.error("Error creating or updating Answer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
