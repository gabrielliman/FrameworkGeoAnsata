"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert data for Sections
    await queryInterface.bulkInsert(
      "Sections",
      [
        {
          Title: "Seção 4",
          Description:
            "Estimativa e Declaração de Informações de Exploração e Recursos Minerais",
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
          Description: "Modelo geológico e interpretação",
          SectionID: 5,
        },
        {
          Title: "2",
          Description: "Técnicas de estimativa e modelagem",
          SectionID: 5,
        },
        {
          Title: "3",
          Description: "Perspectivas razoáveis de extração econômica ",
          SectionID: 5,
        },
        {
          Title: "4",
          Description: "Critérios de Classificação ",
          SectionID: 5,
        },
        { Title: "5", Description: "Declaração ", SectionID: 5 },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Requirements",
      [
        //Secao 4 Subsecao 1
        { Title: "i", OriginalText: "", SubSectionID: 18 },
        { Title: "ii", OriginalText: "", SubSectionID: 18 },
        { Title: "iii", OriginalText: "", SubSectionID: 18 },
        { Title: "iv", OriginalText: "", SubSectionID: 18 },
        { Title: "v", OriginalText: "", SubSectionID: 18 },
        { Title: "vi", OriginalText: "", SubSectionID: 18 },
        { Title: "vii", OriginalText: "", SubSectionID: 18 },
        { Title: "viii", OriginalText: "", SubSectionID: 18 },
        //Secao 4 Subsecao 2
        { Title: "i", OriginalText: "", SubSectionID: 19 },
        { Title: "ii", OriginalText: "", SubSectionID: 19 },
        { Title: "iii", OriginalText: "", SubSectionID: 19 },
        { Title: "iv", OriginalText: "", SubSectionID: 19 },
        { Title: "v", OriginalText: "", SubSectionID: 19 },
        { Title: "vi", OriginalText: "", SubSectionID: 19 },
        //Secao 4 Subsecao 3
        { Title: "i", OriginalText: "", SubSectionID: 20 },
        { Title: "ii", OriginalText: "", SubSectionID: 20 },
        { Title: "iii", OriginalText: "", SubSectionID: 20 },
        { Title: "iv", OriginalText: "", SubSectionID: 20 },
        { Title: "v", OriginalText: "", SubSectionID: 20 },
        { Title: "vi", OriginalText: "", SubSectionID: 20 },
        { Title: "vii", OriginalText: "", SubSectionID: 20 },
        { Title: "viii", OriginalText: "", SubSectionID: 20 },
        { Title: "ix", OriginalText: "", SubSectionID: 20 },
        //Secao 4 Subsecao 4
        { Title: "i", OriginalText: "", SubSectionID: 21 },
        { Title: "ii", OriginalText: "", SubSectionID: 21 },
        //Secao 4 Subsecao 5
        { Title: "i", OriginalText: "", SubSectionID: 22 },
        { Title: "ii", OriginalText: "", SubSectionID: 22 },
        { Title: "iii", OriginalText: "", SubSectionID: 22 },
        { Title: "iv", OriginalText: "", SubSectionID: 22 },
        { Title: "v", OriginalText: "", SubSectionID: 22 },
        { Title: "vi", OriginalText: "", SubSectionID: 22 },
        { Title: "vii", OriginalText: "", SubSectionID: 22 },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "SubRequirements",
      [
        //Secao 4 Subsecao 1 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "A natureza, o detalhamento e a confiabilidade da informação geológica com respeito às características litológicas, estruturais, mineralógicas, de alteração hidrotermal ou outras características geológicas, geotécnicas e geometalúrgicas. ",
          RequirementID: 75,
        },
        //Secao 4 Subsecao 1 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "O modelo geológico, metodologia de modelagem e premissas que formam a base para as Informações de Exploração ou estimativa de Recursos Minerais.",
          RequirementID: 76,
        },

        //Secao 4 Subsecao 1 Requisito iii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "A suficiência de dados para assegurar a continuidade da mineralização e da geologia e o fornecimento de uma base adequada para os procedimentos de estimativa e classificação aplicados.",
          RequirementID: 77,
        },
        //Secao 4 Subsecao 1 Requisito iv
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "Discussão sobre se a interpretação se baseia em dados ou em premissas e se foram consideradas interpretações ou modelos alternativos. ",
          RequirementID: 78,
        },
        //Secao 4 Subsecao 1 Requisito v
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "Quaisquer fatores geológicos, de lavra, metalúrgicos, de beneficiamento, ambientais, sociais, de infraestrutura, jurídicos e econômicos que possam ter um efeito significativo nas perspectivas de aproveitamento de qualquer possível Potencial Exploratório ou depósito. ",
          RequirementID: 79,
        },
        //Secao 4 Subsecao 1 Requisito vi
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Dados geológicos que podem influenciar materialmente a quantidade estimada e a qualidade do Recurso Mineral.",
          RequirementID: 80,
        },
        //Secao 4 Subsecao 1 Requisito vii
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Consideração sobre interpretações ou modelos alternativos e seu possível efeito (ou risco potencial), se houver, na estimativa de Recursos Minerais.",
          RequirementID: 81,
        },
        //Secao 4 Subsecao 1 Requisito viii
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Considerações geológicas e ajustes (por exemplo, magnitude, veios, domínio etc.), utilizados no modelo, se aplicados no material mineralizado e/ou não mineralizado (por exemplo, dolinas, em rios (panelas), falhas, diques etc.). ",
          RequirementID: 82,
        },

        //Secao 4 Subsecao 2 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "Uma descrição detalhada das técnicas de estimativa e hipóteses usadas para determinar as faixas de teor e tonelagem para o Potencial Exploratório. ",
          RequirementID: 83,
        },
        //Secao 4 Subsecao 2 Requisito ii
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "A natureza e adequação da(s) técnica(s) de estimativa aplicada(s) e as principais premissas, incluindo tratamento de valores extremos de teor (corte ou restrição por valor máximo - capping), compostas (incluindo por comprimento e/ou densidade), domínios, espaçamento de amostras, estimativa da unidade de bloco (tamanho de bloco), menor unidade de seletividade de lavra (SMU – Selective Mining Unit), parâmetros de interpolação e distância máxima de extrapolação da posição espacial dos dados. ",
          RequirementID: 84,
        },
        //Secao 4 Subsecao 2 Requisito iii
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Premissas e justificativas das correlações feitas entre as variáveis.",
          RequirementID: 85,
        },
        //Secao 4 Subsecao 2 Requisito iv
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Qualquer programa de computação especializado relevante (software) aplicado (com o número da versão) junto com os parâmetros usados",
          RequirementID: 86,
        },
        //Secao 4 Subsecao 2 Requisito v
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Os processos de verificação e validação, a comparação das informações do modelo com dados de amostras ou compostas e o uso de dados de reconciliação e se a estimativa de Recursos Minerais leva em consideração tais informações. ",
          RequirementID: 87,
        },
        //Secao 4 Subsecao 2 Requisito vi
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "As premissas quanto à estimativa de quaisquer coprodutos, subprodutos ou elementos deletérios. ",
          RequirementID: 88,
        },

        //Secao 4 Subsecao 3 Requisito i
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Os parâmetros geológicos, incluindo, mas não se limitando a, volume/tonelagem, teor e estimativas de valor/qualidade, teor de corte, taxas de decapeamento, tamanho superior e inferior de peneiras. ",
          RequirementID: 89,
        },
        //Secao 4 Subsecao 3 Requisito ii
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Os parâmetros de engenharia, incluindo o método de lavra, beneficiamento, parâmetros geotécnicos, hidrogeológicos e metalúrgicos, incluindo hipóteses e premissas feitas para mitigar o efeito de elementos deletérios. ",
          RequirementID: 90,
        },
        {
          Title: "b",
          Class: "Resource",
          OriginalQuestion: "Fatores de diluição e recuperação de lavra que podem ser aplicáveis para converter Recursos Minerais em Reservas Minerais",
          RequirementID: 90,
        },

        //Secao 4 Subsecao 3 Requisito iii
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "A infraestrutura incluindo, mas não se limitando a, energia, água e acesso ao local do empreendimento. ",
          RequirementID: 91,
        },
        //Secao 4 Subsecao 3 Requisito iv
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Os parâmetros legais, governamentais, de licenciamento e estatutários.",
          RequirementID: 92,
        },
        //Secao 4 Subsecao 3 Requisito v
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Os parâmetros ambientais e sociais (ou relativos às comunidades). ",
          RequirementID: 93,
        },
        //Secao 4 Subsecao 3 Requisito vi
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Os parâmetros de mercado.",
          RequirementID: 94,
        },
        //Secao 4 Subsecao 3 Requisito vii
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "As premissas e parâmetros econômicos, incluindo, mas não se limitando a, preços de commodities, volumes de venda e custos de capital e operacional potenciais. ",
          RequirementID: 95,
        },
        //Secao 4 Subsecao 3 Requisito viii
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Riscos materiais.",
          RequirementID: 96,
        },
        //Secao 4 Subsecao 3 Requisito ix
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Os parâmetros usados para suportar o conceito de “eventual” no caso de Recursos Minerais.",
          RequirementID: 97,
        },

        //Secao 4 Subsecao 4 Requisito i
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Os métodos usados como base para a classificação dos Recursos Minerais nas categorias de confiabilidade.",
          RequirementID: 98,
        },
        //Secao 4 Subsecao 4 Requisito ii
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Justificativa dos critérios usados para classificar o recurso, incluindo a relação com as premissas de teor de corte.",
          RequirementID: 99,
        },

        //Secao 4 Subsecao 5 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "Teores ou qualidade específicos e espessuras.",
          RequirementID: 100,
        },
        //Secao 4 Subsecao 5 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "A declaração de altos e baixos teores e espessuras, junto com sua localização espacial para evitar declarações enganosas dos Resultados de Exploração.",
          RequirementID: 101,
        },

        //Secao 4 Subsecao 5 Requisito iii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "Uma declaração se os teores são médias regionais ou se proveem de amostras individuais selecionadas retiradas da propriedade em discussão.",
          RequirementID: 102,
        },
        //Secao 4 Subsecao 5 Requisito iv
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Os detalhes da mina a céu aberto, ou subterrânea, pilhas de resíduos, materiais remanescentes, rejeitos e pilares existentes ou outras fontes em uma declaração de Recursos Minerais.",
          RequirementID: 103,
        },
        //Secao 4 Subsecao 5 Requisito v
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "Uma comparação com as estimativas de Recursos Minerais anteriores, com uma explicação do motivo das alterações materiais.",
          RequirementID: 104,
        },
        {
          Title: "b",
          Class: "Resource",
          OriginalQuestion: "Um comentário sobre qualquer tendência histórica (por exemplo, viés global).",
          RequirementID: 104,
        },
        //Secao 4 Subsecao 5 Requisito vi
        {
          Title: "a",
          Class: "Resource",
          OriginalQuestion: "A base para a estimativa e, se não for a totalidade, a proporção relevante atribuível para a entidade que encomendou a declaração.",
          RequirementID: 105,
        },
        //Secao 4 Subsecao 5 Requisito vii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "A base das fórmulas para metal equivalente.",
          RequirementID: 106,
        },
      ],
      {}
    );
  },
};
