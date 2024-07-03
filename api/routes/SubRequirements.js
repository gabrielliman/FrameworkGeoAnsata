const express = require("express");
const router = express.Router();
const { SubRequirements } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

/**
 * Rota para obter todos os SubRequisitos associados a um Requisito específico.
 * 
 * @param {Object} req - O objeto de solicitação (request) contendo o ID do Requisito.
 * @param {Object} res - O objeto de resposta (response) que retorna um array de SubRequisitos relacionados ao Requisito.
 * 
 * @returns {Array} - Um array contendo todos os SubRequisitos relacionados ao Requisito especificado.
 *                   Retorna erro interno do servidor em caso de falha na consulta.
 */
router.get("/:requirementId", validateToken, async (req, res) => {
  try {
    const requirementId = req.params.requirementId;
    const SubRequirementsByRequirement = await SubRequirements.findAll({
      where: {
        RequirementID: requirementId,
      },
    });
    res.json(SubRequirementsByRequirement);
  } catch (error) {
    console.error("Error getting SubRequirements by Requirement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Rota para obter um SubRequisito pelo seu ID.
 * 
 * @param {Object} req - O objeto de solicitação (request) contendo o ID do SubRequisito.
 * @param {Object} res - O objeto de resposta (response) que retorna o SubRequisito encontrado pelo ID.
 * 
 * @returns {Object} - Um objeto representando o SubRequisito encontrado pelo ID.
 *                    Retorna erro interno do servidor em caso de falha na consulta.
 */
router.get("/byId/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const subrequirementsbyId = await SubRequirements.findByPk(id);
    res.json(subrequirementsbyId);
  } catch (error) {
    console.error("Error getting SubRequirement by Id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Rota para criar um novo SubRequisito.
 * 
 * @param {Object} req - O objeto de solicitação (request) contendo os dados do novo SubRequisito a ser criado.
 * @param {Object} res - O objeto de resposta (response) que retorna os dados do SubRequisito criado.
 * 
 * @returns {Object} - Um objeto representando os dados do SubRequisito recém-criado.
 *                    Retorna erro interno do servidor em caso de falha na criação.
 */
router.post("/", validateToken, async (req, res) => {
  try {
    const subrequirements = req.body;
    await SubRequirements.create(subrequirements);
    res.json(subrequirements);
  } catch (error) {
    console.error("Error creating SubRequirement:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
