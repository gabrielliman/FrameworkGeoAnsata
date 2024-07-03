const express = require("express");
const router = express.Router();
const { SubSections } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

/**
 * Rota para obter todas as SubSeções associadas a uma Seção específica.
 * 
 * @param {Object} req - O objeto de solicitação (request) contendo o ID da Seção.
 * @param {Object} res - O objeto de resposta (response) que retorna um array de SubSeções relacionadas à Seção.
 * 
 * @returns {Array} - Um array contendo todas as SubSeções relacionadas à Seção especificada.
 *                   Retorna erro interno do servidor em caso de falha na consulta.
 */
router.get("/:sectionId", validateToken, async (req, res) => {
  try {
    const sectionId = req.params.sectionId;
    const SubSectionsBySection = await SubSections.findAll({
      where: {
        SectionID: sectionId,
      },
    });
    res.json(SubSectionsBySection);
  } catch (error) {
    console.error("Error getting SubSections by Section:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Rota para obter uma SubSeção pelo seu ID.
 * 
 * @param {Object} req - O objeto de solicitação (request) contendo o ID da SubSeção.
 * @param {Object} res - O objeto de resposta (response) que retorna a SubSeção encontrada pelo ID.
 * 
 * @returns {Object} - Um objeto representando a SubSeção encontrada pelo ID.
 *                    Retorna erro interno do servidor em caso de falha na consulta.
 */
router.get("/byId/:id", validateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const subsectionbyId = await SubSections.findByPk(id);
    res.json(subsectionbyId);
  } catch (error) {
    console.error("Error getting SubSection by Id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Rota para criar uma nova SubSeção.
 * 
 * @param {Object} req - O objeto de solicitação (request) contendo os dados da nova SubSeção a ser criada.
 * @param {Object} res - O objeto de resposta (response) que retorna os dados da SubSeção criada.
 * 
 * @returns {Object} - Um objeto representando os dados da SubSeção recém-criada.
 *                    Retorna erro interno do servidor em caso de falha na criação.
 */
router.post("/", validateToken, async (req, res) => {
  try {
    const subsection = req.body;
    await SubSections.create(subsection);
    res.json(subsection);
  } catch (error) {
    console.error("Error creating SubSection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
