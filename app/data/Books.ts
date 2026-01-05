
export interface Livros {
    id: number;
    titulo: string;
    capa: string;
    descricao?: string;
}

export const livrosfamosos: Livros[] = [
  { 
    id: 101, 
    titulo: "O Auto da Compadecida", 
    capa: "/capas/o-auto-da-compadecida.jpg", 
    descricao: "O Auto da Compadecida, de Ariano Suassuna, é uma peça teatral que mistura comédia, drama e elementos da cultura popular nordestina. A história acompanha João Grilo e Chicó, dois nordestinos pobres e espertos, que usam da astúcia para sobreviver às situações difíceis e injustiças do sertão. A obra é marcada pelo humor inteligente, crítica social e religiosidade, explorando temas como fé, moralidade, justiça e a natureza humana. Com diálogos vivos e situações improváveis, Suassuna transforma a vida simples do sertão em uma narrativa universal que combina entretenimento e reflexão profunda." 
  },
  { 
    id: 102, 
    titulo: "Vidas Secas", 
    capa: "/capas/vidas-secas.jpg",
    descricao: "De Graciliano Ramos, Vidas Secas é um marco da literatura brasileira, retratando a dura vida de uma família de retirantes no sertão nordestino, enfrentando seca, fome e exploração social. A narrativa minimalista e intensa explora a luta pela sobrevivência, a solidão e a resignação humana diante das adversidades, mostrando também momentos de afeto e esperança. A obra é reconhecida por sua linguagem direta e econômica, refletindo o sofrimento e a resistência dos mais vulneráveis, e consolidou Graciliano Ramos como um dos maiores escritores do modernismo brasileiro." 
  },
  { 
    id: 103, 
    titulo: "Torto Arado", 
    capa: "/capas/torto-arado.jpg",
    descricao: "De Itamar Vieira Junior, Torto Arado é uma obra que combina realismo social e lirismo poético, narrando a vida de duas irmãs negras no interior da Bahia. A história explora a relação profunda com a terra, os conflitos familiares, a exploração do trabalho rural e as tradições locais, revelando segredos que moldam a identidade e a resistência das protagonistas. O livro aborda também questões de gênero, racialidade e herança cultural, mostrando como a força das mulheres se entrelaça com a luta pela dignidade e reconhecimento dentro de um contexto histórico marcado pela opressão." 
  },
  { 
    id: 104, 
    titulo: "A Ilha do Tesouro", 
    capa: "/capas/ilha-do-tesouro.jpg",
    descricao: "Clássico de Robert Louis Stevenson, A Ilha do Tesouro é um romance de aventura que conquistou gerações com suas narrativas de piratas, mapas secretos e caça a tesouros. A história segue Jim Hawkins em uma jornada de coragem, astúcia e amadurecimento, enfrentando traições, perigos e dilemas morais. O livro combina suspense, ação e elementos de humor, sendo referência fundamental para a literatura de aventuras e influenciando inúmeras obras de ficção juvenil e adulta ao longo dos séculos." 
  },
  { 
    id: 105, 
    titulo: "This Bright River", 
    capa: "/capas/bright-river.jpg",
    descricao: "Romance contemporâneo que explora as complexidades das relações humanas, identidade e memória. A obra acompanha personagens em jornadas íntimas, revelando como escolhas, perdas e reconciliações moldam nossas vidas. A narrativa é sensível e poética, abordando questões de amor, amizade, solidão e a busca por sentido, oferecendo ao leitor uma reflexão profunda sobre a experiência humana em um mundo em constante transformação." 
  },
  { 
    id: 106, 
    titulo: "Tropicália", 
    capa: "/capas/tropicalia.jpg",
    descricao: "Analisa o movimento cultural brasileiro dos anos 60, conhecido como Tropicália, que uniu música, artes visuais, teatro e política. A obra mostra como artistas como Caetano Veloso e Gilberto Gil desafiaram convenções e promoveram uma renovação estética e cultural no país. Tropicália representa a fusão de tradição e modernidade, a crítica social e a inovação artística, evidenciando o poder transformador da criatividade na sociedade brasileira." 
  },
  { 
    id: 107, 
    titulo: "Os Orixás", 
    capa: "/capas/orixas.jpg",
    descricao: "Obra que apresenta a mitologia afro-brasileira e a importância dos Orixás, deuses que representam forças da natureza e valores humanos. Explora suas histórias, símbolos, rituais e influência na cultura brasileira, abordando a religião afro-brasileira como patrimônio histórico e espiritual. O livro combina pesquisa histórica, narrativa envolvente e reflexão sobre identidade cultural, diversidade religiosa e resistência histórica das tradições africanas no Brasil." 
  },
  { 
    id: 108, 
    titulo: "Brasil é Arte", 
    capa: "/capas/brasil-arte.jpg",
    descricao: "Mostra a riqueza e diversidade da arte brasileira, abordando pintura, escultura, música, arquitetura e manifestações culturais populares. A obra revela como a criatividade reflete a história, a identidade e os valores sociais do país. Além de apresentar artistas e movimentos, discute a relação entre arte, política e sociedade, mostrando como a produção artística contribui para a formação da identidade nacional e para a valorização cultural do Brasil." 
  },
  { 
    id: 109, 
    titulo: "Justiça Climática", 
    capa: "/capas/justica-climatica.jpg",
    descricao: "Discute os desafios das mudanças climáticas e a necessidade de políticas públicas e ações individuais para proteger o planeta. A obra aborda desigualdades ambientais, impactos sobre comunidades vulneráveis e a urgência da sustentabilidade. É uma leitura que une ciência, ética e reflexão social, mostrando a importância da responsabilidade coletiva e do ativismo ambiental na construção de um futuro mais justo e equilibrado." 
  },
  { 
    id: 110, 
    titulo: "Disciplina", 
    capa: "/capas/disciplina.jpg",
    descricao: "Explora a importância da disciplina na vida pessoal e profissional, mostrando como hábitos, foco, planejamento e autocontrole são fundamentais para alcançar objetivos. A obra aborda estratégias práticas para desenvolver a persistência e a organização, destacando o impacto da disciplina na produtividade, no sucesso acadêmico e no crescimento pessoal, incentivando o leitor a construir uma rotina eficiente e consciente." 
  },
];

export const livrosNovos: Livros[] = [
  { 
    id: 201, 
    titulo: "Agua Viva", 
    capa: "/capas/agua-viva.jpg",
    descricao: "De Clarice Lispector, Agua Viva é uma obra poética e introspectiva que explora o fluxo do pensamento, a percepção do tempo e a experiência de estar viva. A narrativa não-linear reflete a consciência da autora, seus questionamentos sobre a existência, arte, linguagem e a intensidade da vida cotidiana, oferecendo ao leitor uma experiência sensorial e emocional única." 
  },
  { 
    id: 202, 
    titulo: "Sopro da Vida", 
    capa: "/capas/sopro-vida.jpg",
    descricao: "Romance sensível que aborda a efemeridade da vida e os laços humanos. Com personagens complexos, a obra reflete sobre o amor, a perda, o amadurecimento e os pequenos momentos que moldam a existência, combinando poesia, introspecção e narrativa envolvente." 
  },
  { 
    id: 203, 
    titulo: "Livro da Selva", 
    capa: "/capas/livro-selva.jpg",
    descricao: "Clássico de Rudyard Kipling, conta a história de Mowgli, um menino criado por lobos na selva. A obra aborda amizade, coragem, sobrevivência e o equilíbrio entre natureza e sociedade, explorando temas de crescimento, moralidade e aventura em um ambiente selvagem e fascinante." 
  },
  { 
    id: 204, 
    titulo: "Macunaíma", 
    capa: "/capas/mucunaima.jpg",
    descricao: "De Mário de Andrade, Macunaíma é um romance modernista que mistura humor, mitologia, crítica social e regionalismo. A obra narra as aventuras do herói anti-herói brasileiro, explorando a identidade cultural do país, a diversidade de costumes e línguas e o encontro entre tradição e modernidade, sendo um marco da literatura nacional." 
  },
  { 
    id: 206, 
    titulo: "Infância", 
    capa: "/capas/infancia.jpg",
    descricao: "Memórias de infância que refletem inocência, descobertas, curiosidade e os primeiros passos na compreensão do mundo e das relações humanas. A obra é poética e sensível, mostrando como experiências simples moldam personalidade e percepção de vida, valorizando recordações afetivas e culturais." 
  },
  { 
    id: 207, 
    titulo: "O Lustre", 
    capa: "/capas/lustre.jpg",
    descricao: "Romance psicológico que explora memórias, relações familiares e perdas emocionais. A obra investiga sentimentos humanos complexos, a passagem do tempo e a construção da identidade, oferecendo reflexão sobre o amor, arrependimento e os laços afetivos que definem nossas vidas." 
  },
  { 
    id: 208, 
    titulo: "Hora da Estrela", 
    capa: "/capas/hora-estrela.jpg",
    descricao: "Clarice Lispector narra a vida de Macabéa, jovem nordestina em busca de identidade e significado em meio à invisibilidade social e à pobreza urbana. A obra combina sensibilidade, crítica social e introspecção, explorando a solidão, a alienação e o desejo humano por reconhecimento e transformação." 
  },
];
