const express = require("express");
const router = express.Router();
const { Frameworks } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

/**
 * Rota para obter todos os Frameworks.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - Lista de todos os frameworks ou mensagem de erro.
 */
router.get("/", validateToken, async (req, res) => {
  try {
    const allFrameworks = await Frameworks.findAll();
    res.json(allFrameworks);
  } catch (error) {
    console.error("Error getting all Frameworks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Rota para obter um Framework por id.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - Framework correspondente ao Id fornecido ou mensagem de erro.
 */
router.get("/byId/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const frameworkbyId = await Frameworks.findByPk(id);
    res.json(frameworkbyId);
  } catch (error) {
    console.error("Error getting Framework by id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Rota para criar um Framework.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - O framework criado ou mensagem de erro.
 */
router.post("/", validateToken, async (req, res) => {
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
