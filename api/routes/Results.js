const express = require("express");
const Sequelize = require("sequelize");

const router = express.Router();
const {
  Users,
  Frameworks,
  Sections,
  SubSections,
  Requirements,
  SubRequirements,
  Questions,
  Answers,
  Instances,
  ReferenceQuestions,
} = require("../models");

/**
 * Rota para obter todas as perguntas e respostas dos subrequisitos de um requisito específico e instância, juntamente com as estatísticas de respostas.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - Estatísticas das respostas e lista de perguntas ou mensagem de erro.
 */
router.get(
  "/requirements/:requirementID/instances/:instanceID/questions-answers",
  async (req, res) => {
    const { requirementID, instanceID } = req.params;

    try {
      const instance = await Instances.findByPk(instanceID);

      if (!instance) {
        return res.status(404).json({ message: "Instance not found" });
      }

      const requirement = await Requirements.findByPk(requirementID, {
        include: {
          model: SubRequirements,
          where: {
            Class: {
              [Sequelize.Op.in]: ["Exploration", "Resource", "Reserve"].slice(
                0,
                ["Exploration", "Resource", "Reserve"].indexOf(instance.Class) +
                  1
              ),
            },
          },
          include: {
            model: Questions,
            include: {
              model: Answers,
              where: { InstanceID: instanceID },
              required: false,
            },
          },
        },
      });

      if (!requirement) {
        return res.status(404).json({ message: "Requirement not found" });
      }

      let totalQuestions = 0;
      let totalAnswered = 0;
      let totalUnanswered = 0;
      let answerCounts = {
        Yes: 0,
        No: 0,
        ["Don't Apply"]: 0,
      };
      let questions = [];

      if (
        requirement.SubRequirements &&
        requirement.SubRequirements.length > 0
      ) {
        requirement.SubRequirements.forEach((subReq) => {
          subReq.Questions.forEach((question) => {
            totalQuestions += 1;
            const answer = question.Answers[0];

            if (answer) {
              totalAnswered += 1;
              answerCounts[answer.Answer] += 1;
            } else {
              totalUnanswered += 1;
            }
            questions.push({
              questionID: question.ID,
              answered: !!answer,
              answer: answer ? answer.Answer : null,
            });
          });
        });
      }
      const responseStats = {
        totalSubRequirements: requirement.SubRequirements.length,
        totalQuestions: totalQuestions,
        totalAnswered: totalAnswered,
        totalUnanswered: totalUnanswered,
        answerCounts: answerCounts,
        questions: questions,
      };

      res.json(responseStats);
    } catch (error) {
      console.error("Error fetching questions and answers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

/**
 * Rota para obter todas as perguntas e respostas de um subrequisito específico e instância, juntamente com as estatísticas de respostas.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - Estatísticas das respostas e lista de perguntas ou mensagem de erro.
 */
router.get(
  "/subrequirements/:subrequirementID/instances/:instanceID/questions-answers",
  async (req, res) => {
    const { subrequirementID, instanceID } = req.params;

    try {
      const instance = await Instances.findByPk(instanceID);

      if (!instance) {
        return res.status(404).json({ message: "Instance not found" });
      }

      const subrequirement = await SubRequirements.findByPk(subrequirementID, {
        include: {
          model: Questions,
          include: {
            model: Answers,
            where: { InstanceID: instanceID },
            required: false,
          },
        },
      });

      if (!subrequirement) {
        return res.status(404).json({ message: "Requirement not found" });
      }

      let totalQuestions = 0;
      let totalAnswered = 0;
      let totalUnanswered = 0;
      let answerCounts = {
        Yes: 0,
        No: 0,
        ["Don't Apply"]: 0,
      };
      let questions = [];


      if (subrequirement.Questions && subrequirement.Questions.length > 0) {
        subrequirement.Questions.forEach((question) => {
          totalQuestions += 1;
          const answer = question.Answers[0];

          if (answer) {
            totalAnswered += 1;
            answerCounts[answer.Answer] += 1;
          } else {
            totalUnanswered += 1;
          }
          questions.push({
            questionID: question.ID,
            answered: !!answer,
            answer: answer ? answer.Answer : null,
          });
        });
      }

      const responseStats = {
        totalQuestions: totalQuestions,
        totalAnswered: totalAnswered,
        totalUnanswered: totalUnanswered,
        answerCounts: answerCounts,
        questions: questions,
      };

      res.json(responseStats);
    } catch (error) {
      console.error("Error fetching questions and answers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

/**
 * Rota para obter todas as perguntas e respostas de uma instância específica, juntamente com as estatísticas de respostas.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - Estatísticas das respostas e lista de perguntas ou mensagem de erro.
 */
router.get("/instances/:instanceID/questions-answers", async (req, res) => {
  const { instanceID } = req.params;

  try {
    const instance = await Instances.findByPk(instanceID);

    if (!instance) {
      return res.status(404).json({ message: "Instance not found" });
    }

    const framework = await Frameworks.findByPk(instance.FrameworkID, {
      include: {
        model: Sections,
        include: {
          model: SubSections,
          include: {
            model: Requirements,
            include: {
              model: SubRequirements,
              where: {
                Class: {
                  [Sequelize.Op.in]: [
                    "Exploration",
                    "Resource",
                    "Reserve",
                  ].slice(
                    0,
                    ["Exploration", "Resource", "Reserve"].indexOf(
                      instance.Class
                    ) + 1
                  ),
                },
              },
              include: {
                model: Questions,
                include: {
                  model: Answers,
                  where: { InstanceID: instanceID },
                  required: false,
                },
              },
            },
          },
        },
      },
    });

    if (!framework) {
      return res.status(404).json({ message: "Requirement not found" });
    }

    let totalQuestions = 0;
    let totalAnswered = 0;
    let totalUnanswered = 0;
    let answerCounts = {
      Yes: 0,
      No: 0,
      ["Don't Apply"]: 0,
    };
    let questions = [];

    framework.Sections.forEach((section) => {
      section.SubSections.forEach((subSection) => {
        subSection.Requirements.forEach((requirement) => {
          requirement.SubRequirements.forEach((subReq) => {
            subReq.Questions.forEach((question) => {
              totalQuestions += 1;
              const answer = question.Answers[0];

              if (answer) {
                totalAnswered += 1;
                answerCounts[answer.Answer] += 1;
              } else {
                totalUnanswered += 1;
              }
              questions.push({
                questionID: question.ID,
                answered: !!answer,
                answer: answer ? answer.Answer : null,
              });
            });
          });
        });
      });
    });
    const responseStats = {
      totalQuestions: totalQuestions,
      totalAnswered: totalAnswered,
      totalUnanswered: totalUnanswered,
      answerCounts: answerCounts,
      questions: questions,
    };

    res.json(responseStats);
  } catch (error) {
    console.error("Error fetching questions and answers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * Rota para obter detalhes de uma instância específica, incluindo seu framework associado,
 * seções, subseções, requisitos, subrequisitos, perguntas e respostas relacionadas.
 * 
 * @param {Object} req - O objeto de solicitação (request).
 * @param {Object} res - O objeto de resposta (response).
 * 
 * @returns {Object} - Detalhes da instância ou mensagem de erro em caso de falha na consulta.
 */
router.get('/instance-details/:instanceId', async (req, res) => {
  const instanceId = req.params.instanceId;

  try {
    const instanceDetails = await Instances.findOne({
      where: { id: instanceId },
      include: [
        {
          model: Frameworks,
          attributes: ['Title'],
          include: {
            model: Sections,
            include: {
              model: SubSections,
              include: {
                model: Requirements,
                include: {
                  model: SubRequirements,
                  include: {
                    model: Questions,
                    include: [
                      {
                        model: ReferenceQuestions,
                        attributes: ['Text']
                      },
                      {
                        model: Answers,
                        where: { InstanceID: instanceId },
                        required: false, // left join
                        attributes: ['Answer']
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      ]
    });

    res.json(instanceDetails);
  } catch (error) {
    console.error('Error fetching instance details:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
