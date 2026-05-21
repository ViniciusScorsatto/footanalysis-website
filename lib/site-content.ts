export type Locale = "en" | "pt";

type NavItem = {
  label: string;
  href: string;
};

type LinkItem = {
  label: string;
  href: string;
  handle: string;
  blurb: string;
};

type StatItem = {
  label: string;
  value: string;
  note: string;
};

type FeatureItem = {
  title: string;
  description: string;
};

type AffiliateItem = FeatureItem & {
  href: string;
  cta: string;
  tag: string;
};

type CoverageItem = {
  name: string;
  tag: string;
  blurb: string;
  features?: string[];
};

type PartnerFormat = {
  name: string;
  description: string;
};

type CopyBlock = {
  eyebrow: string;
  title: string;
  description: string;
};

export type LocaleContent = {
  locale: Locale;
  languageName: string;
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    about: string;
    advertise: string;
    switchLabel: string;
    items: NavItem[];
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    primaryHref: string;
    secondaryCta: string;
    secondaryHref: string;
  };
  trustStrip: string[];
  socials: LinkItem[];
  coverage: {
    heading: CopyBlock;
    items: CoverageItem[];
  };
  affiliates: {
    heading: CopyBlock;
    items: AffiliateItem[];
  };
  sponsorReasons: {
    heading: CopyBlock;
    items: FeatureItem[];
  };
  about: {
    hero: CopyBlock;
    story: string[];
    principles: FeatureItem[];
  };
  advertise: {
    hero: CopyBlock;
    audienceTitle: string;
    stats: StatItem[];
    platformTitle: string;
    platformBullets: string[];
    formatsTitle: string;
    formats: PartnerFormat[];
    formTitle: string;
    formDescription: string;
    directEmailLabel: string;
  };
  footer: {
    statement: string;
    contactLabel: string;
    copyright: string;
  };
  form: {
    name: string;
    email: string;
    company: string;
    product: string;
    budget: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
  contactEmail: string;
};

const enContent: LocaleContent = {
  locale: "en",
  languageName: "English",
  metadata: {
    title: "FootAnalysys | Football Media for Fans and Brands",
    description:
      "FootAnalysys is a bilingual football media brand delivering premium analysis, creator-led storytelling, and sponsor-ready audience reach."
  },
  nav: {
    home: "Home",
    about: "About",
    advertise: "Advertise",
    switchLabel: "Portuguese",
    items: [
      { label: "Home", href: "/en" },
      { label: "About", href: "/en/about" },
      { label: "Advertise", href: "/en/advertise" }
    ]
  },
  hero: {
    eyebrow: "Football analysis with editorial depth",
    title: "A serious football media brand built for modern fans and ambitious partners.",
    description:
      "FootAnalysys translates football into sharp, watchable storytelling across YouTube, TikTok, and Instagram. The English channel is built for global reach, focused audience attention, and brand-safe football coverage.",
    primaryCta: "Explore sponsor opportunities",
    primaryHref: "/en/advertise",
    secondaryCta: "See our story",
    secondaryHref: "/en/about"
  },
  trustStrip: [
    "Premium football storytelling",
    "Platform-native short and long form",
    "Audience-ready brand integrations",
    "Bilingual media footprint"
  ],
  socials: [
    {
      label: "YouTube",
      href: "https://youtube.com/@FootAnalysysEN",
      handle: "@FootAnalysysEN",
      blurb: "Long-form analysis, tactical explainers, and anchor content for brand storytelling."
    },
    {
      label: "TikTok",
      href: "https://tiktok.com/@footanalysys_en",
      handle: "@footanalysys_en",
      blurb: "Fast, high-retention football takes designed for reach, discovery, and repeat engagement."
    },
    {
      label: "Instagram",
      href: "https://instagram.com/footanalysys_en",
      handle: "@footanalysys_en",
      blurb: "Visual football narratives, clips, and campaign-friendly social touchpoints."
    }
  ],
  coverage: {
    heading: {
      eyebrow: "Competitions covered",
      title: "The leagues and tournaments that shape our football lens.",
      description:
        "Editorial coverage can flex by season, but these are the competitions that best represent the analysis footprint we want the brand to own."
    },
    items: [
      {
        name: "Premier League",
        tag: "Weekly focus",
        blurb: "Title race, tactical shifts, standout performers, and the stories that move the global conversation."
      },
      {
        name: "Champions League",
        tag: "Big nights",
        blurb: "Knockout tension, elite-level match analysis, and sponsor-friendly marquee football moments."
      },
      {
        name: "La Liga",
        tag: "Technical game",
        blurb: "Control, structure, and storylines around clubs that drive high-level football discussion."
      },
      {
        name: "Brasileirao",
        tag: "South America",
        blurb: "Context-rich coverage of Brazilian football as part of the brand's broader bilingual identity."
      }
    ]
  },
  affiliates: {
    heading: {
      eyebrow: "Monetization by audience",
      title: "Separate affiliate space for the English football audience.",
      description:
        "Campaigns, banners, and offers can stay specific to this audience without mixing language, region, or sponsor relevance."
    },
    items: [
      {
        title: "Matchday offer",
        description: "Use this banner slot for an English-facing affiliate campaign tied to fixtures, picks, or weekly football traffic.",
        href: "#",
        cta: "Add affiliate link",
        tag: "Banner 01"
      },
      {
        title: "Evergreen football deal",
        description: "A persistent placement for betting, fantasy, apparel, or tool offers aimed at the international audience.",
        href: "#",
        cta: "Set destination",
        tag: "Banner 02"
      },
      {
        title: "Partner campaign slot",
        description: "A cleaner commercial surface for brand-safe affiliate or co-promo campaigns without crowding the homepage.",
        href: "#",
        cta: "Update banner",
        tag: "Banner 03"
      }
    ]
  },
  sponsorReasons: {
    heading: {
      eyebrow: "Why FootAnalysys",
      title: "Built to feel closer to a football publication than a casual creator page.",
      description:
        "We combine creator agility with editorial presentation so brands get cultural relevance without sacrificing professionalism."
    },
    items: [
      {
        title: "Credible football voice",
        description: "Analysis-led positioning helps partnerships feel informed, not forced."
      },
      {
        title: "Cross-platform consistency",
        description: "One brand story can travel across video, social clips, and sponsor assets."
      },
      {
        title: "Two language markets",
        description: "English and Portuguese audiences can be activated separately or under one umbrella."
      }
    ]
  },
  about: {
    hero: {
      eyebrow: "About the brand",
      title: "FootAnalysys turns football knowledge into compelling media.",
      description:
        "The project was built to treat football content with structure, taste, and analysis-first credibility."
    },
    story: [
      "FootAnalysys was created around the idea that football content can be both accessible and intelligent. The brand focuses on making tactical, cultural, and narrative angles feel clear without losing depth.",
      "The bilingual setup allows the same standard of editorial quality to reach different audiences with their own voice, partnerships, and monetization strategy."
    ],
    principles: [
      {
        title: "Analysis first",
        description: "Every piece of content should reward attention with insight."
      },
      {
        title: "Platform-native execution",
        description: "Formats adapt to the rhythm of each platform rather than reposting the same asset everywhere."
      },
      {
        title: "Commercial clarity",
        description: "Brand partnerships are designed to feel aligned with the audience and the football conversation."
      }
    ]
  },
  advertise: {
    hero: {
      eyebrow: "Advertise with us",
      title: "Partner with a football media brand that looks ready for serious campaigns.",
      description:
        "Use the metrics below as placeholders until your final channel numbers are added. The page structure is ready for a polished sponsor pitch today."
    },
    audienceTitle: "Audience overview",
    stats: [
      { label: "Monthly reach", value: "Add your real number", note: "Replace with platform-combined monthly reach." },
      { label: "Primary regions", value: "Add your real markets", note: "Example: UK, US, Canada, Europe." },
      { label: "Viewer profile", value: "Add your audience profile", note: "Example: football fans 18-34, analysis-driven." },
      { label: "Content cadence", value: "Weekly / match cycle", note: "Replace with your real publishing rhythm." }
    ],
    platformTitle: "Platform presence",
    platformBullets: [
      "YouTube for long-form football storytelling and sponsor depth.",
      "TikTok for discovery, speed, and mass football conversation moments.",
      "Instagram for repeat brand visibility and creative reinforcement."
    ],
    formatsTitle: "Partnership formats",
    formats: [
      {
        name: "Integrated video sponsorships",
        description: "Match analysis, topical segments, or recurring series with clear brand alignment."
      },
      {
        name: "Affiliate-led placements",
        description: "Localized offers, trackable links, and high-intent traffic opportunities."
      },
      {
        name: "Cross-platform campaigns",
        description: "Coordinated exposure across long-form, short-form, and supporting social content."
      }
    ],
    formTitle: "Start a sponsor conversation",
    formDescription: "Tell us about your brand, product, or campaign goal and we’ll respond with the best fit.",
    directEmailLabel: "Business email"
  },
  footer: {
    statement: "Football storytelling with clarity, credibility, and commercial intent.",
    contactLabel: "Sponsor contact",
    copyright: "FootAnalysys"
  },
  form: {
    name: "Name",
    email: "Email",
    company: "Company",
    product: "Brand or product",
    budget: "Budget or campaign scope",
    message: "Message",
    submit: "Send inquiry",
    sending: "Sending...",
    success: "Thanks. Your inquiry has been sent and we’ll be in touch soon.",
    error: "We could not send your inquiry right now. Please use the business email below."
  },
  contactEmail: "business@footanalysys.com"
};

const ptContent: LocaleContent = {
  locale: "pt",
  languageName: "Português",
  metadata: {
    title: "FootAnalysys | Midia de Futebol para Publico e Marcas",
    description:
      "FootAnalysys e uma marca bilingue de midia de futebol com analise, narrativa premium e espaco profissional para patrocinadores."
  },
  nav: {
    home: "Inicio",
    about: "Sobre",
    advertise: "Anuncie",
    switchLabel: "English",
    items: [
      { label: "Inicio", href: "/pt" },
      { label: "Sobre", href: "/pt/about" },
      { label: "Anuncie", href: "/pt/advertise" }
    ]
  },
  hero: {
    eyebrow: "Analise editorial para quem vive futebol",
    title: "Um projeto de futebol com identidade forte, contexto e cara de marca seria.",
    description:
      "A FootAnalysys transforma futebol em conteudo com leitura de jogo, narrativa e presenca visual. A operacao em portugues foi desenhada para falar com esse publico com voz propria e com espaco comercial separado.",
    primaryCta: "Ver oportunidades para marcas",
    primaryHref: "/pt/advertise",
    secondaryCta: "Conheca a marca",
    secondaryHref: "/pt/about"
  },
  trustStrip: [
    "Narrativa premium de futebol",
    "Conteudo adaptado por plataforma",
    "Integracoes pensadas para patrocinio",
    "Presenca bilingue com segmentacao"
  ],
  socials: [
    {
      label: "YouTube",
      href: "https://youtube.com/@FootAnalysysPT",
      handle: "@FootAnalysysPT",
      blurb: "Analises, contextos e historias de futebol em formato ideal para profundidade e autoridade."
    },
    {
      label: "TikTok",
      href: "https://tiktok.com/@footanalysys_pt",
      handle: "@footanalysys_pt",
      blurb: "Conteudo curto com potencial de alcance, recorrencia e conversa rapida com o torcedor."
    },
    {
      label: "Instagram",
      href: "https://instagram.com/footanalysys_pt",
      handle: "@footanalysys_pt",
      blurb: "Presenca visual para reforco de marca, recortes de conteudo e campanhas."
    }
  ],
  coverage: {
    heading: {
      eyebrow: "Campeonatos que cobrimos",
      title: "O mapa editorial do canal em portugues.",
      description:
        "Cada competicao tem um papel claro no conteudo: resultados, palpites, tabelas, artilharia e leitura de ritmo quando fizer sentido para o torneio."
    },
    items: [
      {
        name: "Brasileirao Serie A",
        tag: "Elite nacional",
        blurb: "O principal eixo do futebol brasileiro, com leitura de rodada e contexto competitivo.",
        features: [
          "Ultimos resultados da rodada",
          "Palpites da proxima rodada",
          "Artilheiros da edicao atual",
          "Ritmo de campeao por aproveitamento",
          "Ritmo de rebaixamento por aproveitamento"
        ]
      },
      {
        name: "Copa do Brasil",
        tag: "Mata-mata",
        blurb: "Confrontos eliminatorios, zebras, favoritos e jogos que mudam o calendario dos clubes.",
        features: ["Ultimos resultados", "Palpites"]
      },
      {
        name: "Brasileirao Serie B",
        tag: "Acesso",
        blurb: "A briga pelo acesso, a pressao da tabela e os clubes que movimentam a segunda divisao.",
        features: ["Classificacao", "Ultimos resultados"]
      },
      {
        name: "Brasileirao Serie C",
        tag: "Decisao",
        blurb: "Cobertura objetiva da tabela, dos resultados e dos recortes que importam na competicao.",
        features: ["Classificacao", "Ultimos resultados"]
      },
      {
        name: "Copa Libertadores",
        tag: "Continental",
        blurb: "Peso competitivo, rivalidade sul-americana e grandes noites do calendario.",
        features: ["Classificacao", "Mata-mata", "Artilheiros", "Ultima rodada", "Palpites"]
      },
      {
        name: "Copa Sul-Americana",
        tag: "Sul-americana",
        blurb: "Um torneio forte para contexto regional, campanhas emergentes e jogos decisivos.",
        features: ["Classificacao", "Mata-mata", "Artilheiros", "Ultima rodada", "Palpites"]
      },
      {
        name: "Copa do Mundo",
        tag: "Global",
        blurb: "Cobertura especial para o maior palco do futebol, conectando selecoes, grupos e mata-mata.",
        features: ["Grupos e classificacao", "Mata-mata", "Artilheiros", "Ultima rodada", "Palpites"]
      }
    ]
  },
  affiliates: {
    heading: {
      eyebrow: "Monetizacao segmentada",
      title: "Espaco comercial separado para o publico em portugues.",
      description:
        "Links afiliados, banners e campanhas ficam adaptados ao idioma, regiao e perfil desse publico sem conflito com a operacao em ingles."
    },
    items: [
      {
        title: "Oferta da rodada",
        description: "Use este espaco para uma campanha afiliada em portugues ligada a rodada, palpites ou calendario do momento.",
        href: "#",
        cta: "Adicionar link afiliado",
        tag: "Banner 01"
      },
      {
        title: "Oferta evergreen de futebol",
        description: "Um banner fixo para apostas, fantasy, camisa, app ou qualquer oferta com aderencia ao publico do canal.",
        href: "#",
        cta: "Definir destino",
        tag: "Banner 02"
      },
      {
        title: "Campanha de parceiro",
        description: "Um bloco comercial mais limpo para divulgacao afiliada ou co-promocao sem poluir o resto da home.",
        href: "#",
        cta: "Atualizar banner",
        tag: "Banner 03"
      }
    ]
  },
  sponsorReasons: {
    heading: {
      eyebrow: "Por que a FootAnalysys",
      title: "Uma presenca que parece mais uma marca editorial do que uma pagina improvisada.",
      description:
        "A combinacao de analise, identidade visual e consistencia multiplataforma ajuda a dar confianca para audiencia e anunciantes."
    },
    items: [
      {
        title: "Autoridade em futebol",
        description: "A analise cria contexto para parcerias parecerem naturais e criveis."
      },
      {
        title: "Consistencia de marca",
        description: "A mesma proposta pode viver em video longo, corte curto e reforco social."
      },
      {
        title: "Dois mercados de idioma",
        description: "Ingles e portugues podem ser trabalhados separados ou como pacote unico."
      }
    ]
  },
  about: {
    hero: {
      eyebrow: "Sobre a marca",
      title: "A FootAnalysys transforma conhecimento de futebol em uma experiencia de midia.",
      description:
        "O projeto nasceu para tratar conteudo de futebol com estrutura, gosto e credibilidade analitica."
    },
    story: [
      "A FootAnalysys foi criada com a ideia de que conteudo de futebol pode ser acessivel sem perder inteligencia. A marca busca tornar mais claros os angulos taticos, culturais e narrativos do jogo.",
      "A estrutura bilingue permite manter o mesmo padrao editorial ao mesmo tempo em que adapta voz, patrocinio e monetizacao para cada audiencia."
    ],
    principles: [
      {
        title: "Analise em primeiro lugar",
        description: "Cada conteudo precisa recompensar a atencao com contexto e leitura de jogo."
      },
      {
        title: "Execucao pensada por plataforma",
        description: "Os formatos respeitam a linguagem de cada canal em vez de repetir a mesma peca."
      },
      {
        title: "Clareza comercial",
        description: "As parcerias sao montadas para combinar com a audiencia e com a conversa sobre futebol."
      }
    ]
  },
  advertise: {
    hero: {
      eyebrow: "Anuncie com a gente",
      title: "Apresente sua marca em um ambiente de futebol com cara de projeto serio.",
      description:
        "Os numeros abaixo estao prontos para receber seus dados reais. A estrutura da pagina ja funciona como base para um pitch comercial profissional."
    },
    audienceTitle: "Visao da audiencia",
    stats: [
      { label: "Alcance mensal", value: "Adicionar numero real", note: "Trocar pelo alcance mensal combinado das plataformas." },
      { label: "Mercados principais", value: "Adicionar mercados reais", note: "Exemplo: Brasil, Portugal, comunidades lusofonas." },
      { label: "Perfil do publico", value: "Adicionar perfil real", note: "Exemplo: torcedores 18-34, foco em analise." },
      { label: "Frequencia de conteudo", value: "Semanal / calendario de jogos", note: "Trocar pelo seu ritmo real de publicacao." }
    ],
    platformTitle: "Presenca por plataforma",
    platformBullets: [
      "YouTube para profundidade, narrativa de futebol e espaco maior para patrocinio.",
      "TikTok para descoberta, alcance e reacao rapida aos assuntos do momento.",
      "Instagram para reforco visual, recorrencia e continuidade de campanha."
    ],
    formatsTitle: "Formatos de parceria",
    formats: [
      {
        name: "Patrocinio em video",
        description: "Integracoes em analises, quadros recorrentes ou conteudo tematico com contexto."
      },
      {
        name: "Espacos afiliados",
        description: "Ofertas localizadas, links rastreaveis e oportunidade de trafego qualificado."
      },
      {
        name: "Campanhas multiplataforma",
        description: "Exposicao coordenada entre video longo, video curto e apoio social."
      }
    ],
    formTitle: "Comece uma conversa comercial",
    formDescription: "Envie detalhes sobre sua marca, produto ou objetivo de campanha e responderemos com o melhor formato.",
    directEmailLabel: "Email comercial"
  },
  footer: {
    statement: "Narrativa de futebol com clareza, credibilidade e intencao comercial.",
    contactLabel: "Contato para marcas",
    copyright: "FootAnalysys"
  },
  form: {
    name: "Nome",
    email: "Email",
    company: "Empresa",
    product: "Marca ou produto",
    budget: "Orcamento ou escopo da campanha",
    message: "Mensagem",
    submit: "Enviar contato",
    sending: "Enviando...",
    success: "Obrigado. Seu contato foi enviado e responderemos em breve.",
    error: "Nao foi possivel enviar agora. Use o email comercial abaixo."
  },
  contactEmail: "business@footanalysys.com"
};

export const localeContent: Record<Locale, LocaleContent> = {
  en: enContent,
  pt: ptContent
};

export const locales: Locale[] = ["en", "pt"];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleContent(locale: string): LocaleContent {
  if (!isLocale(locale)) {
    return localeContent.en;
  }

  return localeContent[locale];
}
