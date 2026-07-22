import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Accessibility,
  HeartPulse,
  GraduationCap,
  Users,
  Palette,
  MapPin,
  HandHeart,
  Sparkles,
  X,
  ChevronDown,
  FileText,
  Landmark,
  Trophy,
  Bus,
  Ambulance,
  School,
  Building2,
  Scale,
  Calendar,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ---------- helpers ---------- */

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-navy">
      <Sparkles className="h-3.5 w-3.5 text-gold" />
      {children}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============ 1. ATUAÇÃO PARLAMENTAR ============ */

type Eixo = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: "gold" | "green" | "navy";
  projetos: string[];
};

const EIXOS: Eixo[] = [
  {
    icon: Accessibility,
    title: "Inclusão e Autismo",
    desc: "Proteção, direitos e políticas públicas para pessoas com TEA e suas famílias.",
    color: "gold",
    projetos: [
      "Proteção às pessoas com TEA em relação aos fogos de artifício",
      "Instituição do Dia e Semana do Orgulho Autista",
      "Selo Salão Amigo do Autista",
      "Selo Templo Religioso Amigo do Autista",
      "Atendimento odontológico especializado",
      "Combate à discriminação contra pessoas com TEA",
    ],
  },
  {
    icon: HeartPulse,
    title: "Saúde",
    desc: "Investimentos em hospitais, equipamentos e ampliação do acesso ao cuidado.",
    color: "green",
    projetos: [
      "Apoio ao Hospital Universitário da UENF",
      "Ambulância para São Francisco de Itabapoana",
      "Transparência nos planos de saúde",
      "Programa de apoio em desastres",
      "R$ 2,63 milhões em emendas destinadas à Saúde",
    ],
  },
  {
    icon: GraduationCap,
    title: "Educação",
    desc: "Reformas, equipamentos e oportunidades para estudantes de todo o estado.",
    color: "navy",
    projetos: [
      "Reforma de escolas estaduais",
      "Equipamentos para escolas",
      "Pré-vestibular social",
      "Atividades de conscientização sobre TEA nas escolas",
      "R$ 2,81 milhões investidos em Educação",
    ],
  },
  {
    icon: Users,
    title: "Direitos das Mulheres",
    desc: "Enfrentamento à violência e ampliação de oportunidades para mulheres fluminenses.",
    color: "gold",
    projetos: [
      "Fortalecimento de redes de apoio à mulher",
      "Ações de conscientização e prevenção",
      "Apoio a projetos de autonomia econômica",
    ],
  },
  {
    icon: Palette,
    title: "Cultura",
    desc: "Fomento à produção cultural e à identidade dos municípios fluminenses.",
    color: "green",
    projetos: [
      "R$ 1,54 milhão em emendas culturais",
      "Conteúdos inclusivos na TV pública",
      "Apoio a projetos culturais em municípios do interior",
    ],
  },
  {
    icon: MapPin,
    title: "Desenvolvimento Regional",
    desc: "Interior forte: infraestrutura, turismo e geração de renda longe das capitais.",
    color: "navy",
    projetos: [
      "Acessibilidade no ecoturismo",
      "Apoio ao Porto do Açu e ao Norte Fluminense",
      "Investimentos em municípios beneficiados",
    ],
  },
  {
    icon: HandHeart,
    title: "Assistência Social",
    desc: "Proteção às famílias em situação de vulnerabilidade em todo o Rio de Janeiro.",
    color: "gold",
    projetos: [
      "R$ 1,34 milhão em Assistência Social",
      "Apoio a entidades socioassistenciais",
      "Suporte a APAEs em diversos municípios",
    ],
  },
  {
    icon: Accessibility,
    title: "Pessoas com Deficiência",
    desc: "Mobilidade, acessibilidade e dignidade para PcDs em todo o estado.",
    color: "green",
    projetos: [
      "Micro-ônibus para transporte de pessoas com deficiência",
      "Van adaptada para o Centro Terapêutico Pedro Machado",
      "Transporte intermunicipal provisório para PcDs",
      "Cadastro estadual de estabelecimentos inclusivos",
      "Transparência sobre inclusão no mercado de trabalho",
    ],
  },
];

function colorClasses(c: Eixo["color"]) {
  if (c === "gold")
    return {
      icon: "gradient-gold text-navy-deep shadow-gold",
      badge: "bg-gold/10 text-navy border-gold/30",
    };
  if (c === "green")
    return {
      icon: "gradient-green text-white shadow-green",
      badge: "bg-green/10 text-green-deep border-green/30",
    };
  return {
    icon: "bg-navy text-white shadow-elegant",
    badge: "bg-navy/10 text-navy border-navy/30",
  };
}

export function AtuacaoParlamentar() {
  const [open, setOpen] = useState<Eixo | null>(null);
  return (
    <section id="atuacao" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Mandato · Deputada Estadual</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-black text-navy sm:text-5xl">
            Um mandato de trabalho e{" "}
            <span className="text-gradient-gold">resultados</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Conheça algumas das principais ações desenvolvidas durante o mandato
            como Deputada Estadual — organizadas por eixos de atuação.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EIXOS.map((eixo, i) => {
            const cls = colorClasses(eixo.color);
            const Icon = eixo.icon;
            return (
              <Reveal key={eixo.title} delay={i * 0.05}>
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant">
                  <div
                    className={`grid h-14 w-14 place-items-center rounded-2xl ${cls.icon}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-navy">
                    {eixo.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {eixo.desc}
                  </p>
                  <button
                    onClick={() => setOpen(eixo)}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
                  >
                    Ver atuação
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-navy-deep/70 p-4 backdrop-blur-sm"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-elegant"
            >
              <div className="gradient-hero relative p-8 text-white">
                <button
                  onClick={() => setOpen(null)}
                  aria-label="Fechar"
                  className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
                <div
                  className={`inline-grid h-14 w-14 place-items-center rounded-2xl ${colorClasses(open.color).icon}`}
                >
                  <open.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                  {open.title}
                </h3>
                <p className="mt-2 text-sm text-white/85">{open.desc}</p>
              </div>
              <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
                <div className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Principais projetos e ações
                </div>
                <ul className="space-y-3">
                  {open.projetos.map((p) => (
                    <li key={p} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green" />
                      <span className="text-sm leading-relaxed text-navy">
                        {p}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============ 2. PROJETOS DE LEI ============ */

const PROJETOS_CATEGORIAS = [
  {
    categoria: "Inclusão e Autismo",
    projetos: [
      {
        titulo: "Proteção às pessoas com TEA quanto aos fogos de artifício",
        impacto:
          "Restringe fogos com estampido em áreas próximas a pessoas com Transtorno do Espectro Autista.",
      },
      {
        titulo: "Dia e Semana do Orgulho Autista",
        impacto:
          "Institui data oficial para conscientização e valorização das pessoas com TEA.",
      },
      {
        titulo: "Atividades de conscientização nas escolas",
        impacto:
          "Promove a inclusão desde a educação básica com formação e sensibilização.",
      },
      {
        titulo: "Acessibilidade no ecoturismo",
        impacto:
          "Garante que áreas naturais sejam acessíveis a pessoas com deficiência e TEA.",
      },
      {
        titulo: "Semana Estadual da Acessibilidade",
        impacto:
          "Mobiliza o poder público e a sociedade em torno da acessibilidade universal.",
      },
      {
        titulo: "Conteúdos inclusivos na TV pública",
        impacto:
          "Amplia a representatividade e o acesso à informação para pessoas com deficiência.",
      },
      {
        titulo: "Programa de apoio em desastres",
        impacto:
          "Cria protocolo de atendimento prioritário a pessoas com TEA em situações de emergência.",
      },
      {
        titulo: "Transparência nos planos de saúde",
        impacto:
          "Obriga divulgação clara sobre cobertura de terapias e tratamentos para TEA.",
      },
      {
        titulo: "Selo Salão Amigo do Autista",
        impacto:
          "Reconhece estabelecimentos de beleza preparados para atender pessoas com TEA.",
      },
      {
        titulo: "Selo Templo Religioso Amigo do Autista",
        impacto:
          "Certifica templos que oferecem ambientes acolhedores e inclusivos.",
      },
      {
        titulo: "Atendimento odontológico especializado",
        impacto:
          "Garante rede de atendimento adaptado às necessidades de pessoas com TEA.",
      },
      {
        titulo: "Transporte intermunicipal provisório para PcDs",
        impacto:
          "Cria mecanismo emergencial para garantir mobilidade a pessoas com deficiência.",
      },
      {
        titulo: "Combate à discriminação contra pessoas com TEA",
        impacto:
          "Estabelece sanções administrativas para casos de discriminação.",
      },
      {
        titulo: "Cadastro estadual de estabelecimentos inclusivos",
        impacto:
          "Facilita a identificação de locais preparados para receber PcDs e pessoas com TEA.",
      },
      {
        titulo: "Transparência sobre inclusão no mercado de trabalho",
        impacto:
          "Amplia o monitoramento da lei de cotas e da inclusão de PcDs no trabalho.",
      },
    ],
  },
];

export function ProjetosDeLei() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="projetos" className="relative bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Legislativo · ALERJ</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-black text-navy sm:text-5xl">
            Projetos que{" "}
            <span className="text-gradient-gold">transformam vidas</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Uma legislação sensível, técnica e construída ao lado das pessoas.
          </p>
        </Reveal>

        {PROJETOS_CATEGORIAS.map((cat) => (
          <div key={cat.categoria} className="mt-16">
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-gold text-navy-deep shadow-gold">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl font-bold text-navy sm:text-3xl">
                  {cat.categoria}
                </h3>
              </div>
            </Reveal>

            <div className="grid gap-3">
              {cat.projetos.map((p, i) => {
                const isOpen = openIdx === i;
                return (
                  <Reveal key={p.titulo} delay={i * 0.02}>
                    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : i)}
                        className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-secondary/50"
                      >
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy/5 font-display text-sm font-bold text-navy">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-display text-base font-semibold text-navy">
                            {p.titulo}
                          </div>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-navy transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-border bg-secondary/40 px-5 py-4 pl-[76px]">
                              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                                Impacto
                              </div>
                              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                {p.impacto}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ 3. PRESTAÇÃO DE CONTAS ============ */

function CountCard({
  value,
  prefix = "",
  suffix = "",
  label,
  decimals = 0,
  icon: Icon,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const v = useCountUp(value, 1800, inView);
  const formatted = v.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  const fullText = `${prefix}${formatted}${suffix}`;
  const isLong = fullText.length > 9;
  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-gold/40"
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl gradient-gold text-navy-deep shadow-gold">
        <Icon className="h-6 w-6" />
      </div>
      <div
        className={`mt-5 whitespace-nowrap font-display font-black tabular-nums text-white ${
          isLong ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {fullText}
      </div>
      <div className="mt-2 text-sm font-medium text-white/70">{label}</div>
    </div>
  );
}

export function PrestacaoContasMandato() {
  return (
    <section
      id="prestacao"
      className="relative overflow-hidden bg-navy-deep py-24 text-white sm:py-32"
    >
      <div className="absolute inset-0 opacity-40 gradient-hero" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            <Scale className="h-3.5 w-3.5" />
            Transparência total
          </div>
          <h2 className="mt-5 font-display text-4xl font-black sm:text-5xl">
            Prestação de <span className="text-gradient-gold">Contas</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/75">
            Cada real destinado ao Rio, com transparência e responsabilidade.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CountCard
            icon={Landmark}
            prefix="R$ "
            value={8785990}
            label="Em emendas impositivas"
          />
          <CountCard icon={FileText} value={40} label="Emendas destinadas" />
          <CountCard icon={MapPin} value={30} suffix="+" label="Municípios beneficiados" />
          <CountCard icon={HeartPulse} prefix="R$ " value={2637452.7} decimals={2} label="Investidos em Saúde" />
          <CountCard icon={GraduationCap} prefix="R$ " value={2818381.7} decimals={2} label="Investidos em Educação" />
          <CountCard icon={Palette} prefix="R$ " value={1547155.6} decimals={2} label="Investidos em Cultura" />
          <CountCard icon={HandHeart} prefix="R$ " value={1340000} label="Assistência Social" />
          <CountCard icon={Trophy} prefix="R$ " value={443000} label="Desporto e Lazer" />
        </div>
      </div>
    </section>
  );
}

/* ============ 4. INVESTIMENTOS POR ÁREA ============ */

const INVESTIMENTOS = [
  { area: "Educação", valor: 2818381.7, color: "var(--navy)", icon: GraduationCap },
  { area: "Saúde", valor: 2637452.7, color: "var(--green)", icon: HeartPulse },
  { area: "Cultura", valor: 1547155.6, color: "var(--gold)", icon: Palette },
  { area: "Assistência Social", valor: 1340000, color: "var(--navy-soft)", icon: HandHeart },
  { area: "Desporto e Lazer", valor: 443000, color: "var(--green-deep)", icon: Trophy },
];

export function InvestimentosPorArea() {
  const total = INVESTIMENTOS.reduce((s, i) => s + i.valor, 0);
  const max = Math.max(...INVESTIMENTOS.map((i) => i.valor));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="investimentos" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Onde cada real foi aplicado</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-black text-navy sm:text-5xl">
            Investimentos por <span className="text-gradient-gold">Área</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            <span className="whitespace-nowrap tabular-nums">
              R${" "}
              {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>{" "}
            distribuídos com critério e sensibilidade social.
          </p>
        </Reveal>

        <div ref={ref} className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            {INVESTIMENTOS.map((i, idx) => {
              const pct = (i.valor / max) * 100;
              const Icon = i.icon;
              return (
                <div key={i.area}>
                  <div className="flex items-end justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-9 w-9 place-items-center rounded-lg text-white"
                        style={{ background: i.color }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="font-display font-semibold text-navy">
                        {i.area}
                      </div>
                    </div>
                    <div className="whitespace-nowrap font-display text-lg font-bold text-navy tabular-nums">
                      R${" "}
                      {i.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${pct}%` } : {}}
                      transition={{
                        duration: 1.4,
                        delay: idx * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full rounded-full"
                      style={{ background: i.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Donut */}
          <div className="grid place-items-center rounded-3xl border border-border bg-card p-8 shadow-soft">
            <svg viewBox="0 0 200 200" className="h-64 w-64 -rotate-90">
              {(() => {
                let acc = 0;
                const R = 80;
                const C = 2 * Math.PI * R;
                return INVESTIMENTOS.map((i, idx) => {
                  const frac = i.valor / total;
                  const dash = frac * C;
                  const gap = C - dash;
                  const el = (
                    <motion.circle
                      key={i.area}
                      cx="100"
                      cy="100"
                      r={R}
                      fill="transparent"
                      stroke={i.color}
                      strokeWidth="26"
                      strokeDasharray={`${dash} ${gap}`}
                      strokeDashoffset={-acc}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ duration: 0.6, delay: idx * 0.15 }}
                    />
                  );
                  acc += dash;
                  return el;
                });
              })()}
            </svg>
            <div className="mt-6 grid w-full grid-cols-1 gap-2 text-sm">
              {INVESTIMENTOS.map((i) => (
                <div key={i.area} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-sm"
                      style={{ background: i.color }}
                    />
                    <span className="text-navy">{i.area}</span>
                  </div>
                  <span className="font-semibold text-muted-foreground">
                    {((i.valor / total) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ 5. MAPA DE ATUAÇÃO ============ */

export type Cidade = {
  id: string;
  nome: string;
  lat: number;
  lng: number;
  emendas: number;
  valor: number;
  investimentos: string[];
  destaques?: string[];
  instituicoes?: number;
};

const CIDADES: Cidade[] = [
  {
    id: "sjb",
    nome: "São João da Barra",
    lat: -21.6395,
    lng: -41.0511,
    emendas: 4,
    valor: 620000,
    investimentos: ["Educação", "Saúde", "Cultura"],
    destaques: ["Porto do Açu", "Centro terapêutico TEA", "Escolas rurais"],
    instituicoes: 32,
  },
  {
    id: "campos",
    nome: "Campos dos Goytacazes",
    lat: -21.7545,
    lng: -41.3244,
    emendas: 6,
    valor: 1450000,
    investimentos: ["Apoio ao HU-UENF", "Educação", "Assistência Social"],
    destaques: ["Reforma de UBS", "Apoio a APAE", "Educação técnica"],
    instituicoes: 24,
  },
  {
    id: "sfi",
    nome: "São Francisco de Itabapoana",
    lat: -21.5407,
    lng: -41.1097,
    emendas: 3,
    valor: 480000,
    investimentos: ["Ambulância", "Educação"],
    destaques: ["Saúde da mulher", "Estradas vicinais", "Cultura popular"],
    instituicoes: 12,
  },
  {
    id: "paty",
    nome: "Paty do Alferes",
    lat: -22.4227,
    lng: -43.4278,
    emendas: 2,
    valor: 260000,
    investimentos: ["Assistência Social", "Cultura"],
    destaques: ["Agricultura familiar", "Educação rural"],
    instituicoes: 6,
  },
  {
    id: "quissama",
    nome: "Quissamã",
    lat: -22.105,
    lng: -41.4692,
    emendas: 3,
    valor: 380000,
    investimentos: ["Educação", "Esporte"],
    destaques: ["Assistência social", "Esporte comunitário"],
    instituicoes: 8,
  },
  {
    id: "itaborai",
    nome: "Itaboraí",
    lat: -22.7444,
    lng: -42.8594,
    emendas: 4,
    valor: 620000,
    investimentos: ["Saúde", "Cultura"],
  },
  {
    id: "miracema",
    nome: "Miracema",
    lat: -21.4189,
    lng: -42.1978,
    emendas: 2,
    valor: 240000,
    investimentos: ["Educação", "Assistência Social"],
  },
  {
    id: "porciuncula",
    nome: "Porciúncula",
    lat: -20.9765,
    lng: -42.0511,
    emendas: 2,
    valor: 210000,
    investimentos: ["Cultura", "Educação"],
  },
  {
    id: "niguacu",
    nome: "Nova Iguaçu",
    lat: -22.7592,
    lng: -43.4511,
    emendas: 5,
    valor: 780000,
    investimentos: ["Saúde", "Educação", "Inclusão"],
  },
  {
    id: "rj",
    nome: "Rio de Janeiro",
    lat: -22.9068,
    lng: -43.1729,
    emendas: 8,
    valor: 1620000,
    investimentos: ["Saúde", "Cultura", "Inclusão", "Assistência Social"],
  },
];

export function MapaAtuacao() {
  const [sel, setSel] = useState<Cidade | null>(CIDADES[0]);
  const [RealMap, setRealMap] = useState<typeof import("./real-map").default | null>(
    null,
  );

  useEffect(() => {
    let alive = true;
    import("./real-map").then((mod) => {
      if (alive) setRealMap(() => mod.default);
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section id="mapa-atuacao" className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Territorialidade · Rio de Janeiro</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-black text-navy sm:text-5xl">
            Mapa de <span className="text-gradient-gold">Atuação</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Municípios contemplados pelas emendas e ações do mandato. Clique em
            uma cidade para ver os detalhes.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-navy-deep p-4 shadow-elegant sm:p-8">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              {RealMap ? (
                <RealMap cidades={CIDADES} sel={sel} onSelect={setSel} />
              ) : (
                <div className="grid h-full w-full place-items-center text-sm text-white/40">
                  Carregando mapa…
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 px-2 text-xs font-medium text-white/70">
              <span className="inline-flex items-center gap-2">
                <i className="inline-block h-3 w-3 rounded-full border-2 border-white bg-gold" />
                Município selecionado
              </span>
              <span className="inline-flex items-center gap-2">
                <i className="inline-block h-2.5 w-2.5 rounded-full border-2 border-white bg-green" />
                Município atendido
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {sel && (
              <motion.aside
                key={sel.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-border bg-card p-8 shadow-soft"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-navy">
                  <MapPin className="h-3.5 w-3.5 text-gold" />
                  Município
                </div>
                <h3 className="mt-4 font-display text-3xl font-bold text-navy">
                  {sel.nome}
                </h3>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-secondary p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Emendas
                    </div>
                    <div className="mt-1 font-display text-3xl font-black text-navy">
                      {sel.emendas}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-secondary p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Destinado
                    </div>
                    <div className="mt-1 whitespace-nowrap font-display text-xl font-black text-navy tabular-nums">
                      R${" "}
                      {sel.valor.toLocaleString("pt-BR")}
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                    Principais investimentos
                  </div>
                  <ul className="mt-3 space-y-2">
                    {sel.investimentos.map((i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-navy"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>

                {sel.destaques && sel.destaques.length > 0 && (
                  <div className="mt-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                      Destaques locais
                    </div>
                    <ul className="mt-3 space-y-2">
                      {sel.destaques.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm text-navy/85"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {typeof sel.instituicoes === "number" && (
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <div className="text-sm text-muted-foreground">
                      Instituições beneficiadas
                    </div>
                    <div className="font-display text-2xl font-black text-navy">
                      {sel.instituicoes}
                    </div>
                  </div>
                )}
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ============ 6. PRINCIPAIS ENTREGAS ============ */

const ENTREGAS = [
  {
    icon: Ambulance,
    titulo: "Ambulância para São Francisco de Itabapoana",
    desc: "Fortalecimento do atendimento de urgência no Norte Fluminense.",
    municipio: "São Francisco de Itabapoana",
    color: "green",
  },
  {
    icon: Bus,
    titulo: "Micro-ônibus para PcDs",
    desc: "Transporte adaptado para pessoas com deficiência.",
    municipio: "Regional",
    color: "gold",
  },
  {
    icon: Bus,
    titulo: "Van adaptada — Centro Terapêutico Pedro Machado",
    desc: "Mobilidade digna para o atendimento terapêutico.",
    municipio: "Norte Fluminense",
    color: "navy",
  },
  {
    icon: Building2,
    titulo: "Apoio ao Hospital Universitário da UENF",
    desc: "Reforço à saúde pública e ao ensino médico do interior.",
    municipio: "Campos dos Goytacazes",
    color: "green",
  },
  {
    icon: School,
    titulo: "Reforma de escolas estaduais",
    desc: "Salas adequadas, seguras e acolhedoras para estudantes.",
    municipio: "Diversos municípios",
    color: "navy",
  },
  {
    icon: GraduationCap,
    titulo: "Equipamentos para escolas",
    desc: "Tecnologia e infraestrutura para o aprendizado.",
    municipio: "Diversos municípios",
    color: "gold",
  },
  {
    icon: GraduationCap,
    titulo: "Pré-vestibular social",
    desc: "Oportunidade de acesso ao ensino superior para estudantes de baixa renda.",
    municipio: "Regional",
    color: "green",
  },
  {
    icon: HandHeart,
    titulo: "Apoio às APAEs",
    desc: "Suporte a entidades que atendem pessoas com deficiência intelectual.",
    municipio: "Diversos municípios",
    color: "navy",
  },
  {
    icon: Trophy,
    titulo: "Núcleos esportivos inclusivos",
    desc: "Esporte como ferramenta de inclusão e cidadania.",
    municipio: "Regional",
    color: "gold",
  },
  {
    icon: Palette,
    titulo: "Projetos culturais",
    desc: "Fomento à cultura popular e à identidade fluminense.",
    municipio: "Diversos municípios",
    color: "green",
  },
];

export function PrincipaisEntregas() {
  return (
    <section id="entregas" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Do papel para a vida real</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-black text-navy sm:text-5xl">
            Principais <span className="text-gradient-gold">Entregas</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Cada entrega representa um compromisso cumprido com o Rio de
            Janeiro.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ENTREGAS.map((e, i) => {
            const cls = colorClasses(e.color as Eixo["color"]);
            const Icon = e.icon;
            return (
              <Reveal key={e.titulo} delay={i * 0.04}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant">
                  <div className="relative aspect-[16/9] overflow-hidden bg-navy-deep">
                    <div className="absolute inset-0 gradient-hero opacity-90" />
                    <div className="absolute inset-0 grid place-items-center">
                      <div
                        className={`grid h-20 w-20 place-items-center rounded-3xl ${cls.icon} transition-transform duration-500 group-hover:scale-110`}
                      >
                        <Icon className="h-10 w-10" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-navy">
                      <MapPin className="h-3 w-3 text-gold" />
                      {e.municipio}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-navy">
                      {e.titulo}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {e.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ 7. LINHA DO TEMPO DO MANDATO ============ */

const MANDATO_ANOS = [
  {
    ano: "2023",
    subtitulo: "Início do mandato",
    itens: [
      "Posse como Deputada Estadual pela ALERJ",
      "Instituição do Dia e Semana do Orgulho Autista",
      "Primeiras emendas destinadas à Saúde e Educação",
      "Fortalecimento da pauta de inclusão no plenário",
    ],
  },
  {
    ano: "2024",
    subtitulo: "Consolidação e resultados",
    itens: [
      "Selo Salão Amigo do Autista e Templo Religioso Amigo do Autista",
      "Atendimento odontológico especializado a pessoas com TEA",
      "Ambulância entregue a São Francisco de Itabapoana",
      "Van adaptada ao Centro Terapêutico Pedro Machado",
      "Ampliação das emendas a Cultura e Assistência Social",
    ],
  },
  {
    ano: "2025",
    subtitulo: "Expansão da atuação",
    itens: [
      "Cadastro estadual de estabelecimentos inclusivos",
      "Transparência sobre inclusão no mercado de trabalho",
      "Pré-vestibular social e reforma de escolas estaduais",
      "Apoio ao Hospital Universitário da UENF",
      "R$ 8,78 milhões em emendas impositivas destinadas",
    ],
  },
  {
    ano: "2026",
    subtitulo: "Novos horizontes",
    itens: [
      "Continuidade das políticas de inclusão e autismo",
      "Ampliação das entregas a municípios do interior",
      "Novos projetos de lei em análise na ALERJ",
    ],
  },
];

export function TimelineMandato() {
  return (
    <section id="timeline-mandato" className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>2023 · 2026</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-black text-navy sm:text-5xl">
            Linha do tempo do{" "}
            <span className="text-gradient-gold">mandato</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A evolução de um mandato feito de escuta, ação e resultados.
          </p>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-border sm:left-1/2 sm:-translate-x-1/2" />
          <div className="space-y-12">
            {MANDATO_ANOS.map((ano, idx) => {
              const left = idx % 2 === 0;
              return (
                <Reveal key={ano.ano} delay={idx * 0.08}>
                  <div
                    className={`relative grid gap-6 sm:grid-cols-2 ${
                      left ? "" : "sm:[&>*:first-child]:col-start-2"
                    }`}
                  >
                    <div
                      className={`absolute left-4 top-4 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full gradient-gold text-navy-deep shadow-gold sm:left-1/2`}
                    >
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div
                      className={`rounded-2xl border border-border bg-card p-6 shadow-soft ${left ? "sm:mr-10" : "sm:ml-10 sm:col-start-2"} ml-12 sm:ml-0`}
                    >
                      <div className="font-display text-4xl font-black text-gradient-gold">
                        {ano.ano}
                      </div>
                      <div className="mt-1 font-display text-lg font-bold text-navy">
                        {ano.subtitulo}
                      </div>
                      <ul className="mt-4 space-y-2">
                        {ano.itens.map((it) => (
                          <li key={it} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ 8. IMPACTO NO ESTADO ============ */

const IMPACTO = [
  { icon: HeartPulse, label: "Saúde", desc: "Hospitais, ambulâncias e ampliação do acesso.", color: "green" },
  { icon: GraduationCap, label: "Educação", desc: "Escolas reformadas e equipadas.", color: "navy" },
  { icon: Accessibility, label: "Inclusão", desc: "Direitos e dignidade para PcDs e pessoas com TEA.", color: "gold" },
  { icon: HandHeart, label: "Assistência Social", desc: "Apoio às famílias em vulnerabilidade.", color: "green" },
  { icon: Palette, label: "Cultura", desc: "Fomento à identidade fluminense.", color: "gold" },
  { icon: Trophy, label: "Esporte", desc: "Núcleos esportivos inclusivos.", color: "navy" },
];

export function ImpactoEstado() {
  return (
    <section id="impacto" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Amplitude · Rio de Janeiro</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-black text-navy sm:text-5xl">
            Impacto no <span className="text-gradient-gold">Estado</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Investimentos que alcançam pessoas, regiões e realidades diferentes.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {IMPACTO.map((i, idx) => {
            const cls = colorClasses(i.color as Eixo["color"]);
            const Icon = i.icon;
            return (
              <Reveal key={i.label} delay={idx * 0.06}>
                <div className="group relative flex items-start gap-5 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/5 transition-transform duration-500 group-hover:scale-125" />
                  <div
                    className={`relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl ${cls.icon}`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="relative">
                    <h3 className="font-display text-2xl font-bold text-navy">
                      {i.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {i.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ 9. ATUAÇÃO NA ALERJ ============ */

const ALERJ_COMISSOES = [
  {
    icon: Users,
    title: "Comissão da Criança, Adolescente e Idoso",
    desc: "Defesa e proteção dos direitos das populações mais vulneráveis do estado.",
    color: "gold" as const,
  },
  {
    icon: HandHeart,
    title: "Comissão de Defesa das Mulheres",
    desc: "Enfrentamento à violência, autonomia econômica e políticas afirmativas.",
    color: "green" as const,
  },
  {
    icon: MapPin,
    title: "Comissão de Turismo",
    desc: "Fortalecimento do turismo como vetor de desenvolvimento regional.",
    color: "navy" as const,
  },
  {
    icon: Accessibility,
    title: "Frente Parlamentar em Defesa das Pessoas com Autismo",
    desc: "Coordenação da articulação política em defesa das pessoas com TEA no Rio.",
    color: "gold" as const,
  },
];

export function AtuacaoAlerj() {
  return (
    <section id="alerj" className="relative bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>ALERJ · Comissões</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-black text-navy sm:text-5xl">
            Presença ativa na{" "}
            <span className="text-gradient-gold">Assembleia Legislativa</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Participação em comissões estratégicas e coordenação da frente
            parlamentar em defesa das pessoas com autismo.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {ALERJ_COMISSOES.map((c, i) => {
            const cls = colorClasses(c.color);
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="group relative flex items-start gap-5 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/5 transition-transform duration-500 group-hover:scale-125" />
                  <div
                    className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${cls.icon}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="relative">
                    <h3 className="font-display text-xl font-bold text-navy">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {c.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ 10. PROJETOS SOCIAIS ============ */

const PROJETOS_SOCIAIS = [
  {
    icon: Sparkles,
    title: "Projeto Semear",
    desc: "Iniciativa de formação, cidadania e oportunidades para crianças e jovens em situação de vulnerabilidade.",
    tag: "Formação",
    color: "gold" as const,
  },
  {
    icon: HandHeart,
    title: "Chácara da Inclusão",
    desc: "Espaço terapêutico e de convivência para pessoas com TEA e suas famílias, com atividades adaptadas.",
    tag: "Inclusão",
    color: "green" as const,
  },
  {
    icon: Users,
    title: "Banquinha da Inclusão",
    desc: "Ponto de comercialização e geração de renda para famílias atípicas e empreendedores da inclusão.",
    tag: "Renda",
    color: "navy" as const,
  },
  {
    icon: Building2,
    title: "APAE",
    desc: "Apoio contínuo às Associações de Pais e Amigos dos Excepcionais em diversos municípios fluminenses.",
    tag: "Parceria",
    color: "gold" as const,
  },
];

export function ProjetosSociais() {
  return (
    <section id="sociais" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Ação social · Território</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-black text-navy sm:text-5xl">
            Projetos que <span className="text-gradient-gold">acolhem</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Iniciativas que nasceram do território e continuam transformando
            vidas dentro e fora do mandato.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJETOS_SOCIAIS.map((p, i) => {
            const cls = colorClasses(p.color);
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant">
                  <div
                    className={`grid h-14 w-14 place-items-center rounded-2xl ${cls.icon}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <span
                    className={`mt-5 inline-block rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${cls.badge}`}
                  >
                    {p.tag}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold text-navy">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ 11. PROJETOS DE LEI EM DESTAQUE (FILTRÁVEL) ============ */

type PLDestaque = {
  categoria:
    | "Inclusão"
    | "Saúde"
    | "Mulheres"
    | "Educação"
    | "Agricultura"
    | "Cultura";
  titulo: string;
  resumo: string;
};

const PL_DESTAQUES: PLDestaque[] = [
  {
    categoria: "Mulheres",
    titulo: "Caderneta da Mulher no Climatério e Menopausa",
    resumo:
      "Instrumento oficial para acompanhamento da saúde da mulher nas fases do climatério e menopausa.",
  },
  {
    categoria: "Inclusão",
    titulo: "Programa para gestantes com TEA",
    resumo:
      "Cria protocolo especializado de acolhimento e acompanhamento pré-natal para gestantes autistas.",
  },
  {
    categoria: "Inclusão",
    titulo: "Selo Templo Religioso Amigo do Autista",
    resumo:
      "Certifica templos que oferecem ambientes acolhedores, sensoriais e inclusivos.",
  },
  {
    categoria: "Saúde",
    titulo: "Cuidados Paliativos",
    resumo:
      "Amplia o acesso a cuidados paliativos na rede pública, com dignidade e alívio da dor.",
  },
  {
    categoria: "Agricultura",
    titulo: "Leite da Agricultura Familiar nas Escolas",
    resumo:
      "Garante que o leite servido nas escolas venha da agricultura familiar fluminense.",
  },
  {
    categoria: "Cultura",
    titulo: "Cultura Oceânica",
    resumo:
      "Introduz a Cultura Oceânica na educação e nas políticas públicas do estado.",
  },
  {
    categoria: "Educação",
    titulo: "Atividades de conscientização sobre TEA nas escolas",
    resumo:
      "Promove a inclusão desde a educação básica com formação e sensibilização.",
  },
  {
    categoria: "Saúde",
    titulo: "Transparência nos planos de saúde",
    resumo:
      "Obriga divulgação clara sobre cobertura de terapias e tratamentos para TEA.",
  },
];

const PL_FILTROS: (PLDestaque["categoria"] | "Todos")[] = [
  "Todos",
  "Inclusão",
  "Saúde",
  "Mulheres",
  "Educação",
  "Agricultura",
  "Cultura",
];

export function ProjetosLeiDestaque() {
  const [filtro, setFiltro] =
    useState<(typeof PL_FILTROS)[number]>("Todos");
  const lista =
    filtro === "Todos"
      ? PL_DESTAQUES
      : PL_DESTAQUES.filter((p) => p.categoria === filtro);
  return (
    <section id="pl-destaque" className="relative bg-secondary pt-24 pb-8 sm:pt-32 sm:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Legislativo · Destaques</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-black text-navy sm:text-5xl">
            Principais <span className="text-gradient-gold">Projetos de Lei</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Filtre por área e conheça as propostas que estão mudando a vida do
            fluminense.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {PL_FILTROS.map((f) => {
            const active = filtro === f;
            return (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  active
                    ? "border-transparent bg-navy text-white shadow-elegant"
                    : "border-navy/20 bg-white text-navy hover:border-gold/60 hover:text-navy"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {lista.map((p, i) => (
              <motion.div
                key={p.titulo}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-navy">
                    {p.categoria}
                  </span>
                  <Scale className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug text-navy">
                  {p.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.resumo}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ============ 12. GALERIA POR CATEGORIAS ============ */

type FotoCat = "Alerj" | "Municípios" | "Educação" | "Saúde" | "Inclusão" | "Eventos";

export function GaleriaCategorias({
  imagens,
}: {
  imagens: { src: string; alt: string; cat: FotoCat }[];
}) {
  const cats: ("Todas" | FotoCat)[] = [
    "Todas",
    "Alerj",
    "Municípios",
    "Educação",
    "Saúde",
    "Inclusão",
    "Eventos",
  ];
  const [cat, setCat] = useState<(typeof cats)[number]>("Todas");
  const [open, setOpen] = useState<number | null>(null);
  const filtered =
    cat === "Todas" ? imagens : imagens.filter((i) => i.cat === cat);
  return (
    <section id="galeria-categorias" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Registros · Território</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-black text-navy sm:text-5xl">
            Galeria por <span className="text-gradient-gold">categoria</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Momentos do mandato organizados por eixos de atuação.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {cats.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  active
                    ? "border-transparent bg-navy text-white shadow-elegant"
                    : "border-navy/20 bg-white text-navy hover:border-gold/60"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((g, i) => (
              <motion.button
                key={g.src + i}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setOpen(i)}
                className="group relative aspect-square overflow-hidden rounded-2xl border border-border shadow-soft"
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                    {g.cat}
                  </span>
                  <div className="mt-1 line-clamp-2 text-xs text-white">
                    {g.alt}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {open !== null && filtered[open] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] grid place-items-center bg-navy-deep/95 p-4 backdrop-blur-xl"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={filtered[open].src}
              alt={filtered[open].alt}
              className="max-h-[90vh] max-w-full rounded-2xl shadow-elegant"
            />
            <button
              onClick={() => setOpen(null)}
              className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============ 13. LEGADO ============ */

export function Legado({ image }: { image: string }) {
  return (
    <section id="legado" className="relative overflow-hidden bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-gold/30 via-transparent to-green/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-elegant">
                <img
                  src={image}
                  alt="Carla Machado ao longo da trajetória pública"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/80 to-transparent p-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                    Legado
                  </div>
                  <div className="mt-1 font-display text-lg font-bold text-white">
                    43 anos dedicados às pessoas do Rio
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>Trajetória · Compromisso</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-black leading-tight text-navy sm:text-5xl">
              Uma vida inteira ao <span className="text-gradient-gold">lado das pessoas</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              De educadora e primeira-dama a deputada estadual, Carla Machado
              construiu uma trajetória marcada pela escuta, pela inclusão e pela
              defesa incansável de quem mais precisa. São mais de quatro décadas
              transformando políticas públicas em cuidado real, com o coração
              sempre voltado ao interior e às causas humanas.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { n: "43", l: "anos de vida pública" },
                { n: "92", l: "municípios impactados" },
                { n: "40+", l: "emendas destinadas" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-border bg-card p-4 text-center shadow-soft"
                >
                  <div className="font-display text-3xl font-black text-navy">
                    {s.n}
                  </div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="#trajetoria"
                className="group inline-flex items-center gap-3 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-elegant transition hover:bg-navy-deep"
              >
                Conheça a trajetória completa
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============ 14. INDICAÇÕES DO MANDATO ============ */

type Indicacao = {
  numero: string;
  tipo: "Simples" | "Legislativa";
  categoria: string;
  titulo: string;
  resumo: string;
  data: string;
  autoridade: string;
  local: string;
};

const INDICACOES: Indicacao[] = [
  {
    numero: "3876/2024",
    tipo: "Simples",
    categoria: "Segurança Pública",
    titulo: "Reativação do DPO em Sabonete",
    resumo:
      "Solicita ao Governo do Estado a reativação do Destacamento de Policiamento Ostensivo na localidade de Sabonete, no 5º distrito de São João da Barra.",
    data: "27/08/2024",
    autoridade: "Poder Executivo",
    local: "São João da Barra",
  },
  {
    numero: "4428/2025",
    tipo: "Simples",
    categoria: "Segurança Pública",
    titulo: "Delegacia da Mulher (DEAM) em São João da Barra",
    resumo:
      "Solicita ao Governador o envio de mensagem dispondo sobre a criação de uma Delegacia Especializada de Atendimento à Mulher no município.",
    data: "05/02/2025",
    autoridade: "Poder Executivo, Secretaria de Polícia Civil",
    local: "São João da Barra",
  },
  {
    numero: "4429/2025",
    tipo: "Simples",
    categoria: "Trânsito",
    titulo: "Emissão de CNH no posto do Detran de São João da Barra",
    resumo:
      "Solicita ao Detran/RJ que o posto de identificação civil do município passe a executar os serviços de obtenção e emissão da Carteira Nacional de Habilitação.",
    data: "05/02/2025",
    autoridade: "DETRAN-RJ",
    local: "São João da Barra",
  },
  {
    numero: "5419/2025",
    tipo: "Simples",
    categoria: "Rodovias",
    titulo: "Recapeamento da RJ-194 e RJ-196",
    resumo:
      "Solicita ao DER-RJ providências para viabilizar o recapeamento das rodovias que dão acesso à Ponte da Integração, no Norte Fluminense.",
    data: "10/06/2025",
    autoridade: "Poder Executivo, DER-RJ",
    local: "São João da Barra",
  },
  {
    numero: "5668/2025",
    tipo: "Simples",
    categoria: "Segurança Pública",
    titulo: "Programa Segurança Presente em São João da Barra",
    resumo:
      "Solicita ao Governador a implantação do Programa Segurança Presente no município.",
    data: "07/08/2025",
    autoridade: "Poder Executivo",
    local: "São João da Barra",
  },
  {
    numero: "5686/2025",
    tipo: "Simples",
    categoria: "Agricultura e Pecuária",
    titulo: "ExpoBarra no calendário oficial de exposições agropecuárias",
    resumo:
      "Solicita à SEAPPA a inclusão da ExpoBarra no calendário oficial de exposições agropecuárias do Estado do Rio de Janeiro.",
    data: "12/08/2025",
    autoridade: "Secretaria de Agricultura e Pecuária",
    local: "São João da Barra",
  },
  {
    numero: "5928/2025",
    tipo: "Simples",
    categoria: "Segurança Pública",
    titulo: "Novas unidades do CAAC no Norte e Noroeste Fluminense",
    resumo:
      "Solicita ao Governador a criação de novas unidades do Centro de Atendimento ao Adolescente e à Criança Vítima de Violência nas regiões Norte e Noroeste.",
    data: "07/10/2025",
    autoridade: "Poder Executivo",
    local: "Norte e Noroeste Fluminense",
  },
  {
    numero: "5926/2025",
    tipo: "Simples",
    categoria: "Segurança Pública",
    titulo: "Programa Segurança Presente em São João da Barra",
    resumo:
      "Reitera ao Governador a implantação do Programa Segurança Presente no município de São João da Barra.",
    data: "07/10/2025",
    autoridade: "Poder Executivo",
    local: "São João da Barra",
  },
  {
    numero: "6200/2025",
    tipo: "Simples",
    categoria: "Rodovias",
    titulo: "Revitalização da RJ-196 entre Mineiros e Barra do Furado",
    resumo:
      "Solicita ao DER-RJ a revitalização do trecho da RJ-196 entre Mineiros (Campos dos Goytacazes) e Barra do Furado (Quissamã).",
    data: "16/12/2025",
    autoridade: "Poder Executivo, DER-RJ",
    local: "Norte Fluminense",
  },
  {
    numero: "6575/2026",
    tipo: "Simples",
    categoria: "Transporte",
    titulo: "Linha rodoviária entre Macaé e São João da Barra",
    resumo:
      "Solicita ao DETRO a implantação de linha rodoviária ligando os municípios de Macaé e São João da Barra.",
    data: "19/03/2026",
    autoridade: "DETRO",
    local: "Norte Fluminense",
  },
  {
    numero: "6576/2026",
    tipo: "Simples",
    categoria: "Rodovias",
    titulo: "Estradas vicinais de Campos no Programa Estradas Agro RJ",
    resumo:
      "Solicita à SEAPPA a inclusão das estradas vicinais de diversos bairros de Campos dos Goytacazes no Programa Estradas Agro RJ.",
    data: "19/03/2026",
    autoridade: "Secretaria de Agricultura e Pecuária",
    local: "Campos dos Goytacazes",
  },
  {
    numero: "6679/2026",
    tipo: "Simples",
    categoria: "Royalties do Petróleo",
    titulo: "Defesa da distribuição dos royalties do petróleo",
    resumo:
      "Solicita ao Governador a adoção de medidas institucionais, em articulação com a Alerj, no julgamento das ADIs sobre a distribuição dos royalties do petróleo e participações especiais.",
    data: "08/04/2026",
    autoridade: "Poder Executivo",
    local: "Estado",
  },
  {
    numero: "6584/2026",
    tipo: "Simples",
    categoria: "Autismo",
    titulo: "Centro de diagnóstico e tratamento do TEA em Campos",
    resumo:
      "Solicita ao Governador a instalação de um centro de diagnóstico e tratamento do Transtorno do Espectro Autista em Campos dos Goytacazes, para atender o Norte e Noroeste Fluminense.",
    data: "24/03/2026",
    autoridade: "Poder Executivo",
    local: "Norte Fluminense",
  },
  {
    numero: "6886/2026",
    tipo: "Simples",
    categoria: "Educação",
    titulo: "Gratificação para docentes do Colégio Chrisanto Henrique de Souza",
    resumo:
      "Solicita à Secretaria de Educação a inclusão da escola na relação de difícil provimento, para concessão de gratificação aos docentes.",
    data: "02/06/2026",
    autoridade: "Secretaria de Educação",
    local: "São João da Barra",
  },
  {
    numero: "6887/2026",
    tipo: "Simples",
    categoria: "Transporte",
    titulo: "Mais vagas no Detran de Campos dos Goytacazes",
    resumo:
      "Solicita ao Detran/RJ providências para sanar a insuficiência de vagas de agendamento e realizar uma edição do Detran Presente no município.",
    data: "02/06/2026",
    autoridade: "Poder Executivo, DETRAN-RJ",
    local: "Campos dos Goytacazes",
  },
  {
    numero: "6913/2026",
    tipo: "Simples",
    categoria: "Energia elétrica",
    titulo: "Estabilidade no fornecimento de energia em São João da Barra",
    resumo:
      "Solicita à Enel Brasil providências para garantir maior estabilidade no fornecimento de energia elétrica e esclarecimentos sobre as interrupções recorrentes.",
    data: "09/06/2026",
    autoridade: "ENEL",
    local: "São João da Barra",
  },
  {
    numero: "6914/2026",
    tipo: "Simples",
    categoria: "Transporte",
    titulo: "Descentralização das perícias médicas do Detran para PcDs",
    resumo:
      "Solicita ao Detran/RJ a descentralização e ampliação dos atendimentos médico-periciais destinados às pessoas com deficiência.",
    data: "09/06/2026",
    autoridade: "Poder Executivo, DETRAN-RJ",
    local: "Estado",
  },
  {
    numero: "6945/2026",
    tipo: "Simples",
    categoria: "Pessoa com Deficiência",
    titulo: "Mobilidade e acessibilidade para PcDs, autistas e idosos",
    resumo:
      "Solicita ao Governador políticas de descentralização, modernização e ampliação dos serviços de mobilidade e acessibilidade para PcDs, pessoas com TEA, idosos e beneficiários de gratuidades legais.",
    data: "10/06/2026",
    autoridade: "Poder Executivo",
    local: "Estado",
  },
  {
    numero: "6946/2026",
    tipo: "Simples",
    categoria: "Autismo",
    titulo: "Regulamentação de políticas públicas para pessoas com TEA",
    resumo:
      "Solicita ao Governador a regulamentação, integração e efetiva implementação de políticas públicas para pessoas com Transtorno do Espectro Autista.",
    data: "10/06/2026",
    autoridade: "Poder Executivo",
    local: "Estado",
  },
  {
    numero: "6962/2026",
    tipo: "Simples",
    categoria: "Defesa Civil",
    titulo: "Medidas preventivas contra impactos do El Niño",
    resumo:
      "Solicita à Defesa Civil, ao Cepedec e ao Cemaden a adoção de medidas preventivas para enfrentar os possíveis impactos do fenômeno El Niño no Estado.",
    data: "17/06/2026",
    autoridade: "Poder Executivo, Secretaria de Defesa Civil",
    local: "Estado",
  },
  {
    numero: "6982/2026",
    tipo: "Simples",
    categoria: "Pessoa com Deficiência",
    titulo: "Acessibilidade no embarque do transporte estadual",
    resumo:
      "Solicita à Setram, ao Detro e à Mais Mobi a adoção de medidas de acessibilidade para o embarque de passageiros nos modais de transporte de competência estadual.",
    data: "30/06/2026",
    autoridade: "Secretaria de Transporte e Mobilidade, DETRO-RJ",
    local: "Estado",
  },
  {
    numero: "6983/2026",
    tipo: "Simples",
    categoria: "Pessoa com Deficiência",
    titulo: "Acessibilidade no embarque do transporte municipal do Rio",
    resumo:
      "Solicita à Secretaria Municipal de Transportes e à CDB Bilhete Digital medidas de acessibilidade para o embarque de passageiros nos modais de transporte municipal.",
    data: "30/06/2026",
    autoridade: "Secretaria de Transporte da cidade do Rio de Janeiro",
    local: "Rio de Janeiro",
  },
  {
    numero: "06/23",
    tipo: "Legislativa",
    categoria: "Educação",
    titulo: "Planos de carreira dos servidores da UENF e UERJ",
    resumo:
      "Solicita ao Governador o envio de mensagem dispondo sobre os planos de carreira dos servidores da UENF e da UERJ.",
    data: "27/02/2023",
    autoridade: "Poder Executivo",
    local: "UENF, UERJ",
  },
  {
    numero: "89/2023",
    tipo: "Legislativa",
    categoria: "Rodovias",
    titulo: "Conclusão da Ponte da Integração",
    resumo:
      "Solicita ao Governador providências para a conclusão da Ponte da Integração e seus acessos, ligando São João da Barra e São Francisco de Itabapoana.",
    data: "15/06/2023",
    autoridade: "Poder Executivo",
    local: "São João da Barra, São Francisco do Itabapoana",
  },
  {
    numero: "109/2023",
    tipo: "Legislativa",
    categoria: "Cultura",
    titulo: "Fomento à Fundação Teatro Municipal",
    resumo:
      "Solicita ao Governador o envio de mensagem dispondo sobre medidas para fomentar as atividades da Fundação Teatro Municipal.",
    data: "02/08/2023",
    autoridade: "Poder Executivo",
    local: "Teatro Municipal",
  },
  {
    numero: "139/2023",
    tipo: "Legislativa",
    categoria: "Segurança Pública",
    titulo: "Reativação do DPO de Sabonete",
    resumo:
      "Solicita ao Governador providências para reativação do Destacamento de Policiamento Ostensivo na localidade de Sabonete, 5º distrito de São João da Barra.",
    data: "29/08/2023",
    autoridade: "Poder Executivo",
    local: "São João da Barra",
  },
  {
    numero: "140/2023",
    tipo: "Legislativa",
    categoria: "Rodovias",
    titulo: "Recuperação da RJ-240, acesso à Praia do Açu",
    resumo:
      "Solicita ao Governador obras de recuperação na RJ-240, estrada que liga a localidade de Azeitona à Praia do Açu.",
    data: "29/08/2023",
    autoridade: "Poder Executivo",
    local: "São João da Barra",
  },
  {
    numero: "143/2023",
    tipo: "Legislativa",
    categoria: "Meio Ambiente",
    titulo: "Construção dos reservatórios de Atafona",
    resumo:
      "Solicita ao Governador o envio de mensagem solicitando a realização urgente do pregão para construção dos reservatórios em Atafona.",
    data: "30/08/2023",
    autoridade: "Poder Executivo",
    local: "São João da Barra",
  },
  {
    numero: "252/2024",
    tipo: "Legislativa",
    categoria: "Segurança Pública",
    titulo: "Posto avançado da Polícia Rodoviária na Ponte da Integração",
    resumo:
      "Solicita ao Governador a construção de um posto avançado do Batalhão de Polícia Rodoviária na região da Ponte de Integração Dodozinho Mendonça.",
    data: "20/02/2024",
    autoridade: "Poder Executivo",
    local: "São João da Barra",
  },
  {
    numero: "253/2024",
    tipo: "Legislativa",
    categoria: "Segurança Pública",
    titulo: "Reativação do DPO de Santa Maria em Campos",
    resumo:
      "Solicita ao Governador a reativação do DPO da localidade de Santa Maria, 18º distrito de Campos dos Goytacazes.",
    data: "20/02/2024",
    autoridade: "Poder Executivo",
    local: "Campos",
  },
  {
    numero: "293/2024",
    tipo: "Legislativa",
    categoria: "Rodovias",
    titulo: "Desobstrução da RJ-204 entre Deserto Feliz e a BR-101",
    resumo:
      "Solicita ao Governador providências para desobstrução e limpeza da RJ-204, entre Deserto Feliz e a BR-101, km-19, em Campos dos Goytacazes.",
    data: "22/05/2024",
    autoridade: "Poder Executivo",
    local: "Campos",
  },
  {
    numero: "354/2024",
    tipo: "Legislativa",
    categoria: "Autismo",
    titulo: "Centros de tratamento especializado para autistas adultos",
    resumo:
      "Solicita ao Governador o envio de mensagem sobre a criação de centros de tratamento especializado para autistas adolescentes e adultos no Estado.",
    data: "06/08/2024",
    autoridade: "Poder Executivo",
    local: "Estado",
  },
  {
    numero: "401/2024",
    tipo: "Legislativa",
    categoria: "Proteção Animal",
    titulo: "Afastamento de servidores para tratamento de animal doméstico",
    resumo:
      "Solicita ao Governador o envio de mensagem sobre o afastamento de servidores civis e militares por motivo de acompanhamento de animal doméstico em tratamento veterinário.",
    data: "29/10/2024",
    autoridade: "Poder Executivo",
    local: "Estado",
  },
  {
    numero: "427/2025",
    tipo: "Legislativa",
    categoria: "Pessoa com Deficiência",
    titulo: "Vara específica para pessoas com deficiência",
    resumo:
      "Solicita ao Presidente do TJRJ o envio de mensagem dispondo sobre a criação de uma vara específica para atender pessoas com deficiência.",
    data: "05/02/2025",
    autoridade: "Poder Judiciário",
    local: "Estado",
  },
  {
    numero: "556/2025",
    tipo: "Legislativa",
    categoria: "Pessoa com Deficiência",
    titulo: "Descentralização das perícias médicas do Detran",
    resumo:
      "Solicita ao Governador o envio de mensagem sobre a descentralização dos atendimentos médico-periciais realizados pelo Detran/RJ.",
    data: "12/08/2025",
    autoridade: "Poder Executivo",
    local: "Estado",
  },
  {
    numero: "624/2026",
    tipo: "Legislativa",
    categoria: "Meio Ambiente",
    titulo: "Plano Estadual de Gerenciamento Costeiro",
    resumo:
      "Solicita ao Governador o envio de mensagem sobre a instituição do Plano Estadual de Gerenciamento Costeiro (PEGC).",
    data: "24/02/2026",
    autoridade: "Poder Executivo",
    local: "Estado",
  },
  {
    numero: "638/2026",
    tipo: "Legislativa",
    categoria: "Enfermagem",
    titulo: "Piso salarial da enfermagem no Rio de Janeiro",
    resumo:
      "Solicita ao Governador o envio de mensagem sobre a instituição do piso salarial para os profissionais de enfermagem que atuam no Estado.",
    data: "10/03/2026",
    autoridade: "Poder Executivo",
    local: "Estado",
  },
];

const INDICACOES_FILTROS: (Indicacao["categoria"] | "Todos")[] = [
  "Todos",
  ...Array.from(new Set(INDICACOES.map((i) => i.categoria))),
];

export function IndicacoesMandato() {
  const [filtro, setFiltro] =
    useState<(typeof INDICACOES_FILTROS)[number]>("Todos");
  const lista =
    filtro === "Todos"
      ? INDICACOES
      : INDICACOES.filter((i) => i.categoria === filtro);
  return (
    <section id="indicacoes" className="relative bg-secondary pt-8 pb-24 sm:pt-10 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow>Legislativo · Indicações</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-black text-navy sm:text-5xl">
            Indicações do <span className="text-gradient-gold">Mandato</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Solicitações formais ao Poder Executivo e a outras autoridades,
            filtre por área e conheça as demandas levadas pelo mandato.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {INDICACOES_FILTROS.map((f) => {
            const active = filtro === f;
            return (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  active
                    ? "border-transparent bg-navy text-white shadow-elegant"
                    : "border-navy/20 bg-white text-navy hover:border-gold/60 hover:text-navy"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {lista.map((ind, i) => (
              <motion.div
                key={ind.numero}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-navy">
                    {ind.categoria}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-muted-foreground">
                    <FileText className="h-3.5 w-3.5 text-gold" />
                    {ind.numero}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug text-navy">
                  {ind.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {ind.resumo}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-navy/50" />
                    {ind.data}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-navy/50" />
                    {ind.local}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
