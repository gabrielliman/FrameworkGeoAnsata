const express = require("express");
const router = express.Router();
const { ReferenceQuestions } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

/**
 * Rota para obter todas as ReferenceQuestions.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - Lista de todas as ReferenceQuestions ou mensagem de erro.
 */
router.get("/", validateToken, async (req, res) => {
  try {
    const allReferenceQuestions = await ReferenceQuestions.findAll();
    res.json(allReferenceQuestions);
  } catch (error) {
    console.error("Error getting all ReferenceQuestions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Rota para obter uma ReferenceQuestion por id.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - ReferenceQuestion correspondente ao Id fornecido ou mensagem de erro.
 */
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

/**
 * Rota para criar uma ReferenceQuestion.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - A ReferenceQuestion criada ou mensagem de erro.
 */
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

/**
 * Rota para obter ReferenceQuestions por lista de IDs.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - Lista de ReferenceQuestions filtradas pelos IDs fornecidos ou mensagem de erro.
 */
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
