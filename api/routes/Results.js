const express = require("express");
const Sequelize = require("sequelize");

const router = express.Router();
const {
  Requirements,
  SubRequirements,
  Questions,
  Answers,
  Instances,
} = require("../models");

// GET route to fetch all questions of subrequirements for a specific requirement and instance along with answer statistics
router.get(
  "/requirements/:requirementID/instances/:instanceID/questions-answers",
  async (req, res) => {
    const { requirementID, instanceID } = req.params;

    try {
      // Fetch the instance to get its class
      const instance = await Instances.findByPk(instanceID);

      if (!instance) {
        return res.status(404).json({ message: "Instance not found" });
      }

      // Fetch the requirement and include related subrequirements, questions, and answers
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
          }, // Filter subrequirements by instance class
          include: {
            model: Questions,
            include: {
              model: Answers,
              where: { InstanceID: instanceID },
              required: false, // Include all questions even if they have no answers
            },
          },
        },
      });

      if (!requirement) {
        return res.status(404).json({ message: "Requirement not found" });
      }

      // Initialize statistics
      let totalQuestions = 0;
      let totalAnswered = 0;
      let totalUnanswered = 0;
      let answerCounts= {
        Yes: 0,
        No: 0,
        ["Don't Apply"]: 0,
      };
      let questions =[];

      // Process the data to get the statistics
      if (
        requirement.SubRequirements &&
        requirement.SubRequirements.length > 0
      ) {
        requirement.SubRequirements.forEach((subReq) => {
          subReq.Questions.forEach((question) => {
            totalQuestions += 1;
            const answer = question.Answers[0]; // Assuming one answer per question per instance

            if (answer) {
              totalAnswered += 1;
              answerCounts[answer.Answer] += 1;
            } else {
              totalUnanswered += 1;
            }
            questions.push({
              questionID: question.ID,
              answered: !!answer,
              answer: answer ? answer.Answer : null
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

router.get(
  "/subrequirements/:subrequirementID/instances/:instanceID/questions-answers",
  async (req, res) => {
    const { subrequirementID, instanceID } = req.params;

    try {
      // Fetch the instance to get its class
      const instance = await Instances.findByPk(instanceID);

      if (!instance) {
        return res.status(404).json({ message: "Instance not found" });
      }

      // Fetch the requirement and include related subrequirements, questions, and answers
      const subrequirement = await SubRequirements.findByPk(subrequirementID, {
        include: {
          model: Questions,
          include: {
            model: Answers,
            where: { InstanceID: instanceID },
            required: false, // Include all questions even if they have no answers
          },
        },
      });

      if (!subrequirement) {
        return res.status(404).json({ message: "Requirement not found" });
      }

      // Initialize statistics
      let totalQuestions = 0;
      let totalAnswered = 0;
      let totalUnanswered = 0;
      let answerCounts= {
        Yes: 0,
        No: 0,
        ["Don't Apply"]: 0,
      };
      let questions =[];

      // Process the data to get the statistics
      if (
        subrequirement.Questions &&
        subrequirement.Questions.length > 0
      ) {
          subrequirement.Questions.forEach((question) => {
            totalQuestions += 1;
            const answer = question.Answers[0]; // Assuming one answer per question per instance

            if (answer) {
              totalAnswered += 1;
              answerCounts[answer.Answer] += 1;
            } else {
              totalUnanswered += 1;
            }
            questions.push({
              questionID: question.ID,
              answered: !!answer,
              answer: answer ? answer.Answer : null
            });
          });
        }

      // Prepare response
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

module.exports = router;
