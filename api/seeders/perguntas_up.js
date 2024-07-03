"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ReferenceQuestions",
      [
        { Text: "Pergunta 1" },
        { Text: "Pergunta 2" },
        { Text: "Pergunta 3" },
        { Text: "Pergunta 4" },
        { Text: "Pergunta 5" },
        { Text: "Pergunta 6" },
        { Text: "Pergunta 7" },
        { Text: "Pergunta 8" },
        { Text: "Pergunta 9" },
        { Text: "Pergunta 10" },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Questions",
      [
        { ReferenceQuestionID: 1, SubRequirementID: 1 },
        { ReferenceQuestionID: 2, SubRequirementID: 1 },
        { ReferenceQuestionID: 3, SubRequirementID: 1 },
        { ReferenceQuestionID: 1, SubRequirementID: 2 },
        { ReferenceQuestionID: 4, SubRequirementID: 2 },
        { ReferenceQuestionID: 1, SubRequirementID: 3 },
        { ReferenceQuestionID: 2, SubRequirementID: 3 },
        { ReferenceQuestionID: 3, SubRequirementID: 3 },
        { ReferenceQuestionID: 1, SubRequirementID: 4 },
        { ReferenceQuestionID: 2, SubRequirementID: 4 },
        { ReferenceQuestionID: 3, SubRequirementID: 4 },
        { ReferenceQuestionID: 1, SubRequirementID: 5 },
        { ReferenceQuestionID: 2, SubRequirementID: 5 },
        { ReferenceQuestionID: 3, SubRequirementID: 5 },
        { ReferenceQuestionID: 1, SubRequirementID: 6 },
        { ReferenceQuestionID: 2, SubRequirementID: 6 },
        { ReferenceQuestionID: 3, SubRequirementID: 6 },
        { ReferenceQuestionID: 1, SubRequirementID: 7 },
        { ReferenceQuestionID: 2, SubRequirementID: 7 },
        { ReferenceQuestionID: 3, SubRequirementID: 7 },
        { ReferenceQuestionID: 1, SubRequirementID: 8 },
        { ReferenceQuestionID: 2, SubRequirementID: 8 },
        { ReferenceQuestionID: 6, SubRequirementID: 9 },
        { ReferenceQuestionID: 7, SubRequirementID: 9 },
        { ReferenceQuestionID: 1, SubRequirementID: 10 },
        { ReferenceQuestionID: 3, SubRequirementID: 11 },
        { ReferenceQuestionID: 1, SubRequirementID: 12 },
        { ReferenceQuestionID: 2, SubRequirementID: 13 },
        { ReferenceQuestionID: 6, SubRequirementID: 14 },
      ],
      {}
    );
  },
};
