const express = require("express");
const router = express.Router();
const { Requirements } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

/**
 * Rota para obter requisitos por SubSection.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - Lista de requisitos filtrados por SubSection ou mensagem de erro.
 */
router.get("/:subsectionId", validateToken, async (req, res) => {
  try {
    const subsectionId = req.params.subsectionId;
    const RequirementsBySubSection = await Requirements.findAll({
      where: {
        SubSectionID: subsectionId,
      },
    });
    res.json(RequirementsBySubSection);
  } catch (error) {
    console.error("Error getting Requirements by SubSection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Rota para obter um requisito por id.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - Requisito correspondente ao Id fornecido ou mensagem de erro.
 */
router.get("/byId/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const requirementsbyId = await Requirements.findByPk(id);
    res.json(requirementsbyId);
  } catch (error) {
    console.error("Error getting Requirement by Id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Rota para criar um requisito.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - O requisito criado ou mensagem de erro.
 */
router.post("/", validateToken, async (req, res) => {
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
