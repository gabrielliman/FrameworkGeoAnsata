"use strict";

module.exports = {
  async down(queryInterface, Sequelize) {
    try {
      // Truncate data for Instances
      await queryInterface.bulkDelete("Instances", null, {});
      // Reset auto-increment counter for Instances table
      await queryInterface.sequelize.query(
        "ALTER TABLE Instances AUTO_INCREMENT = 1"
      );

      // Truncate data for SubRequirements
      await queryInterface.bulkDelete("Questions", null, {});
      // Reset auto-increment counter for SubRequirements table
      await queryInterface.sequelize.query(
        "ALTER TABLE Questions AUTO_INCREMENT = 1"
      );

      // Truncate data for SubRequirements
      await queryInterface.bulkDelete("ReferenceQuestions", null, {});
      // Reset auto-increment counter for SubRequirements table
      await queryInterface.sequelize.query(
        "ALTER TABLE ReferenceQuestions AUTO_INCREMENT = 1"
      );

      // Truncate data for SubRequirements
      await queryInterface.bulkDelete("SubRequirements", null, {});
      // Reset auto-increment counter for SubRequirements table
      await queryInterface.sequelize.query(
        "ALTER TABLE SubRequirements AUTO_INCREMENT = 1"
      );

      // Truncate data for Requirements
      await queryInterface.bulkDelete("Requirements", null, {});
      // Reset auto-increment counter for Requirements table
      await queryInterface.sequelize.query(
        "ALTER TABLE Requirements AUTO_INCREMENT = 1"
      );

      // Truncate data for Subsections
      await queryInterface.bulkDelete("Subsections", null, {});
      // Reset auto-increment counter for Subsections table
      await queryInterface.sequelize.query(
        "ALTER TABLE Subsections AUTO_INCREMENT = 1"
      );

      // Truncate data for Sections
      await queryInterface.bulkDelete("Sections", null, {});
      // Reset auto-increment counter for Sections table
      await queryInterface.sequelize.query(
        "ALTER TABLE Sections AUTO_INCREMENT = 1"
      );

      // Truncate data for Frameworks
      await queryInterface.bulkDelete("Frameworks", null, {});
      // Reset auto-increment counter for Frameworks table
      await queryInterface.sequelize.query(
        "ALTER TABLE Frameworks AUTO_INCREMENT = 1"
      );

      console.log(
        "Data truncated and auto-increment counters reset successfully"
      );
    } catch (error) {
      console.error("Error truncating data:", error);
    }
  },
};
