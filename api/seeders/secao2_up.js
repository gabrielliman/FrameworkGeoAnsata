"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert data for Sections
    await queryInterface.bulkInsert(
      "Sections",
      [
        {
          Title: "Seção 2",
          Description: "Geologia, Depósito, Mineralização",
          FrameworkID: 1,
        },
      ],
      {}
    );

    // Insert data for Subsections
    await queryInterface.bulkInsert(
      "SubSections",
      [
        {
          Title: "1",
          Description: "Geologia, Depósito, Mineralização",
          SectionID: 3,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Requirements",
      [
        //Introduça Subsecao Intoducao
        { Title: "i", OriginalText: "", SubSectionID: 9 },
        { Title: "ii", OriginalText: "", SubSectionID: 9 },
        { Title: "iii", OriginalText: "", SubSectionID: 9 },
        { Title: "iv", OriginalText: "", SubSectionID: 9 },
        { Title: "v", OriginalText: "", SubSectionID: 9 },
        { Title: "vi", OriginalText: "", SubSectionID: 9 },
        { Title: "vii", OriginalText: "", SubSectionID: 9 },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "SubRequirements",
      [
        //Secao 2 Subsecao 1 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "Os termos de referência ou escopo do trabalho",
          RequirementID: 29,
        },
        //Secao 2 Subsecao 1 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "A geologia do projeto, incluindo o tipo de depósito, a geologia local e o estilo de mineralização.",
          RequirementID: 30,
        },
        //Secao 2 Subsecao 1 Requisito iii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "O modelo geológico ou conceitos aplicados na pesquisa e com base nos quais é planejado o programa de exploração, juntamente com uma descrição das inferências e pressupostos feitos a partir desse modelo. ",
          RequirementID: 31,
        },
        //Secao 2 Subsecao 1 Requisito iv
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "Densidade, distribuição e confiabilidade dos dados e se a qualidade e quantidade das informações são suficientes para suportar as declarações, feitas ou inferidas, sobre o depósito. ",
          RequirementID: 32,
        },
        //Secao 2 Subsecao 1 Requisito v
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "Minerais relevantes presentes no depósito, sua frequência, tamanho e outras características, incluindo uma discussão sobre minerais acessórios e ganga caso estes tenham um efeito nas etapas de processamento e na variabilidade de cada mineral de importância dentro do depósito. ",
          RequirementID: 33,
        },
        //Secao 2 Subsecao 1 Requisito vi
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "Zonas mineralizadas relevantes encontradas na propriedade, incluindo um resumo dos tipos de rocha encaixante, controles geológicos relevantes e a extensão, largura, profundidade e continuidade da mineralização, juntamente com uma descrição do tipo, característica e distribuição da mineralização.",
          RequirementID: 34,
        },
        //Secao 2 Subsecao 1 Requisito vii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "A existência de modelos geológicos confiáveis e/ou mapas e seções transversais que suportam as interpretações.",
          RequirementID: 35,
        },
      ],
      {}
    );
  },
};
