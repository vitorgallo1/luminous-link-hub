import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Heart,
  GraduationCap,
  Shield,
  HandHeart,
  Sprout,
  Building2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  MapPin,
  Quote,
  Sparkles,
  Check,
} from "lucide-react";

import heroImg from "@/assets/carla-hero.jpg";
import ctaImg from "@/assets/carla-cta.jpg";
import hospitalImg from "@/assets/achievement-hospital.jpg";
import universityImg from "@/assets/achievement-university.jpg";
import agriImg from "@/assets/achievement-agri.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        property: "og:image",
        content:
          "https://id-preview--bc5ebaa8-4248-443b-9533-a560b32e8e57.lovable.app/og-image.jpg",
      },
    ],
  }),
  component: LandingPage,
});

/* -------------------- Helpers -------------------- */

function useCountUp(target: number, duration = 2000, start = false) {
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

function Counter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const v = useCountUp(target, 1800, inView);
  return (
    <span ref={ref}>
      {prefix}
      {v.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------- Sections -------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    ["Números", "#numeros"],
    ["Atuação", "#atuacao"],
    ["Conquistas", "#conquistas"],
    ["Trajetória", "#trajetoria"],
    ["Contas", "#contas"],
    ["Contato", "#rodape"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
            scrolled
              ? "bg-navy-deep/85 backdrop-blur-xl shadow-elegant border border-white/10"
              : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-gold shadow-gold">
              <span className="font-display text-lg font-black text-navy-deep">CM</span>
            </div>
            <div className="min-w-0">
              <div className="font-display text-sm font-extrabold leading-tight text-white sm:text-base">
                Carla Machado
              </div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-gold-soft/90 sm:text-xs">
                Deputada Estadual · 12345
              </div>
            </div>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-gold"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#doar"
            className="hidden sm:inline-flex items-center gap-2 rounded-full gradient-green px-5 py-2.5 text-sm font-semibold text-white shadow-green transition-transform hover:scale-105"
          >
            <Heart className="h-4 w-4" /> Doar
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen overflow-hidden gradient-hero pt-28 pb-16 sm:pt-32"
    >
      {/* Ambient particles / glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-[500px] w-[500px] rounded-full bg-navy-soft/40 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          {/* Left: copy */}
          <div className="relative z-10 order-2 lg:order-1">
            <Reveal>
              <div className="glass-gold inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-soft">
                <Sparkles className="h-3.5 w-3.5" /> Rio de Janeiro · 2026
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Experiência para fazer.{" "}
                <span className="text-gradient-gold">Sensibilidade</span> para cuidar.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Mais de duas décadas trabalhando por quem mais precisa — destinando recursos,
                fortalecendo hospitais, escolas, universidades, segurança pública e o
                desenvolvimento dos municípios do Rio.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#doar"
                  className="group inline-flex items-center gap-2 rounded-full gradient-green px-7 py-4 text-base font-semibold text-white shadow-green transition-all hover:scale-[1.03] hover:shadow-elegant"
                >
                  <Heart className="h-5 w-5" />
                  Doe para a campanha
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#trajetoria"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10"
                >
                  Conheça a Carla
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="mt-10 flex items-center gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl gradient-gold shadow-gold">
                  <span className="font-display text-2xl font-black text-navy-deep">12</span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-widest text-gold-soft">
                    Seu voto
                  </div>
                  <div className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                    12345
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: portrait */}
          <div className="order-1 lg:order-2">
            <Reveal delay={0.15} y={40}>
              <div className="relative mx-auto max-w-[520px]">
                <div className="absolute -inset-6 rounded-[2.5rem] gradient-gold opacity-30 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/15 shadow-elegant">
                  <img
                    src={heroImg}
                    alt="Carla Machado, candidata a Deputada Estadual"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="glass rounded-2xl p-4">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-soft">
                        Deputada Estadual
                      </div>
                      <div className="mt-1 font-display text-xl font-extrabold text-white sm:text-2xl">
                        Carla Machado
                      </div>
                      <div className="mt-1 text-xs text-white/70">
                        Compromisso com o Rio de Janeiro
                      </div>
                    </div>
                  </div>
                </div>
                {/* floating chips */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-4 top-16 hidden rounded-2xl glass-gold px-4 py-3 shadow-gold sm:block"
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold">
                    Emendas
                  </div>
                  <div className="font-display text-lg font-black text-white">R$ 6,2 mi</div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-4 bottom-24 hidden rounded-2xl glass px-4 py-3 sm:block"
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold-soft">
                    Municípios
                  </div>
                  <div className="font-display text-lg font-black text-white">+40 atendidos</div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Numbers() {
  const stats = [
    { target: 6.2, prefix: "R$ ", suffix: " mi", decimals: 1, label: "em emendas destinadas" },
    { target: 42, suffix: "+", label: "municípios beneficiados" },
    { target: 118, suffix: "+", label: "instituições atendidas" },
    { target: 24, suffix: " anos", label: "de vida pública" },
  ];
  return (
    <section id="numeros" className="relative overflow-hidden bg-navy py-24">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-0 h-96 w-[800px] -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full glass-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-soft">
              Resultados que se contam
            </div>
            <h2 className="mt-5 font-display text-4xl font-extrabold text-white sm:text-5xl">
              Os números do <span className="text-gradient-gold">trabalho</span>
            </h2>
            <p className="mt-4 text-white/70">
              Cada real destinado, cada obra entregue e cada família atendida representa a
              seriedade de um mandato dedicado ao Rio.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl glass-gold p-7 transition-all hover:-translate-y-1 hover:shadow-gold">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/20 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="font-display text-4xl font-black tracking-tight text-gradient-gold sm:text-5xl">
                    <Counter
                      target={s.target}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      decimals={s.decimals ?? 0}
                    />
                  </div>
                  <div className="mt-3 text-sm font-medium text-white/80">{s.label}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Areas() {
  const items = [
    { icon: Heart, title: "Saúde", desc: "Hospitais equipados, atendimento humanizado e ampliação de leitos." },
    { icon: GraduationCap, title: "Educação", desc: "Escolas modernas e apoio integral às universidades públicas." },
    { icon: Shield, title: "Segurança Pública", desc: "Recursos para forças de segurança e programas de prevenção." },
    { icon: HandHeart, title: "Assistência Social", desc: "Programas de acolhimento e apoio a APAEs e entidades." },
    { icon: Sprout, title: "Agricultura", desc: "Fortalecimento do produtor rural e da agricultura familiar." },
    { icon: Building2, title: "Desenvolvimento Regional", desc: "Infraestrutura, mobilidade e geração de emprego nos municípios." },
  ];
  return (
    <section id="atuacao" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy">
              Áreas de atuação
            </div>
            <h2 className="mt-5 font-display text-4xl font-extrabold text-navy sm:text-5xl">
              Onde o trabalho <span className="text-green">acontece</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Seis frentes de atuação que se conectam ao dia a dia das pessoas.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-2 hover:border-gold/50 hover:shadow-elegant">
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-gold/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-hero shadow-soft transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <it.icon className="h-7 w-7 text-gold" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-extrabold text-navy">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-green opacity-0 transition-all group-hover:opacity-100">
                    Saiba mais <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  const items = [
    {
      img: hospitalImg,
      tag: "Saúde",
      title: "Mais recursos para hospitais",
      desc: "Emendas destinadas à modernização de unidades hospitalares, novos equipamentos e ampliação de leitos em municípios de todo o Estado.",
    },
    {
      img: universityImg,
      tag: "Educação",
      title: "Investimento nas universidades",
      desc: "Apoio a programas de pesquisa, extensão e permanência estudantil nas universidades públicas fluminenses.",
    },
    {
      img: agriImg,
      tag: "Agricultura",
      title: "Fortalecimento do produtor rural",
      desc: "Recursos para agricultura familiar, cooperativas e programas de escoamento da produção nas regiões do interior.",
    },
  ];
  return (
    <section id="conquistas" className="relative bg-secondary/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy">
                Grandes conquistas
              </div>
              <h2 className="mt-5 font-display text-4xl font-extrabold text-navy sm:text-5xl">
                Resultados que <span className="text-gradient-gold">transformam</span> vidas
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Um mandato de portas abertas, feito com escuta e presença — em cada cidade,
              cada instituição, cada família.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 space-y-8">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <article className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant lg:grid-cols-[1.1fr_1fr]">
                <div className={`relative aspect-[16/10] overflow-hidden lg:aspect-auto ${i % 2 ? "lg:order-2" : ""}`}>
                  <img
                    src={it.img}
                    alt={it.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep/40 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full glass-gold px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gold-soft">
                    {it.tag}
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
                  <h3 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
                    {it.title}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">{it.desc}</p>
                  <button className="group/btn inline-flex w-fit items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:bg-navy-deep">
                    Saiba mais
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const items = [
    { year: "2000", title: "Vereadora", desc: "Início da vida pública dedicado à escuta comunitária." },
    { year: "2008", title: "Prefeita", desc: "Gestão marcada por obras estruturantes e inclusão social." },
    { year: "2014", title: "Deputada Estadual", desc: "Atuação parlamentar com foco em saúde e educação." },
    { year: "2018", title: "Grandes conquistas", desc: "R$ 6,2 milhões em emendas destinadas ao Estado." },
    { year: "Hoje", title: "Trabalho que continua", desc: "Compromisso renovado com o desenvolvimento do Rio." },
  ];
  return (
    <section id="trajetoria" className="relative overflow-hidden bg-navy-deep py-24 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full glass-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-soft">
              Trajetória
            </div>
            <h2 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">
              Uma vida dedicada às <span className="text-gradient-gold">pessoas</span>
            </h2>
          </div>
        </Reveal>
        <div className="relative mt-16">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold via-gold/40 to-transparent sm:left-1/2" />
          <div className="space-y-10">
            {items.map((it, i) => (
              <Reveal key={it.year} delay={i * 0.05}>
                <div
                  className={`relative grid gap-4 sm:grid-cols-2 sm:gap-10 ${
                    i % 2 ? "sm:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className={`pl-12 sm:pl-0 ${i % 2 ? "sm:text-left sm:pl-10" : "sm:text-right sm:pr-10"}`}>
                    <div className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
                      {it.year}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-extrabold">{it.title}</h3>
                    <p className="mt-2 text-white/70">{it.desc}</p>
                  </div>
                  <div className="hidden sm:block" />
                  <div className="absolute left-4 top-2 -translate-x-1/2 sm:left-1/2">
                    <div className="grid h-9 w-9 place-items-center rounded-full gradient-gold shadow-gold ring-4 ring-navy-deep">
                      <Check className="h-4 w-4 text-navy-deep" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Accountability() {
  const items = [
    { area: "Saúde", value: 2.1, pct: 34, color: "from-green to-green-deep" },
    { area: "Educação", value: 1.4, pct: 22, color: "from-gold to-gold-soft" },
    { area: "Segurança", value: 0.8, pct: 13, color: "from-navy to-navy-soft" },
    { area: "Assistência", value: 0.7, pct: 11, color: "from-green to-green-deep" },
    { area: "Infraestrutura", value: 0.9, pct: 15, color: "from-gold to-gold-soft" },
    { area: "Agricultura", value: 0.3, pct: 5, color: "from-navy to-navy-soft" },
  ];
  return (
    <section id="contas" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy">
              Prestação de contas
            </div>
            <h2 className="mt-5 font-display text-4xl font-extrabold text-navy sm:text-5xl">
              Transparência que se <span className="text-green">vê</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cada recurso destinado tem origem, destino e resultado — publicado com clareza.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.area} delay={i * 0.06}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {it.area}
                  </div>
                  <div className="mt-3 font-display text-3xl font-black text-navy">
                    R$ <Counter target={it.value} decimals={1} /> mi
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {it.pct}% do total destinado
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${it.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                      className={`h-full rounded-full bg-gradient-to-r ${it.color}`}
                    />
                  </div>
                  {/* mini chart bars */}
                  <div className="flex h-16 items-end gap-1.5">
                    {Array.from({ length: 12 }).map((_, k) => {
                      const h = 20 + Math.round(Math.abs(Math.sin(k + i)) * 70);
                      return (
                        <motion.div
                          key={k}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.02 * k }}
                          className={`w-full rounded-t bg-gradient-to-t ${it.color} opacity-80`}
                        />
                      );
                    })}
                  </div>
                  <button className="inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors hover:text-green">
                    Ver detalhes <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const items = [
    { src: ctaImg, span: "sm:col-span-2 sm:row-span-2" },
    { src: hospitalImg, span: "" },
    { src: universityImg, span: "" },
    { src: agriImg, span: "sm:col-span-2" },
    { src: heroImg, span: "" },
  ];
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="bg-secondary/60 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy">
              Galeria
            </div>
            <h2 className="mt-5 font-display text-4xl font-extrabold text-navy sm:text-5xl">
              Presença em <span className="text-gradient-gold">cada canto</span> do Rio
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <button
                onClick={() => setOpen(it.src)}
                className={`group relative h-full w-full overflow-hidden rounded-2xl shadow-soft ${it.span}`}
              >
                <img
                  src={it.src}
                  alt="Galeria da campanha"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[100] grid place-items-center bg-navy-deep/90 p-4 backdrop-blur-md"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={open}
              alt="Ampliação"
              className="max-h-[85vh] w-auto max-w-[90vw] rounded-2xl shadow-elegant"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      name: "Dona Iracema",
      role: "Moradora · Nova Friburgo",
      text: "Quando o hospital da nossa cidade recebeu novos equipamentos, senti na pele o cuidado da Carla. É gente que faz diferença.",
    },
    {
      name: "Dr. Paulo Ribeiro",
      role: "Diretor · APAE Regional",
      text: "A Carla foi decisiva para garantir recursos que hoje sustentam nossos programas e atendimentos. Parceira de verdade.",
    },
    {
      name: "Marta Oliveira",
      role: "Professora · Rede Estadual",
      text: "Sempre presente nas escolas, ouvindo, propondo e entregando. Uma parlamentar que respeita a educação pública.",
    },
    {
      name: "Sr. Antônio",
      role: "Produtor rural · Interior do RJ",
      text: "Ela olhou para o pequeno produtor. Isso é raro — e é o que a torna diferente.",
    },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy">
              Depoimentos
            </div>
            <h2 className="mt-5 font-display text-4xl font-extrabold text-navy sm:text-5xl">
              Quem <span className="text-green">viveu</span> conta
            </h2>
          </div>
        </Reveal>
        <div className="relative mt-14 overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-elegant sm:p-14">
          <Quote className="absolute right-8 top-8 h-24 w-24 text-gold/20" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <p className="font-display text-2xl font-medium leading-snug text-navy sm:text-3xl">
                “{items[i].text}”
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full gradient-gold font-display text-lg font-black text-navy-deep shadow-gold">
                  {items[i].name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-display text-lg font-extrabold text-navy">
                    {items[i].name}
                  </div>
                  <div className="text-sm text-muted-foreground">{items[i].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-10 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {items.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  className={`h-2 rounded-full transition-all ${
                    k === i ? "w-8 bg-navy" : "w-2 bg-border"
                  }`}
                  aria-label={`Depoimento ${k + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setI((v) => (v - 1 + items.length) % items.length)}
                className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:bg-secondary"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5 text-navy" />
              </button>
              <button
                onClick={() => setI((v) => (v + 1) % items.length)}
                className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white transition-colors hover:bg-navy-deep"
                aria-label="Próximo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  const regions = [
    { name: "Região Serrana", investment: "R$ 1,2 mi", cx: "62%", cy: "38%" },
    { name: "Norte Fluminense", investment: "R$ 950 mil", cx: "78%", cy: "22%" },
    { name: "Baixadas Litorâneas", investment: "R$ 780 mil", cx: "72%", cy: "58%" },
    { name: "Médio Paraíba", investment: "R$ 640 mil", cx: "28%", cy: "50%" },
    { name: "Metropolitana", investment: "R$ 2,6 mi", cx: "55%", cy: "68%" },
  ];
  const [sel, setSel] = useState(0);
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full glass-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-soft">
              Mapa de atuação
            </div>
            <h2 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">
              Rio de Janeiro, <span className="text-gradient-gold">de ponta a ponta</span>
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl glass p-6">
            {/* Stylized RJ map */}
            <svg viewBox="0 0 100 75" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="mg" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#D4AF37" stopOpacity="0.3" />
                  <stop offset="1" stopColor="#D4AF37" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M8,52 C10,38 22,28 32,26 C42,24 48,18 60,18 C74,18 86,22 92,32 C96,42 92,54 82,60 C68,66 52,64 40,66 C28,68 18,66 12,60 Z"
                fill="url(#mg)"
                stroke="#D4AF37"
                strokeOpacity="0.5"
                strokeWidth="0.4"
              />
            </svg>
            {regions.map((r, k) => (
              <button
                key={r.name}
                onClick={() => setSel(k)}
                style={{ left: r.cx, top: r.cy }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                aria-label={r.name}
              >
                <span className="relative grid h-4 w-4 place-items-center">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
                      sel === k ? "bg-gold" : "bg-gold/60"
                    } opacity-60`}
                  />
                  <span
                    className={`relative h-4 w-4 rounded-full ring-2 ring-white/60 transition-all ${
                      sel === k ? "scale-125 bg-gold" : "bg-gold/80"
                    }`}
                  />
                </span>
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {regions.map((r, k) => (
              <button
                key={r.name}
                onClick={() => setSel(k)}
                className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                  sel === k
                    ? "border-gold bg-gold/10 shadow-gold"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl gradient-gold">
                  <MapPin className="h-5 w-5 text-navy-deep" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-base font-extrabold">{r.name}</div>
                  <div className="text-xs text-white/60">Investimento destinado</div>
                </div>
                <div className="font-display text-lg font-black text-gold">{r.investment}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="doar" className="relative overflow-hidden py-0">
      <div className="relative min-h-[560px]">
        <img
          src={ctaImg}
          alt="Carla Machado com apoiadores"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/40" />
        <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center px-4 py-24 sm:px-6">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full glass-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-soft">
                Vamos juntos
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                O trabalho continua. Vamos construir ainda{" "}
                <span className="text-gradient-gold">mais pelo nosso Estado.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg text-white/80">
                Sua doação, seu voto e seu apoio são o combustível de um mandato que trabalha —
                todos os dias — pelo Rio de Janeiro.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button className="group inline-flex items-center gap-2 rounded-full gradient-green px-8 py-4 text-base font-semibold text-white shadow-green transition-all hover:scale-[1.03]">
                  <Heart className="h-5 w-5" />
                  Faça parte desta caminhada
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10"
                >
                  <MessageCircle className="h-5 w-5" /> Fale conosco
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="rodape" className="bg-navy-deep py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-gold shadow-gold">
                <span className="font-display text-lg font-black text-navy-deep">CM</span>
              </div>
              <div className="min-w-0">
                <div className="font-display text-lg font-extrabold">Carla Machado</div>
                <div className="text-xs uppercase tracking-widest text-gold-soft">
                  Deputada Estadual · 12345
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              Experiência para fazer. Sensibilidade para cuidar. Um mandato dedicado ao Rio de
              Janeiro e à sua gente.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Youtube, label: "YouTube" },
                { icon: MessageCircle, label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 transition-all hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gold-soft">
              Navegação
            </div>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {[
                ["Números", "#numeros"],
                ["Áreas de atuação", "#atuacao"],
                ["Conquistas", "#conquistas"],
                ["Trajetória", "#trajetoria"],
                ["Prestação de contas", "#contas"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="transition-colors hover:text-gold">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gold-soft">
              Contato
            </div>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>contato@carlamachado.com.br</li>
              <li>WhatsApp: (21) 90000-0000</li>
              <li>Rio de Janeiro, RJ</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          <p>
            Propaganda eleitoral gratuita. CNPJ da campanha: 00.000.000/0001-00. Doações via
            plataforma oficial autorizada pelo TSE.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Campanha Carla Machado — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- Page -------------------- */

function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Numbers />
      <Areas />
      <Achievements />
      <Timeline />
      <Accountability />
      <Gallery />
      <Testimonials />
      <MapSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
