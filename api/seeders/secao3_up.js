"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert data for Sections
    await queryInterface.bulkInsert(
      "Sections",
      [
        {
          Title: "Seção 3",
          Description: "Exploração e Sondagens, Técnicas de Amostragem e Dados",
          FrameworkID: 1,
        },
      ],
      {}
    );

    // Insert data for Subsections
    await queryInterface.bulkInsert(
      "SubSections",
      [
        { Title: "1", Description: "Exploração", SectionID: 4 },
        { Title: "4", Description: "Técnicas de sondagem", SectionID: 4 },
        {
          Title: "3",
          Description: "Método de amostragem, coleta, captura e armazenamento",
          SectionID: 4,
        },
        {
          Title: "4",
          Description: "Preparação e análise de amostras",
          SectionID: 4,
        },
        { Title: "5", Description: "Governança da Amostragem", SectionID: 4 },
        {
          Title: "6",
          Description: "Controle e Garantia de Qualidade (QAQC)",
          SectionID: 4,
        },
        {
          Title: "7",
          Description: "Densidade, densidade in-situ",
          SectionID: 4,
        },
        {
          Title: "8",
          Description: "Amostragem",
          SectionID: 4,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Requirements",
      [
        //Secao 3 Subsecao 1
        { Title: "i", OriginalText: "", SubSectionID: 10 },
        { Title: "ii", OriginalText: "", SubSectionID: 10 },
        { Title: "iii", OriginalText: "", SubSectionID: 10 },
        { Title: "iv", OriginalText: "", SubSectionID: 10 },
        { Title: "v", OriginalText: "", SubSectionID: 10 },
        { Title: "vi", OriginalText: "", SubSectionID: 10 },
        { Title: "vii", OriginalText: "", SubSectionID: 10 },
        { Title: "viii", OriginalText: "", SubSectionID: 10 },
        //Secao 3 Subsecao 2
        { Title: "i", OriginalText: "", SubSectionID: 11 },
        { Title: "ii", OriginalText: "", SubSectionID: 11 },
        { Title: "iii", OriginalText: "", SubSectionID: 11 },
        { Title: "iv", OriginalText: "", SubSectionID: 11 },
        { Title: "v", OriginalText: "", SubSectionID: 11 },
        //Secao 3 Subsecao 3
        { Title: "i", OriginalText: "", SubSectionID: 12 },
        { Title: "ii", OriginalText: "", SubSectionID: 12 },
        { Title: "iii", OriginalText: "", SubSectionID: 12 },
        { Title: "iv", OriginalText: "", SubSectionID: 12 },
        { Title: "v", OriginalText: "", SubSectionID: 12 },
        { Title: "vi", OriginalText: "", SubSectionID: 12 },
        { Title: "vii", OriginalText: "", SubSectionID: 12 },
        //Secao 3 Subsecao 4
        { Title: "i", OriginalText: "", SubSectionID: 13 },
        { Title: "ii", OriginalText: "", SubSectionID: 13 },
        { Title: "iii", OriginalText: "", SubSectionID: 13 },

        //Secao 3 Subsecao 5
        { Title: "i", OriginalText: "", SubSectionID: 14 },
        { Title: "ii", OriginalText: "", SubSectionID: 14 },
        { Title: "iii", OriginalText: "", SubSectionID: 14 },
        { Title: "iv", OriginalText: "", SubSectionID: 14 },
        //Secao 3 Subsecao 6
        { Title: "i", OriginalText: "", SubSectionID: 15 },
        { Title: "ii", OriginalText: "", SubSectionID: 15 },
        { Title: "iii", OriginalText: "", SubSectionID: 15 },
        { Title: "iv", OriginalText: "", SubSectionID: 15 },
        //Secao 3 Subsecao 7
        { Title: "i", OriginalText: "", SubSectionID: 16 },
        { Title: "ii", OriginalText: "", SubSectionID: 16 },
        { Title: "iii", OriginalText: "", SubSectionID: 16 },
        { Title: "iv", OriginalText: "", SubSectionID: 16 },
        //Secao 3 Subsecao 8
        { Title: "i", OriginalText: "", SubSectionID: 17 },
        { Title: "ii", OriginalText: "", SubSectionID: 17 },
        { Title: "iii", OriginalText: "", SubSectionID: 17 },
        { Title: "iv", OriginalText: "", SubSectionID: 17 },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "SubRequirements",
      [
        //Secao 3 Subsecao 1 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Aquisição de dados ou técnicas de exploração e a natureza, nível de detalhe e confiança nos dados geológicos usados (ou seja, observações geológicas, resultados de sensoriamento remoto, estratigrafia, litologia, estrutura, alteração hidrotermal, mineralização, hidrologia, geofísica, imagens de testemunhos, geoquímica, petrografia, mineralogia, geocronologia, densidade, substâncias potencialmente deletérias ou contaminantes, características geotécnicas e da rocha, teor de umidade, amostragem em grande volume etc.). ",
          RequirementID: 36,
        },
        {
          Title: "b",
          Class: "Exploration",
          OriginalQuestion:
            "Conjuntos de dados com todos os metadados relevantes, como código de amostra exclusivo, massa da amostra, data de coleta, localização etc.",
          RequirementID: 36,
        },
        //Secao 3 Subsecao 1 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Os dados primários (observações e medições) utilizados no projeto e uma descrição da gestão e verificação desses dados ou do banco de dados.",
          RequirementID: 37,
        },
        {
          Title: "b",
          Class: "Exploration",
          OriginalQuestion:
            "Descrição dos seguintes processos relevantes: processos de aquisição (captura ou transferência), validação, integração, controle, armazenamento, recuperação e backup",
          RequirementID: 37,
        },
        {
          Title: "c",
          Class: "Exploration",
          OriginalQuestion:
            "Se os dados não estiverem armazenados digitalmente, apresentação de tabelas impressas com dados e informações bem organizados.",
          RequirementID: 37,
        },
        //Secao 3 Subsecao 1 Requisito iii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Reconhecimento e avaliação de dados de terceiros e referência a todos os dados e informações usados de outras fontes.",
          RequirementID: 38,
        },
        //Secao 3 Subsecao 1 Requisito iv
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Distinção entre dados/informações da propriedade em discussão e aquelas derivadas de propriedades vizinhas.",
          RequirementID: 39,
        },
        //Secao 3 Subsecao 1 Requisito v
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Os métodos para levantamento das coordenadas da boca dos furos e perfilagens dos mesmos, técnicas e precisões esperadas dos dados, bem como o sistema de coordenadas utilizado. ",
          RequirementID: 40,
        },
        //Secao 3 Subsecao 1 Requisito vi
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Discussão sobre o espaçamento e distribuição espacial dos dados para estabelecer o grau de continuidade geológica e de teor apropriado para o(s) procedimento(s) de estimativa e classificações aplicadas.",
          RequirementID: 41,
        },
        //Secao 3 Subsecao 1 Requisito vii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Apresentação de modelos representativos e/ou mapas e seções transversais ou outras ilustrações bidimensionais ou tridimensionais de resultados mostrando a localização de amostras, posições precisas das bocas de furo, perfilagens de furos, escavações subterrâneas, dados geológicos relevantes etc.",
          RequirementID: 42,
        },
        //Secao 3 Subsecao 1 Requisito viii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "A geometria da mineralização em relação à orientação dos furos devido à importância das relações entre larguras de mineralização e comprimentos de interseção.",
          RequirementID: 43,
        },
        {
          Title: "b",
          Class: "Exploration",
          OriginalQuestion:
            "Justificativa se apenas os comprimentos ao longo dos furos forem reportados.",
          RequirementID: 43,
        },
        //Secao 3 Subsecao 2 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Tipo de sondagem realizada (por exemplo, rotativa diamantada, circulação reversa, percussão, rotativa a ar, trado, Banka, sônica etc.) e detalhes (por exemplo, diâmetro dos testemunhos, barrilete triplo ou convencional, profundidade de furos desviados (cunha), coroas ou outro tipo de broca, se os testemunhos são orientados e, em caso afirmativo, por qual método etc.).",
          RequirementID: 44,
        },

        //Secao 3 Subsecao 2 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "A descrição geológica e geotécnica de amostras de testemunhos e chips em relação ao nível de detalhe necessário para suportar a estimativa apropriada do Recurso Mineral, estudos de lavra e ensaios metalúrgicos.",
          RequirementID: 45,
        },

        //Secao 3 Subsecao 2 Requisito iii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "A natureza da descrição (qualitativa ou quantitativa) e o uso de métodos de imageamento de testemunhos (ou trincheiras, canais etc.).",
          RequirementID: 46,
        },
        //Secao 3 Subsecao 2 Requisito iv
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "O comprimento total e a porcentagem das interseções relevantes na descrição dos testemunhos. ",
          RequirementID: 47,
        },

        //Secao 3 Subsecao 2 Requisito v
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Resultados de quaisquer perfilagens dos furos de sondagem.",
          RequirementID: 48,
        },

        //Secao 3 Subsecao 3 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Uma descrição da natureza e qualidade da amostragem (por exemplo, canais, chips ou ferramentas específicas de medição padrão de indústria apropriadas para os minerais sob investigação, como perfilagem gama em furos ou instrumentos fixos ou portáteis de difração de raios-X etc.), sem que esses exemplos limitem o significado amplo da amostragem.  ",
          RequirementID: 49,
        },
        //Secao 3 Subsecao 3 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Uma descrição dos processos de amostragem, incluindo estágios de quarteamento para maximizar a representatividade das amostras, se os tamanhos das amostras são apropriados para o tamanho do grão do material sendo amostrado e qualquer composição de amostras.",
          RequirementID: 50,
        },

        //Secao 3 Subsecao 3 Requisito iii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Uma descrição de cada conjunto de dados (por exemplo, geologia, teor, densidade, qualidade, características geometalúrgicas etc.), tipo de amostra, seleção de tamanho de amostra e métodos de coleta.",
          RequirementID: 51,
        },
        //Secao 3 Subsecao 3 Requisito iv
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "A natureza da geometria da mineralização em relação à orientação da sondagem (se conhecido). ",
          RequirementID: 52,
        },
        {
          Title: "b",
          Class: "Exploration",
          OriginalQuestion:
            "A orientação da amostragem para obter uma amostragem não-enviesada de possíveis estruturas, considerando o tipo de depósito. ",
          RequirementID: 52,
        },
        {
          Title: "c",
          Class: "Exploration",
          OriginalQuestion: "Os ângulos de interseção.",
          RequirementID: 52,
        },
        {
          Title: "d",
          Class: "Exploration",
          OriginalQuestion:
            "Os comprimentos ao longo do furo se o ângulo de interseção não for conhecido.",
          RequirementID: 52,
        },

        //Secao 3 Subsecao 3 Requisito v
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Uma descrição da política de armazenamento e prazos de retenção de amostras físicas (por exemplo, testemunhos, rejeitos de amostras etc.). ",
          RequirementID: 53,
        },
        //Secao 3 Subsecao 3 Requisito vi
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Uma descrição do método de registro e avaliação das recuperações de amostras testemunhadas e chips e os resultados avaliados, medidas tomadas para maximizar a recuperação das amostras e garantir a representatividade das amostras, se existe uma relação entre a recuperação das amostras e o teor e se o enviesamento da amostragem pode ter ocorrido devido a perda/ganho preferencial de material fino/grosso. ",
          RequirementID: 54,
        },
        //Secao 3 Subsecao 3 Requisito vii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "O corte das amostras de testemunho com serra diamantada ou partido e se um quarto, metade ou todo o testemunho foi submetido à análise.",
          RequirementID: 55,
        },
        {
          Title: "b",
          Class: "Exploration",
          OriginalQuestion:
            "Amostragem não testemunhada, por exemplo, se a amostra foi quarteada, utilizado tubo, submetida a quarteador rotativo etc.; se a amostragem foi a seco ou a úmido; o impacto do lençol freático ou vazões de água na recuperação e introdução de viés de amostragem ou contaminação vindas de cima",
          RequirementID: 55,
        },
        {
          Title: "c",
          Class: "Exploration",
          OriginalQuestion:
            "O impacto da variação do diâmetro do furo, por exemplo, pelo uso de um calibrador. ",
          RequirementID: 55,
        },
        //Secao 3 Subsecao 4 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "A identidade do(s) laboratório(s) e seu(s) status de certificação e número(s) de registro. ",
          RequirementID: 56,
        },
        {
          Title: "b",
          Class: "Exploration",
          OriginalQuestion:
            "As medidas tomadas pelo Profissional Qualificado para garantir que os resultados de um laboratório não certificado sejam de qualidade aceitável. ",
          RequirementID: 56,
        },
        //Secao 3 Subsecao 4 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "O método analítico, a sua natureza, a qualidade e adequação dos processos e procedimentos de análise e laboratoriais utilizados e se a técnica é considerada parcial ou total.",
          RequirementID: 57,
        },
        //Secao 3 Subsecao 4 Requisito iii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Uma descrição do processo e método usado para preparação de amostras, quarteamento e redução granulométrica, e a probabilidade de amostras inadequadas ou não representativas (ou seja, cominuição imprópria, contaminação, tamanhos de peneiras, granulometria, balanço de massa etc.). ",
          RequirementID: 58,
        },

        //Secao 3 Subsecao 5 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "A governança da campanha e do processo de amostragem, para garantir a qualidade e representatividade das amostras e dados, como recuperação das amostras, influência de altos teores, perdas seletivas ou contaminação, diâmetro dos testemunhos, QA/QC (garantia e controle da qualidade) interno e externo e quaisquer outros fatores que possam ter resultado em enviesamento da amostragem, ou que este enviesamento tenha sido identificado. ",
          RequirementID: 59,
        },
        //Secao 3 Subsecao 5 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "As medidas tomadas para garantir a segurança da amostra e sua rastreabilidade. ",
          RequirementID: 60,
        },
        //Secao 3 Subsecao 5 Requisito iii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Os procedimentos de validação usados para garantir a integridade dos dados, por exemplo, transcrição, entrada ou outros erros, entre sua coleta inicial e seu uso futuro para modelagem (por exemplo, geologia, teor, densidade etc.)",
          RequirementID: 61,
        },
        //Secao 3 Subsecao 5 Requisito iv
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "O processo e frequência de auditoria (incluindo datas dessas auditorias) e divulgação de quaisquer riscos materiais identificados.",
          RequirementID: 62,
        },

        //Secao 3 Subsecao 6 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "As técnicas de verificação (QA/QC) para o processo de amostragem no campo, por exemplo, a quantidade de duplicatas, brancos, padrões de referência certificados, auditorias de processo, análise etc. ",
          RequirementID: 63,
        },
        //Secao 3 Subsecao 6 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Métodos indiretos de medição (por exemplo, métodos geofísicos), com atenção para a confiabilidade da interpretação.",
          RequirementID: 64,
        },
        //Secao 3 Subsecao 6 Requisito iii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Referência às medidas tomadas para garantir a representatividade da amostra e a calibração adequada de quaisquer equipamentos ou sistemas de medição utilizados.",
          RequirementID: 65,
        },
        //Secao 3 Subsecao 6 Requisito iv
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            'Se os procedimentos de QA/QC usados para verificar o banco de dados atualizado com novos dados não distorceram as versões anteriores contendo dados "antigos". ',
          RequirementID: 66,
        },

        //Secao 3 Subsecao 7 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "O método de determinação da densidade in-situ com referência à frequência das medições, o tamanho, a natureza e a representatividade das amostras.",
          RequirementID: 67,
        },
        //Secao 3 Subsecao 7 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "Estimativas preliminares ou premissas assumidas para a densidade in-situ.",
          RequirementID: 68,
        },
        //Secao 3 Subsecao 7 Requisito iii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "A representatividade das amostras de densidade in-situ.",
          RequirementID: 69,
        },
        //Secao 3 Subsecao 7 Requisito iv
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "A medição da densidade in-situ para material granular usando métodos que consideram adequadamente os espaços vazios (cavidade, porosidade etc.), umidade e diferenças entre rochas e zonas de alteração dentro do depósito",
          RequirementID: 70,
        },

        //Secao 3 Subsecao 8 Requisito i
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "A localização das amostras individuais (incluindo mapa). ",
          RequirementID: 71,
        },
        //Secao 3 Subsecao 8 Requisito ii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "O tamanho das amostras, espaçamento/densidade das amostras recuperadas e se os tamanhos e distribuição das amostras são apropriados para a granulometria do material sendo amostrado.",
          RequirementID: 72,
        },
        //Secao 3 Subsecao 8 Requisito iii
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion: "O método de lavra e beneficiamento. ",
          RequirementID: 73,
        },
        //Secao 3 Subsecao 8 Requisito iv
        {
          Title: "a",
          Class: "Exploration",
          OriginalQuestion:
            "O grau de representatividade das amostras dos vários tipos e estilos de mineralização e do depósito mineral como um todo.",
          RequirementID: 74,
        },
      ],
      {}
    );

    /*     await queryInterface.bulkInsert("ReferenceQuestions", [{ Text: "" }], {});

    await queryInterface.bulkInsert(
      "Questions",
      [{ ReferenceQuestionID: 0, SubRequirementID: 0 }],
      {}
    ); */
  },
};
