"use strict";

module.exports =
  {
    async up(queryInterface, Sequelize) {
      // Insert data for Frameworks
      await queryInterface.bulkInsert(
        "Frameworks",
        [
          { Title: "CBRR", Description: "Framework para o Brasil" },
        ],
        {}
      );
/*       await queryInterface.bulkInsert(
        "Instances",
        [
          {
            Title: "Recurso",
            Description: "descrição",
            Class: "Resource",
            FrameworkID: 1,
            UserID: 1,
          },
          {
            Title: "Exploração",
            Description: "descrição2",
            Class: "Exploration",
            FrameworkID: 1,
            UserID: 1,
          },
          {
            Title: "Reserva",
            Description: "descrição3",
            Class: "Reserve",
            FrameworkID: 1,
            UserID: 1,
          },
        ],
        {}
      ); */
    },
  };
