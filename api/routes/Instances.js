const express = require("express");
const router = express.Router();
const { Instances } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

/**
 * Rota para obter instâncias por Framework e Usuário.
 *
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 *
 * @returns {Object} - Lista de instâncias filtradas por Framework e Usuário ou mensagem de erro.
 */
router.get("/:frameworkId", validateToken, async (req, res) => {
  try {
    const userId = req.user.ID;
    const frameworkId = req.params.frameworkId;
    const InstancesByFrameworkandUser = await Instances.findAll({
      where: {
        FrameworkID: frameworkId,
        UserID: userId,
      },
    });
    res.json(InstancesByFrameworkandUser);
  } catch (error) {
    console.error("Error getting Instances by Framework and User:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Rota para obter uma instância por id.
 *
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 *
 * @returns {Object} - Instância correspondente ao Id fornecido ou mensagem de erro.
 */
router.get("/byId/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const instancebyId = await Instances.findByPk(id);
    res.json(instancebyId);
  } catch (error) {
    console.error("Error getting Instance by Id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Rota para criar uma instância.
 *
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 *
 * @returns {Object} - A instância criada ou mensagem de erro.
 */
router.post("/", validateToken, async (req, res) => {
  try {
    const userId = req.user.ID;
    const instance = { ...req.body, UserID: userId };
    await Instances.create(instance);
    res.json(instance);
  } catch (error) {
    console.error("Error creating Instance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
