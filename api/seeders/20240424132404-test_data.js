'use strict';

module.exports = [{
  async up(queryInterface, Sequelize) {
    // Insert data for Frameworks
    await queryInterface.bulkInsert('Frameworks', [
      { Title: 'CBRR', Description: "Framework para o Brasil" },
      { Title: 'Teste', Description: "Framework para teste" }
    ], {});

    // Insert data for Sections
    await queryInterface.bulkInsert('Sections', [
      { Title: '5', Description: "Estudos Técnicos", FrameworkID: 1 },
    ], {});

    // Insert data for Subsections
    await queryInterface.bulkInsert('SubSections', [
      { Title: '5', Description: "ESG", SectionID: 1 },

    ], {});

    await queryInterface.bulkInsert('Requirements', [
      { Title: 'i', OriginalText: "", SubSectionID: 1 },
      { Title: 'ii', OriginalText: "", SubSectionID: 1 },
      { Title: 'iii', OriginalText: "", SubSectionID: 1 },
      { Title: 'iv', OriginalText: "", SubSectionID: 1 },
      { Title: 'v', OriginalText: "", SubSectionID: 1 },
      { Title: 'vi', OriginalText: "", SubSectionID: 1 },
      { Title: 'vii', OriginalText: "", SubSectionID: 1 },
      { Title: 'viii', OriginalText: "", SubSectionID: 1 },
    ], {});

    await queryInterface.bulkInsert('SubRequirements', [
      { Title: 'a', Class:'Resource',OriginalQuestion: "Confirmar se a empresa ou entidade declarante atendeu aos requisitos de conformidade legal ambiental do país anfitrião e quaisquer normas ou diretrizes obrigatórias e / ou voluntárias que subscreve", RequirementID: 1 },
      { Title: 'b', Class:'Resource',OriginalQuestion: "Identificar as licenças necessárias que serão exigidas e seu status e, quando ainda não obtidas, confirmar se há uma base razoável para acreditar que todas as licenças exigidas para o projeto poderão ser obtidas", RequirementID: 1 },
      { Title: 'c', Class:'Resource',OriginalQuestion: "Identificar e discutir quaisquer áreas sensíveis que podem afetar o projeto, bem como quaisquer outros fatores ambientais, incluindo estudos de impacto ambiental (Interested and Affected Parties - I&AP) e / ou estudos que podem ter um efeito material na probabilidade de eventual extração econômica. Discutir os possíveis mecanismos de mitigação", RequirementID: 1 },
      { Title: 'd', Class:'Resource',OriginalQuestion: "Identificar as regulamentações ou programas de gestão social que possam ser aplicados e discutir seu conteúdo e status. Descrever e quantificar os impactos socioeconômicos e culturais materiais que precisam ser mitigados, seus mecanismos de mitigação e, quando apropriado, os custos associados", RequirementID: 1 },


      { Title: 'a', Class:'Exploration',OriginalQuestion: "Informações geográficas da localidade, centros urbanos, características econômicas e culturais;", RequirementID: 2 },
      { Title: 'b', Class:'Exploration',OriginalQuestion: "Uso da terra e dos recursos naturais existentes para fins econômicos, culturais, recreativos e de conservação (incluindo distritos de interesse ambiental e cultural)", RequirementID: 2 },
      { Title: 'c', Class:'Exploration',OriginalQuestion: "Desenvolvimento industrial atual ou histórico e infraestrutura associada, incluindo mineração e extração na região", RequirementID: 2 },
      { Title: 'd', Class:'Exploration',OriginalQuestion: "Estruturas de governança local e órgãos administrativos, seus papéis e responsabilidades em relação a licenças e regulamentações", RequirementID: 2 },
      { Title: 'e', Class:'Exploration',OriginalQuestion: "Rotas de acesso ao local e qualquer impacto potencial no meio ambiente ou nas comunidades locais", RequirementID: 2 },
      { Title: 'f', Class:'Exploration',OriginalQuestion: "Fornecimento de energia para as atividades do empreendimento (por exemplo, energia renovável fora da rede ou da rede, planos de descarbonização para projetos futuros, entre outros)", RequirementID: 2 },

      { Title: 'a', Class:'Exploration',OriginalQuestion: "Avaliação preliminar do impacto hídrico (por exemplo, potencial de seca, inundações e impactos na qualidade da água)", RequirementID: 3 },
      { Title: 'b', Class:'Exploration',OriginalQuestion: "Avaliação preliminar de impactos na biodiversidade (por exemplo, espécies ameaçadas conhecidas na área)", RequirementID: 3 },
      { Title: 'c', Class:'Resource',OriginalQuestion: "Restrições / controles / medidas de consentimento / fatores modificadores ambientais e sazonais associados", RequirementID: 3 },
      { Title: 'd', Class:'Resource',OriginalQuestion: "Identificação de potenciais riscos e impactos associados ao clima", RequirementID: 3 },
      { Title: 'e', Class:'Resource',OriginalQuestion: "Restrições socioeconômicas e culturais / controles / medidas de consentimento / fatores modificadores", RequirementID: 3 },
      { Title: 'f', Class:'Resource',OriginalQuestion: "Quaisquer áreas sensíveis que possam afetar o projeto, bem como quaisquer outros fatores ambientais, incluindo estudos de impactos ambientais e / ou estudos que poderiam ter um efeito material na probabilidade de eventual extração econômica", RequirementID: 3 },
      { Title: 'g', Class:'Resource',OriginalQuestion: "Gerenciamento de estéril e rejeitos do projeto e requisitos previstos para infraestrutura de grande escala para a futura disposição de estéril, incluindo, mas não se limitando a depósitos de estéril e barragens de rejeitos", RequirementID: 3 },

      { Title: 'a', Class:'Exploration',OriginalQuestion: "Licenças e autorizações: Identificação das licenças necessárias que serão exigidas e seu status, e nos casos em que ainda não foram obtidas, a confirmação de que há uma base razoável para acreditar que todas as licenças exigidas para o projeto serão obtidas em tempo hábil. Também incluir quaisquer registros de penalidades / multas ou licenças revogadas em conjunto com as respectivas justificativas", RequirementID: 4 },

      { Title: 'a', Class:'Exploration',OriginalQuestion: "Responsabilidades: Descrever quaisquer atividades de reabilitação conhecidas, responsabilidades e / ou custos de conformidade", RequirementID: 5 },
      { Title: 'b', Class:'Resource',OriginalQuestion: "Descrever a melhor estimativa de custo para o fechamento, incluindo responsabilidade ambiental, compromissos sociais materiais remanescentes e custos de conformidade", RequirementID: 5 },
      { Title: 'c', Class:'Resource',OriginalQuestion: "Descrever os mecanismos em vigor para lidar com o fechamento não planejado", RequirementID: 5 },
      { Title: 'd', Class:'Resource',OriginalQuestion: "Caso apropriado, descrever as obrigações e garantias em vigor para assegurar que esses passivos possam ser custeados em uma base qualitativa e quantitativa", RequirementID: 5 },

      { Title: 'a', Class:'Exploration',OriginalQuestion: "Descrição das características do grupo de stakeholders", RequirementID: 6 },
      { Title: 'b', Class:'Exploration',OriginalQuestion: "Registros de relacionamentos com a comunidade e stakeholders", RequirementID: 6 },
      { Title: 'c', Class:'Exploration',OriginalQuestion: "Registros sobre os compromissos com todos os stakeholders desde o início do projeto", RequirementID: 6 },
      { Title: 'd', Class:'Exploration',OriginalQuestion: "Um procedimento estabelecido de relatos e/ ou queixas, questões dos stakeholders, preocupações registradas e seu rastreamento até serem resolvidas", RequirementID: 6 },


      { Title: 'a', Class:'Resource',OriginalQuestion: "Um sistema de gerenciamento de dados implementado para registrar e rastrear compromissos; Provisões feitas para grupos de stakeholders vulneráveis e ou sub representados Presença, ou não, de povos indígenas, e caso o Free Prior and Informed Consent (FPIC) for acionado, como isso será gerenciado", RequirementID: 7 },

      { Title: 'a', Class:'Exploration',OriginalQuestion: "", RequirementID: 8 },
      { Title: 'b', Class:'Exploration',OriginalQuestion: "Protocolos e procedimentos de saúde e segurança necessários para a definição dos alvos de exploração, incluindo evidências de aderência e registros contínuos de saúde e segurança.", RequirementID: 8 },
      { Title: 'c', Class:'Resource',OriginalQuestion: "Procedimentos e protocolos de saúde e segurança, incluindo segurança e proteção da comunidade, durante todo o programa de exploração, incluindo evidências de aderência e registros contínuos de saúde e segurança", RequirementID: 8 },


    ], {});

    await queryInterface.bulkInsert('ReferenceQuestions', [
      { Text: 'Pergunta 1' },
      { Text: 'Pergunta 2' },
      { Text: 'Pergunta 3' },
      { Text: 'Pergunta 4' },
      { Text: 'Pergunta 5' },


    ], {});

    await queryInterface.bulkInsert('Questions', [
      { ReferenceQuestionID: 1, SubRequirementID: 1},
      { ReferenceQuestionID: 2, SubRequirementID: 1},
      { ReferenceQuestionID: 3, SubRequirementID: 1},
      { ReferenceQuestionID: 1, SubRequirementID: 2},
      { ReferenceQuestionID: 4, SubRequirementID: 2},
      { ReferenceQuestionID: 5, SubRequirementID: 2},


    ], {});
    await queryInterface.bulkInsert('Instances', [
      { Title: 'teste', Description: "descrição", Class: 'Resource', FrameworkID: 1, UserID: 1},
      { Title: 'teste2', Description: "descrição2", Class: 'Exploration', FrameworkID: 1, UserID: 1},
      { Title: 'teste3', Description: "descrição3", Class: 'Reserve', FrameworkID: 1, UserID: 1},
      { Title: 'teste4', Description: "descrição4", Class: 'Reserve', FrameworkID: 1, UserID: 2},
      { Title: 'teste5', Description: "descrição3", Class: 'Reserve', FrameworkID: 2, UserID: 1},
      { Title: 'teste6', Description: "descrição4", Class: 'Reserve', FrameworkID: 2, UserID: 1},
    ], {});
  },

  async down(queryInterface, Sequelize) {
    try {

        // Truncate data for Instances
        await queryInterface.bulkDelete('Instances', null, {});
        // Reset auto-increment counter for Instances table
        await queryInterface.sequelize.query('ALTER TABLE Instances AUTO_INCREMENT = 1');


        // Truncate data for SubRequirements
        await queryInterface.bulkDelete('Questions', null, {});
        // Reset auto-increment counter for SubRequirements table
        await queryInterface.sequelize.query('ALTER TABLE Questions AUTO_INCREMENT = 1');

        // Truncate data for SubRequirements
        await queryInterface.bulkDelete('ReferenceQuestions', null, {});
        // Reset auto-increment counter for SubRequirements table
        await queryInterface.sequelize.query('ALTER TABLE ReferenceQuestions AUTO_INCREMENT = 1');

        // Truncate data for SubRequirements
        await queryInterface.bulkDelete('SubRequirements', null, {});
        // Reset auto-increment counter for SubRequirements table
        await queryInterface.sequelize.query('ALTER TABLE SubRequirements AUTO_INCREMENT = 1');

        // Truncate data for Requirements
        await queryInterface.bulkDelete('Requirements', null, {});
        // Reset auto-increment counter for Requirements table
        await queryInterface.sequelize.query('ALTER TABLE Requirements AUTO_INCREMENT = 1');

        // Truncate data for Subsections
        await queryInterface.bulkDelete('Subsections', null, {});
        // Reset auto-increment counter for Subsections table
        await queryInterface.sequelize.query('ALTER TABLE Subsections AUTO_INCREMENT = 1');

        // Truncate data for Sections
        await queryInterface.bulkDelete('Sections', null, {});
        // Reset auto-increment counter for Sections table
        await queryInterface.sequelize.query('ALTER TABLE Sections AUTO_INCREMENT = 1');

        // Truncate data for Frameworks
        await queryInterface.bulkDelete('Frameworks', null, {});
        // Reset auto-increment counter for Frameworks table
        await queryInterface.sequelize.query('ALTER TABLE Frameworks AUTO_INCREMENT = 1');
        

        console.log('Data truncated and auto-increment counters reset successfully');
    } catch (error) {
        console.error('Error truncating data:', error);
    }
}
}];
