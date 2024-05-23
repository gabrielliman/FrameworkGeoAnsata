"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert data for Sections
    await queryInterface.bulkInsert(
      "Sections",
      [
        {
          Title: "Seção 1",
          Description: "Descrição do Projeto",
          FrameworkID: 1,
        },
      ],
      {}
    );

    // Insert data for Subsections
    await queryInterface.bulkInsert(
      "SubSections",
      [
        { Title: "1", Description: "Localização", SectionID: 2 },
        { Title: "2", Description: "Descrição da Propriedade", SectionID: 2 },
        { Title: "3", Description: "Propriedades Adjacentes", SectionID: 2 },
        { Title: "4", Description: "Histórico", SectionID: 2 },
        {
          Title: "5",
          Description: "Aspectos Legais e de Licensiamento",
          SectionID: 2,
        },
        { Title: "6", Description: "Royalties", SectionID: 2 },
        { Title: "7", Description: "Passivos", SectionID: 2 },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Requirements",
      [
        //Secao 1 Subsecao 1
        { Title: "i", OriginalText: "", SubSectionID: 2 },
        { Title: "ii", OriginalText: "", SubSectionID: 2 },
        { Title: "iii", OriginalText: "", SubSectionID: 2 },
        //Secao 1 Subsecao 2
        { Title: "i", OriginalText: "", SubSectionID: 3 },
        { Title: "ii", OriginalText: "", SubSectionID: 3 },
        //Secao 1 Subsecao 3
        { Title: "i", OriginalText: "", SubSectionID: 4 },
        //Secao 1 Subsecao 4
        { Title: "i", OriginalText: "", SubSectionID: 5 },
        { Title: "ii", OriginalText: "", SubSectionID: 5 },
        { Title: "iii", OriginalText: "", SubSectionID: 5 },
        { Title: "iv", OriginalText: "", SubSectionID: 5 },
        //Secao 1 Subsecao 5
        { Title: "i", OriginalText: "", SubSectionID: 6 },
        { Title: "ii", OriginalText: "", SubSectionID: 6 },
        { Title: "iii", OriginalText: "", SubSectionID: 6 },
        { Title: "iv", OriginalText: "", SubSectionID: 6 },
        { Title: "v", OriginalText: "", SubSectionID: 6 },
        //Secao 1 Subsecao 6
        { Title: "i", OriginalText: "", SubSectionID: 7 },
        //Secao 1 Subsecao 7
        { Title: "i", OriginalText: "", SubSectionID: 8 },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "SubRequirements",
      [
        //Secao 1 Subsecao 1 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Descrição da localização e mapa (país, estado, cidade mais próxima, sistemas de coordenadas e latitude/longitude etc.).",
          RequirementID: 12,
        },
        //Secao 1 Subsecao 1 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Perfil do país, com uma descrição das informações relativas ao país onde está instalado o projeto e que sejam pertinentes ao projeto, incluindo a legislação aplicável relevante, contexto ambiental e social etc.",
          RequirementID: 13,
        },
        {
          Title: "b",
          Class: "Exploration",
          OriginalQuestion:
            "Uma avaliação genérica, de aspectos técnicos, ambientais e de riscos climáticos associados, sociais, econômicos relevantes, riscos políticos e outros riscos importantes.",
          RequirementID: 13,
        },
        //Secao 1 Subsecao 1 Requisito iii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "Mapa topográfico geral.",
          RequirementID: 14,
        },
        {
          Title: "b",
          Class: "Resource",
          OriginalQuestion:
            "Mapa topográfico com detalhes suficientes para dar apoio a uma eventual economicidade.",
          RequirementID: 14,
        },
        {
          Title: "c",
          Class: "Reserve",
          OriginalQuestion:
            "Mapa topográfico detalhado, com levantamentos aéreos aplicáveis verificados com controles de superfície e levantamentos, particularmente em áreas de terreno acidentado com vegetação densa ou alta altitude.",
          RequirementID: 14,
        },
        //Secao 1 Subsecao 2 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Breve descrição do escopo do projeto (ou seja, se o projeto se encontra em fase exploratória preliminar, exploração avançada, Estudo Conceitual, Pré-viabilidade ou Estudo de Viabilidade, plano de exaustão da mina para operações em andamento ou se em fase de fechamento).",
          RequirementID: 15,
        },
        //Secao 1 Subsecao 2 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Descrição da topografia, elevação, drenagem e vegetação, os meios e facilidade de acesso à propriedade, a proximidade da propriedade a um centro populacional, a natureza do transporte, o clima, riscos climáticos e sísmicos associados conhecidos e a extensão dos períodos de operação ao longo do ano e sua relevância para o projeto de mineração, a suficiência dos direitos de superfície para as operações de mineração, incluindo a disponibilidade e fontes de energia, água, pessoal, áreas potenciais de depósito de rejeitos, áreas potenciais de disposição de estéril, áreas de pilha de lixiviação e potenciais localizações para a planta de beneficiamento (observando quaisquer condições que possam afetar possíveis atividades de prospecção ou mineração).",
          RequirementID: 16,
        },
        //Secao 1 Subsecao 3 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Detalhes de propriedades adjacentes relevantes. Inclusão nos mapas da localização de estruturas mineralizadas comuns em propriedades adjacentes ou próximas que tenham influência importante na declaração. Referência a todas as informações usadas de outras fontes.",
          RequirementID: 17,
        },
        //Secao 1 Subsecao 4 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Antecedentes históricos do projeto e das áreas adjacentes envolvidas, incluindo resultados históricos de atividades anteriores de exploração e mineração (tipo, quantidade e trabalhos de desenvolvimento), proprietários anteriores e alterações de controle relacionadas",
          RequirementID: 18,
        },
        //Secao 1 Subsecao 4 Requisito ii
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion:
            "Sucessos ou falhas anteriores, atendendo ao princípio da Transparência, com as razões pelas quais o projeto, agora, deve ser considerado potencialmente econômico.",
          RequirementID: 19,
        },
        //Secao 1 Subsecao 4 Requisito iii
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion:
            "Estimativas históricas de Recursos Minerais conhecidos e estatísticas de desempenho de produção realizada atuais e anteriores.",
          RequirementID: 20,
        },
        //Secao 1 Subsecao 4 Requisito iv
        {
          Title: "a",
          Class: "Reserve",
          OriginalQuestion:
            "Estimativas históricas de Reservas Minerais conhecidas e estatísticas de desempenho de produção realizada atuais e anteriores.",
          RequirementID: 21,
        },
        //Secao 1 Subsecao 5 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Uma declaração do Profissional Qualificado sobre a confirmação dos direitos legais, incluindo uma descrição sobre:\nA natureza dos direitos do emissor (por exemplo, prospecção e/ou mineração) e o direito de uso da superfície das terras a que esses direitos se referem. A data de expiração e outros detalhes relevantes.",
          RequirementID: 22,
        },
        //Secao 1 Subsecao 5 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Uma declaração do Profissional Qualificado sobre a confirmação dos direitos legais, incluindo uma descrição sobre:\nOs principais termos e condições de todos os acordos existentes e detalhes daqueles ainda a serem obtidos, (tais como, mas não se limitando a, concessões, associações, joint ventures, direitos de acesso, arrendamentos, locais históricos e culturais, unidades de conservação ou parques nacionais e contexto ambiental, royalties, consentimentos, permissões, licenças ou autorizações).",
          RequirementID: 23,
        },
        //Secao 1 Subsecao 5 Requisito iii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Uma declaração do Profissional Qualificado sobre a confirmação dos direitos legais, incluindo uma descrição sobre:\nO nível de garantia sobre a permissão existente no momento da declaração ou que razoavelmente se espera que seja concedida no futuro, juntamente com quaisquer impedimentos conhecidos para obter o direito de operar na área.",
          RequirementID: 24,
        },
        {
          Title: "b",
          Class: "Exploration",
          OriginalQuestion:
            "Uma declaração do Profissional Qualificado sobre a confirmação dos direitos legais, incluindo uma descrição sobre:\nDetalhes das submissões que foram feitas. Consulte a Cláusula 7.1 para a declaração de Reserva Mineral.",
          RequirementID: 24,
        },
        //Secao 1 Subsecao 5 Requisito iv
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Uma declaração do Profissional Qualificado sobre a confirmação dos direitos legais, incluindo uma descrição sobre:\nUma declaração de quaisquer procedimentos legais, por exemplo: reivindicações fundiárias, que podem ter uma influência sobre os direitos de prospecção ou mineração, ou uma declaração negativa apropriada.",
          RequirementID: 25,
        },
        //Secao 1 Subsecao 5 Requisito v
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Uma declaração do Profissional Qualificado sobre a confirmação dos direitos legais, incluindo uma descrição sobre:\nUma declaração relativa aos requisitos governamentais/estatutários e autorizações, conforme possam ser exigidas, que tenham sido submetidas, aprovadas ou que tenham razoável expectativa de serem obtidas. Uma análise de riscos sobre as licenças que possam não ser recebidas e atrasos nos projetos.",
          RequirementID: 26,
        },
        //Secao 1 Subsecao 6 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Os royalties ou acordos de compra antecipada de produto (streaming) que devem ser pagos ou entregues em relação a cada propriedade.",
          RequirementID: 27,
        },
        //Secao 1 Subsecao 7 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Quaisquer responsabilidades sobre passivos, incluindo garantias de reabilitação que sejam pertinentes ao projeto.",
          RequirementID: 28,
        },
        {
          Title: "b",
          Class: "Exploration",
          OriginalQuestion:
            "Uma descrição da responsabilidade pela reabilitação, incluindo, mas não se limitando a, requisitos legais, premissas e limitações.",
          RequirementID: 28,
        },
      ],
      {}
    );
  },
};
