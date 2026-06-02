import { Colors } from './theme';

export type ArtigoSecao = {
  subtitulo?: string;
  paragrafos: string[];
};

export type Artigo = {
  id: string;
  categoria: string;
  titulo: string;
  resumo: string;
  cor: string;
  corpo: ArtigoSecao[];
};

export type QuizPergunta = {
  enunciado: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
};

export type Quiz = {
  id: string;
  titulo: string;
  descricao: string;
  cor: string;
  perguntas: QuizPergunta[];
};

export type DicaDoDia = {
  titulo: string;
  texto: string;
};

export type AcessoRapido = {
  id: string;
  titulo: string;
  descricao: string;
  rota: string;
};

export const dicaDoDia: DicaDoDia = {
  titulo: 'Dica do dia',
  texto:
    'Letramento racial começa pela escuta. Antes de opinar sobre uma experiência ' +
    'de discriminação, pergunte-se: estou centralizando a voz de quem viveu aquilo?',
};

export const artigosDestaque: Artigo[] = [
  {
    id: 'racismo-estrutural',
    categoria: 'Conceitos',
    titulo: 'O que é racismo estrutural?',
    resumo:
      'Entenda como o racismo opera para além de atitudes individuais, ' +
      'organizando instituições, mercado e cultura.',
    cor: Colors.terracotta,
    corpo: [
      {
        paragrafos: [
          'Quando falamos em racismo, é comum pensar primeiro em ofensas ou ' +
            'agressões pontuais. Mas o racismo estrutural mostra que o problema ' +
            'é mais profundo: ele está organizado na própria forma como a ' +
            'sociedade funciona — nas instituições, no mercado de trabalho, na ' +
            'distribuição de renda e até no que consideramos "normal".',
        ],
      },
      {
        subtitulo: 'Além das atitudes individuais',
        paragrafos: [
          'Racismo estrutural não depende da intenção de uma pessoa específica. ' +
            'Ele se reproduz mesmo quando ninguém "quis" discriminar, porque está ' +
            'embutido em regras, práticas e padrões que beneficiam um grupo e ' +
            'prejudicam outro de forma sistemática.',
          'Por isso, combater o racismo não é apenas evitar ser racista no dia a ' +
            'dia — é também questionar e mudar as estruturas que mantêm a ' +
            'desigualdade.',
        ],
      },
      {
        subtitulo: 'Como ele aparece',
        paragrafos: [
          'Ele aparece quando pessoas negras recebem salários menores nas mesmas ' +
            'funções, quando são maioria entre as vítimas de violência policial, ' +
            'ou quando estão sub-representadas em cargos de liderança e na mídia.',
          'Esses padrões não são coincidência: são o resultado acumulado de ' +
            'séculos de exclusão que continuam moldando o presente.',
        ],
      },
      {
        subtitulo: 'O que podemos fazer',
        paragrafos: [
          'Reconhecer o racismo estrutural é o primeiro passo. A partir daí, ' +
            'podemos apoiar políticas de reparação (como cotas), valorizar ' +
            'profissionais e produções negras, e usar nossos espaços para abrir ' +
            'portas em vez de mantê-las fechadas.',
        ],
      },
    ],
  },
  {
    id: 'microagressoes',
    categoria: 'No dia a dia',
    titulo: 'Microagressões: o que são e como reagir',
    resumo:
      'Comentários "sutis" também ferem. Aprenda a identificar e a se posicionar ' +
      'diante de microagressões racistas.',
    cor: Colors.institutional,
    corpo: [
      {
        paragrafos: [
          'Microagressões são comentários ou atitudes aparentemente pequenos que ' +
            'comunicam preconceito de forma indireta. Quem as comete muitas vezes ' +
            'não percebe o peso do que disse — mas quem as recebe sente o impacto, ' +
            'repetido dia após dia.',
        ],
      },
      {
        subtitulo: 'Exemplos comuns',
        paragrafos: [
          '"Você é bonita(o) para uma pessoa negra." "Posso tocar no seu cabelo?" ' +
            '"Nossa, você fala tão bem!" "Mas você não tem cara de quem é da ' +
            'favela." Frases assim tratam a pessoa como exceção e reforçam um ' +
            'estereótipo como se fosse a regra.',
        ],
      },
      {
        subtitulo: 'Por que elas ferem',
        paragrafos: [
          'Cada microagressão isolada pode parecer "pequena", mas o acúmulo ' +
            'comunica uma mensagem constante: você não pertence totalmente a este ' +
            'espaço. Esse desgaste afeta a autoestima, a saúde mental e o senso de ' +
            'segurança de quem é alvo.',
        ],
      },
      {
        subtitulo: 'Como reagir',
        paragrafos: [
          'Se você é alvo: você não é obrigada(o) a educar ninguém, mas, quando ' +
            'sentir segurança, nomear o que aconteceu ("isso que você falou é uma ' +
            'microagressão") ajuda a interromper o ciclo.',
          'Se você presenciou: seja aliada(o). Não deixe a responsabilidade só ' +
            'para a pessoa atingida — aponte o problema e ofereça apoio.',
          'Se você cometeu: escute, não se defenda na hora, peça desculpas de ' +
            'forma sincera e mude o comportamento. Errar é humano; insistir no ' +
            'erro é escolha.',
        ],
      },
    ],
  },
  {
    id: 'racismo-x-injuria',
    categoria: 'Direitos',
    titulo: 'Racismo x Injúria racial',
    resumo:
      'A diferença jurídica importa na hora de denunciar. Veja o que mudou com ' +
      'a Lei 14.532/2023.',
    cor: Colors.clay,
    corpo: [
      {
        paragrafos: [
          'Durante muito tempo, "racismo" e "injúria racial" tiveram tratamentos ' +
            'jurídicos diferentes no Brasil. Entender a distinção ajuda a saber ' +
            'como agir e o que esperar de uma denúncia.',
        ],
      },
      {
        subtitulo: 'O crime de racismo',
        paragrafos: [
          'O racismo (Lei 7.716/1989) atinge um grupo ou coletividade por causa ' +
            'de raça, cor, etnia, religião ou origem — por exemplo, impedir o ' +
            'acesso de pessoas negras a um estabelecimento. É crime inafiançável e ' +
            'imprescritível, ou seja, não prescreve com o tempo.',
        ],
      },
      {
        subtitulo: 'A injúria racial',
        paragrafos: [
          'A injúria racial ofende a honra de uma pessoa específica usando ' +
            'elementos de raça ou cor. Antes, era tratada de forma mais branda que ' +
            'o racismo.',
        ],
      },
      {
        subtitulo: 'O que mudou com a Lei 14.532/2023',
        paragrafos: [
          'A Lei 14.532/2023 equiparou a injúria racial ao crime de racismo. Na ' +
            'prática, a injúria racial passou a ser também imprescritível e ' +
            'inafiançável, com penas mais severas.',
          'Isso significa que ofensas raciais dirigidas a uma pessoa não são mais ' +
            'tratadas como algo "menor" — são levadas a sério como racismo.',
        ],
      },
      {
        subtitulo: 'Como denunciar',
        paragrafos: [
          'Guarde provas (prints, áudios, vídeos, nomes de testemunhas), registre ' +
            'um boletim de ocorrência (presencial ou online) e procure uma ' +
            'delegacia especializada quando houver. O Disque 100 também orienta ' +
            'sobre violações de direitos humanos.',
        ],
      },
    ],
  },
];

export const quizzes: Quiz[] = [
  {
    id: 'microagressoes',
    titulo: 'Você reconhece uma microagressão?',
    descricao: 'Teste sua percepção sobre comentários "sutis" que carregam racismo.',
    cor: Colors.terracotta,
    perguntas: [
      {
        enunciado: 'Um colega diz a uma pessoa negra: "Nossa, você fala tão bem!". Isso é:',
        opcoes: ['Um elogio neutro', 'Uma microagressão', 'Apenas uma observação'],
        correta: 1,
        explicacao:
          'O "elogio" pressupõe que falar bem seria inesperado para uma pessoa ' +
          'negra — reforçando um estereótipo. É uma microagressão.',
      },
      {
        enunciado: 'Qual destas atitudes é a mais adequada ao presenciar uma microagressão?',
        opcoes: [
          'Fingir que não percebeu para evitar conflito',
          'Esperar que só a pessoa atingida reaja',
          'Apontar o problema e oferecer apoio',
        ],
        correta: 2,
        explicacao:
          'Ser aliada(o) significa não deixar toda a responsabilidade para quem ' +
          'foi atingido. Nomear o problema ajuda a interromper o ciclo.',
      },
      {
        enunciado: '"Posso tocar no seu cabelo?" dito a uma pessoa negra é:',
        opcoes: [
          'Uma curiosidade inofensiva',
          'Uma microagressão que trata a pessoa como exótica',
          'Um sinal de admiração',
        ],
        correta: 1,
        explicacao:
          'Tratar o corpo do outro como objeto de curiosidade reforça a ideia de ' +
          '"exotismo" e desrespeita os limites da pessoa.',
      },
      {
        enunciado: 'Se você cometeu uma microagressão sem perceber, o melhor é:',
        opcoes: [
          'Explicar que não teve intenção e seguir em frente',
          'Escutar, pedir desculpas sinceras e mudar o comportamento',
          'Dizer que a pessoa está sendo sensível demais',
        ],
        correta: 1,
        explicacao:
          'A intenção não apaga o impacto. Escutar e mudar a atitude vale mais ' +
          'do que se defender.',
      },
      {
        enunciado: 'Microagressões são "pequenas" e por isso não causam dano real.',
        opcoes: ['Verdadeiro', 'Falso'],
        correta: 1,
        explicacao:
          'Falso. O acúmulo de microagressões afeta autoestima, saúde mental e o ' +
          'senso de pertencimento de quem é alvo.',
      },
    ],
  },
  {
    id: 'conceitos',
    titulo: 'Conceitos sobre racismo',
    descricao: 'Revise as ideias-chave para entender como o racismo opera.',
    cor: Colors.institutional,
    perguntas: [
      {
        enunciado: 'Racismo estrutural significa que:',
        opcoes: [
          'O racismo depende apenas de pessoas mal-intencionadas',
          'O racismo está organizado nas instituições e práticas da sociedade',
          'O racismo acabou com o fim da escravidão',
        ],
        correta: 1,
        explicacao:
          'O racismo estrutural se reproduz nas regras e práticas sociais, mesmo ' +
          'sem uma intenção individual de discriminar.',
      },
      {
        enunciado: 'O combate ao racismo estrutural exige principalmente:',
        opcoes: [
          'Apenas evitar ofensas no dia a dia',
          'Questionar e mudar estruturas que mantêm a desigualdade',
          'Ignorar o tema para não gerar divisão',
        ],
        correta: 1,
        explicacao:
          'Não basta a conduta individual: é preciso transformar as estruturas ' +
          'que perpetuam a desigualdade racial.',
      },
      {
        enunciado: 'Políticas de cotas são um exemplo de:',
        opcoes: [
          'Privilégio injustificado',
          'Ação de reparação diante de desigualdades históricas',
          'Medida que aumenta o racismo',
        ],
        correta: 1,
        explicacao:
          'Cotas buscam reparar exclusões acumuladas por séculos, ampliando o ' +
          'acesso de grupos historicamente prejudicados.',
      },
      {
        enunciado: 'Ser "não racista" e ser "antirracista" são a mesma coisa.',
        opcoes: ['Verdadeiro', 'Falso'],
        correta: 1,
        explicacao:
          'Falso. Ser antirracista é agir ativamente contra o racismo, e não ' +
          'apenas evitar cometê-lo.',
      },
    ],
  },
  {
    id: 'direitos',
    titulo: 'Seus direitos contra o racismo',
    descricao: 'Confira o que você sabe sobre a legislação e como denunciar.',
    cor: Colors.clay,
    perguntas: [
      {
        enunciado: 'A Lei 14.532/2023 trouxe qual mudança importante?',
        opcoes: [
          'Descriminalizou a injúria racial',
          'Equiparou a injúria racial ao crime de racismo',
          'Reduziu as penas para crimes raciais',
        ],
        correta: 1,
        explicacao:
          'A lei equiparou a injúria racial ao racismo, tornando-a também ' +
          'imprescritível e inafiançável.',
      },
      {
        enunciado: 'O crime de racismo, no Brasil, é:',
        opcoes: [
          'Afiançável e prescreve em 5 anos',
          'Inafiançável e imprescritível',
          'Apenas uma infração administrativa',
        ],
        correta: 1,
        explicacao:
          'O racismo é inafiançável e imprescritível: não prescreve com o tempo ' +
          'e não admite fiança.',
      },
      {
        enunciado: 'Ao sofrer racismo, um passo importante é:',
        opcoes: [
          'Apagar as mensagens para esquecer o ocorrido',
          'Guardar provas (prints, áudios, testemunhas) e registrar ocorrência',
          'Resolver sozinho, sem envolver autoridades',
        ],
        correta: 1,
        explicacao:
          'Provas e o boletim de ocorrência fortalecem a denúncia. Delegacias ' +
          'especializadas e o Disque 100 também orientam.',
      },
      {
        enunciado: 'O Disque 100 serve para:',
        opcoes: [
          'Denunciar e orientar sobre violações de direitos humanos',
          'Pedir informações sobre impostos',
          'Apenas registrar reclamações de consumo',
        ],
        correta: 0,
        explicacao:
          'O Disque 100 é um canal de denúncia e orientação sobre violações de ' +
          'direitos humanos, incluindo casos de racismo.',
      },
    ],
  },
];

export const acessosRapidos: AcessoRapido[] = [
  {
    id: 'aprender',
    titulo: 'Aprender',
    descricao: 'Trilhas e quizzes',
    rota: '/educacao',
  },
  {
    id: 'direitos',
    titulo: 'Seus direitos',
    descricao: 'Leis e como agir',
    rota: '/direito',
  },
  {
    id: 'apoio',
    titulo: 'Apoio',
    descricao: 'Contatos e ONGs',
    rota: '/apoio',
  },
];
