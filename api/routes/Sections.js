const express = require("express");
const router = express.Router();
const { Sections } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

/**
 * Rota para obter todas as seções associadas a um framework específico.
 * 
 * @param {Object} req - O objeto de solicitação (request) contendo o ID do framework.
 * @param {Object} res - O objeto de resposta (response) que retorna um array de seções relacionadas ao framework.
 * 
 * @returns {Array} - Um array contendo todas as seções relacionadas ao framework especificado.
 *                   Retorna erro interno do servidor em caso de falha na consulta.
 */
router.get("/:frameworkId", validateToken, async (req, res) => {
  try {
    const frameworkId = req.params.frameworkId;
    const SectionsByFramework = await Sections.findAll({
      where: {
        FrameworkID: frameworkId,
      },
    });
    res.json(SectionsByFramework);
  } catch (error) {
    console.error("Error getting Sections by Framework:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Rota para obter uma seção pelo seu ID.
 * 
 * @param {Object} req - O objeto de solicitação (request) contendo o ID da seção.
 * @param {Object} res - O objeto de resposta (response) que retorna a seção encontrada pelo ID.
 * 
 * @returns {Object} - Um objeto representando a seção encontrada pelo ID.
 *                    Retorna erro interno do servidor em caso de falha na consulta.
 */
router.get("/byId/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const sectionbyId = await Sections.findByPk(id);
    res.json(sectionbyId);
  } catch (error) {
    console.error("Error getting Section by Id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Rota para criar uma nova seção.
 * 
 * @param {Object} req - O objeto de solicitação (request) contendo os dados da nova seção a ser criada.
 * @param {Object} res - O objeto de resposta (response) que retorna os dados da seção criada.
 * 
 * @returns {Object} - Um objeto representando os dados da seção recém-criada.
 *                    Retorna erro interno do servidor em caso de falha na criação.
 */
router.post("/", validateToken, async (req, res) => {
  try {
    const section = req.body;
    await Sections.create(section);
    res.json(section);
  } catch (error) {
    console.error("Error creating Section:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
