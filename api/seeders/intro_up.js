"use strict";

module.exports =
  {
    async up(queryInterface, Sequelize) {
      // Insert data for Sections
      await queryInterface.bulkInsert(
        "Sections",
        [
          { Title: "Introdução", Description: "", FrameworkID: 1 },
        ],
        {}
      );

      // Insert data for Subsections
      await queryInterface.bulkInsert(
        "SubSections",
        [
          { Title: "Introdução", Description: "Geral", SectionID: 1 },
        ],
        {}
      );

      await queryInterface.bulkInsert(
        "Requirements",
        [
          //Introduça Subsecao Intoducao
          { Title: "i", OriginalText: "", SubSectionID: 1 },
          { Title: "ii", OriginalText: "", SubSectionID: 1 },
          { Title: "iii", OriginalText: "", SubSectionID: 1 },
          { Title: "iv", OriginalText: "", SubSectionID: 1 },
          { Title: "v", OriginalText: "", SubSectionID: 1 },
          { Title: "vi", OriginalText: "", SubSectionID: 1 },
          { Title: "vii", OriginalText: "", SubSectionID: 1 },
          { Title: "viii", OriginalText: "", SubSectionID: 1 },
          { Title: "ix", OriginalText: "", SubSectionID: 1 },
          { Title: "x", OriginalText: "", SubSectionID: 1 },
          { Title: "xi", OriginalText: "", SubSectionID: 1 },
        ],
        {}
      );

      await queryInterface.bulkInsert(
        "SubRequirements",
        [
          {
            Title: "a",
            Class: "Exploration",
            OriginalQuestion:
              "Os termos de referência ou escopo do trabalho",
            RequirementID: 1,
          },
          {
            Title: "a",
            Class: "Exploration",
            OriginalQuestion:
              "A relação entre o Profissional Qualificado e o emitente da declaração, se houver.",
            RequirementID: 2,
          },
          {
            Title: "a",
            Class: "Exploration",
            OriginalQuestion:
              "Uma indicação para quem a Declaração Pública foi preparada; se se trata de uma avaliação total ou parcial ou com outro propósito, trabalho realizado, data base para a declaração e trabalho a ser realizado.",
            RequirementID: 3,
          },
          {
            Title: "a",
            Class: "Exploration",
            OriginalQuestion:
              "Fontes de informação e dados contidos na declaração ou utilizados na sua elaboração, com citações, se aplicável, e uma lista de referências.",
            RequirementID: 4,
          },
          {
            Title: "a",
            Class: "Exploration",
            OriginalQuestion:
              "Uma página de título e sumário que inclua figuras e tabelas.",
            RequirementID: 5,
          },
          {
            Title: "a",
            Class: "Exploration",
            OriginalQuestion:
              "Um Sumário Executivo, que resuma informações importantes na declaração pública, incluindo descrição da propriedade e proprietário, geologia e mineralização, o status da exploração, desenvolvimento e operações, estimativas de Recurso Mineral e Reserva Mineral e as conclusões e recomendações do Profissional Qualificado.",
            RequirementID: 6,
          },
          {
            Title: "b",
            Class: "Exploration",
            OriginalQuestion:
              "Se Recursos Minerais Inferidos forem utilizados, uma avaliação econômica resumida incluindo estes Recursos Inferidos e, se for possível, sem incluir os mesmos. O Sumário Executivo com detalhes suficientes para permitir ao leitor compreender os fundamentos do projeto. ",
            RequirementID: 6,
          },
          {
            Title: "a",
            Class: "Exploration",
            OriginalQuestion:
              "Uma declaração do Profissional Qualificado, informando que “a declaração foi feita nos termos das diretrizes do Guia CBRR”. ",
            RequirementID: 7,
          },
          {
            Title: "b",
            Class: "Exploration",
            OriginalQuestion:
              "Se tiver sido utilizado um código de declaração distinto do Guia CBRR, esclarecer as diferenças. ",
            RequirementID: 7,
          },
          {
            Title: "a",
            Class: "Exploration",
            OriginalQuestion:
              "Diagramas, mapas, planos, seções e ilustrações, devidamente datados, legíveis e preparados em uma escala apropriada para distinguir características importantes. Mapas incluindo legenda, autor ou fonte de informação, sistema de coordenadas e datum, escala em forma de barra ou grade e seta indicando o Norte. ",
            RequirementID: 8,
          },
          {
            Title: "b",
            Class: "Exploration",
            OriginalQuestion:
              "Referência a um mapa índice e de localização e mapas mais detalhados mostrando todos as características importantes descritas no texto, incluindo todos os aspectos cadastrais relevantes e outros aspectos de infraestrutura. ",
            RequirementID: 8,
          },
          {
            Title: "a",
            Class: "Exploration",
            OriginalQuestion:
              "As unidades de medida, moeda e taxas de câmbio relevantes. ",
            RequirementID: 9,
          },
          {
            Title: "a",
            Class: "Exploration",
            OriginalQuestion:
              "Os detalhes da inspeção da propriedade feita pessoalmente por cada Profissional Qualificado ou, se aplicável, o motivo pelo qual uma inspeção pessoal não foi realizada. ",
            RequirementID: 10,
          },
          {
            Title: "a",
            Class: "Exploration",
            OriginalQuestion:
              "Se o Profissional Qualificado estiver baseando seu trabalho em um relatório, parecer ou declaração de outro especialista que não seja um Profissional Qualificado, deve ser apresentada a data, título e autor do relatório, parecer ou declaração, as qualificações do outro especialista, o motivo pelo qual o Profissional Qualificado se baseia no outro especialista, quaisquer riscos significativos e os passos percorridos pelo Profissional Qualificado para verificar as informações fornecidas.",
            RequirementID: 11,
          },
        ],
        {}
      );

    },
  };
