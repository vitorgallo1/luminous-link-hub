import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "motion/react";
import {
  Heart,
  GraduationCap,
  HandHeart,
  Sprout,
  Building2,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  MapPin,
  Quote,
  Sparkles,
  Users,
  Accessibility,
  Trophy,
  Landmark,
  Palette,
  Volleyball,
  PlayCircle,
  X,
  Calendar,
  ShieldCheck,
  Star,
} from "lucide-react";

import heroAsset from "@/assets/carla-portrait-real.jpg.asset.json";
import fotoHeroImg from "@/assets/fotohero.jpeg";
import heroWallpaper from "@/assets/wallpaperhero.png";
import ctaAsset from "@/assets/carla-cta-real.jpg.asset.json";
import peopleAsset from "@/assets/carla-people-real.jpg.asset.json";
import eventAsset from "@/assets/carla-event.jpg.asset.json";
import hospitalImg from "@/assets/achievement-hospital.jpg";
import universityImg from "@/assets/achievement-university.jpg";
import agriImg from "@/assets/achievement-agri.jpg";
import inicioServicoPublicoImg from "@/assets/inicioservicopublico.jpg";
import fundacaoApaeImg from "@/assets/fundacaoapae.jpg";
import primeiraMulherImg from "@/assets/primeiramulher.jpg";
import deputadaEstadualImg from "@/assets/deputadaestadualaelrj.jpg";
import frenteParlamentarImg from "@/assets/frenteparlamentarpessoas.jpg";
import quatroMandatosImg from "@/assets/quatromandatos.png";
import primeiraMulherPresidenteImg from "@/assets/primeiramulherpresidente.jpg";
import logoImg from "@/assets/logo.png";
import mascote88Asset from "@/assets/mascote-88.png.asset.json";
import alerjFala1Asset from "@/assets/alerj-fala-1.jpg.asset.json";
import alerjFala2Asset from "@/assets/alerj-fala-2.jpg.asset.json";
import alerjFala3Asset from "@/assets/alerj-fala-3.jpg.asset.json";
import alerjFala4Asset from "@/assets/alerj-fala-4.jpg.asset.json";
import alerjMocao1Asset from "@/assets/alerj-mocao-1.jpg.asset.json";
import alerjMocao2Asset from "@/assets/alerj-mocao-2.jpg.asset.json";
import alerjMedalhaAsset from "@/assets/alerj-medalha.jpg.asset.json";
import alerjColetivaAsset from "@/assets/alerj-coletiva.jpg.asset.json";
import reuniaoGabineteAsset from "@/assets/reuniao-gabinete.jpg.asset.json";
const mascote88 = mascote88Asset.url;

const heroImg = fotoHeroImg;
const ctaImg = ctaAsset.url;
const peopleImg = peopleAsset.url;
const eventImg = eventAsset.url;
void eventImg;
import {
  AtuacaoParlamentar,
  PrestacaoContasMandato,
  InvestimentosPorArea,
  MapaAtuacao,
  PrincipaisEntregas,
  TimelineMandato,
  ImpactoEstado,
  AtuacaoAlerj,
  ProjetosSociais,
  ProjetosLeiDestaque,
  IndicacoesMandato,
  GaleriaCategorias,
  Legado,
} from "@/components/mandate-sections";
import FotoHero from "@/components/ui/fotohero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/DBXPqjnAqZY3oKEBVGnCbVwPOSK2/social-images/social-1784933340407-IMG_0552.webp",
      },
    ],
  }),
  component: LandingPage,
});

/* ============ Helpers ============ */

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
  const inView = useInView(ref, { once: true, margin: "-60px" });
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
  x = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
      <Sparkles className="h-3 w-3" />
      {children}
    </div>
  );
}

/* ============ Nav ============ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    ["Trajetória", "#trajetoria"],
    ["Mandato", "#atuacao"],
    ["Projetos", "#projetos"],
    ["Indicações", "#indicacoes"],
    ["Prestação", "#prestacao"],
    ["Entregas", "#entregas"],
    ["Mapa", "#mapa-atuacao"],
    ["Causas", "#causas"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
            scrolled
              ? "border border-white/10 bg-navy-deep/85 shadow-elegant backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <a href="#top" className="ml-1 flex min-w-0 items-center sm:ml-2">
            <img src={logoImg} alt="Carla Machado, Deputada Estadual" className="h-14 w-auto shrink-0 object-contain sm:h-16" />
          </a>
          <div className="flex items-center gap-2 sm:gap-4">
            <nav className="hidden items-center gap-6 xl:flex">
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
              href="#caminhar"
              className="hidden sm:inline-flex items-center gap-2 rounded-full gradient-green px-5 py-2.5 text-sm font-semibold text-white shadow-green transition-transform hover:scale-105"
            >
              <Heart className="h-4 w-4" /> Caminhar juntos
            </a>
            <button
              aria-label="Menu"
              onClick={() => setOpen(!open)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white xl:hidden"
            >
              <div className="space-y-1.5">
                <span className="block h-0.5 w-5 bg-white" />
                <span className="block h-0.5 w-5 bg-white" />
                <span className="block h-0.5 w-3 bg-gold" />
              </div>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2 rounded-2xl border border-white/10 bg-navy-deep/95 p-4 backdrop-blur-xl xl:hidden"
            >
              <div className="grid gap-1">
                {links.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-gold"
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="#caminhar"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-green px-5 py-2.5 text-sm font-semibold text-white"
                >
                  <Heart className="h-4 w-4" /> Caminhar juntos
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ============ Hero ============ */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 170]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 55, damping: 20, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 20, mass: 0.6 });
  const glowX = useTransform(springX, [-0.5, 0.5], [-50, 50]);
  const glowY = useTransform(springY, [-0.5, 0.5], [-50, 50]);
  const tiltX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const indicators = [
    { label: "Anos de vida pública", value: "43", icon: Users, gold: true },
    { label: "Mandatos como Prefeita", value: "4", icon: Building2, gold: true },
    { label: "Deputada Estadual", value: "Alerj", icon: Landmark, gold: true },
    { label: "Pioneira em São João da Barra", value: "1ª mulher", icon: Star, gold: true },
  ];

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate min-h-screen overflow-hidden bg-navy-deep pt-28 pb-16 sm:pt-32"
    >
      {/* Cinematic layered background */}
      <motion.div style={{ y: yBg }} className="pointer-events-none absolute inset-0">
        {/* Rio skyline wallpaper base */}
        <img
          src={heroWallpaper}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Contrast overlay: darker over the text column, lighter toward the portrait */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, oklch(0.19 0.07 258 / 1) 0%, oklch(0.19 0.07 258 / 0.85) 45%, oklch(0.19 0.07 258 / 0.35) 75%)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 100% at 50% 28%, transparent 30%, oklch(0.12 0.05 258 / 0.7) 100%)",
          }}
        />

        {/* Large radial glow behind the portrait */}
        <div className="absolute right-[4%] top-1/2 hidden h-[720px] w-[720px] -translate-y-1/2 rounded-full bg-gold/15 blur-[170px] lg:block" />

        {/* Thin golden curved lines crossing diagonally */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 900"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M -50 700 Q 400 400 700 550 T 1300 300"
            fill="none"
            stroke="url(#goldLine)"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          />
          <motion.path
            d="M -80 150 Q 320 60 650 210 T 1350 100"
            fill="none"
            stroke="url(#goldLine2)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{ duration: 2.4, ease: "easeOut", delay: 0.3 }}
          />
          <defs>
            <linearGradient id="goldLine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="oklch(0.79 0.13 85 / 0)" />
              <stop offset="50%" stopColor="oklch(0.79 0.13 85 / 0.9)" />
              <stop offset="100%" stopColor="oklch(0.79 0.13 85 / 0)" />
            </linearGradient>
            <linearGradient id="goldLine2" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="oklch(0.79 0.13 85 / 0)" />
              <stop offset="50%" stopColor="oklch(0.79 0.13 85 / 0.7)" />
              <stop offset="100%" stopColor="oklch(0.79 0.13 85 / 0)" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1760px] pl-4 pr-4 sm:pl-6 sm:pr-6 lg:pl-10 lg:pr-6 xl:pl-16 xl:pr-8 2xl:pl-20 2xl:pr-10">
        <div className="grid grid-cols-1 items-stretch gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16 xl:gap-20">
          {/* Text side */}
          <div className="order-2 lg:order-1 lg:pl-4 xl:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
                <MapPin className="h-3 w-3" />
                Deputada Estadual · Rio de Janeiro
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="mt-6 font-display font-extrabold leading-[0.95] tracking-tight text-white text-[40px] sm:text-[52px] lg:text-[68px] xl:text-[84px]"
            >
              Experiência
              <br />
              para fazer.
              <br />
              <span className="text-gradient-gold">
                Sensibilidade
                <br />
                para cuidar.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="mt-6 max-w-[520px] text-[18px] leading-relaxed text-white/75"
            >
              Há mais de <strong className="text-white">43 anos</strong> dedicando sua
              vida ao serviço público, Carla Machado construiu uma trajetória marcada
              por trabalho, resultados e compromisso com as pessoas. Hoje, segue
              representando o interior do Rio de Janeiro na Alerj, defendendo quem mais
              precisa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#trajetoria"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full gradient-gold px-7 py-3.5 text-sm font-bold text-navy-deep shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-12px_oklch(0.79_0.13_85/0.65)]"
              >
                Conheça a trajetória
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contas"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-white/10 hover:text-gold"
              >
                <ShieldCheck className="h-4 w-4" />
                Prestação de Contas
              </a>
            </motion.div>
          </div>

          {/* Portrait side */}
          <motion.div
            style={{ y: yImg }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 lg:h-full"
          >
            <div className="relative mx-auto max-w-md lg:h-full lg:max-w-none">
              {/* Radial golden glow behind portrait, following cursor */}
              <motion.div
                style={{ x: glowX, y: glowY }}
                className="pointer-events-none absolute inset-0 -z-10 blur-[110px]"
              >
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.79 0.13 85 / 0.22) 0%, transparent 70%)",
                  }}
                />
              </motion.div>
              {/* Small ambient glow matching the photo's own colors */}
              <div className="pointer-events-none absolute -inset-3 -z-10 overflow-hidden rounded-[36px]">
                <img
                  src={heroImg}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full scale-110 object-cover opacity-80 blur-2xl saturate-150"
                  style={{ objectPosition: "78% 35%" }}
                />
              </div>

              {/* Floating portrait */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
                className="relative lg:h-full"
              >
                <div className="relative aspect-[7/5] overflow-hidden rounded-[32px] border border-white/10 shadow-elegant lg:aspect-auto lg:h-full">
                  <img
                    src={heroImg}
                    alt="Carla Machado, Deputada Estadual"
                    width={1600}
                    height={1068}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "78% 35%" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/70 to-transparent" />
                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-navy-deep/70 p-3 backdrop-blur-xl"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl gradient-green">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                        Do interior para todo o Estado
                      </div>
                      <div className="truncate text-sm font-medium text-white/90">
                        São João da Barra · Norte Fluminense
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Floating card - years */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3, duration: 0.7 }}
                  whileHover={{ y: -4 }}
                  className="absolute -right-3 top-8 hidden rounded-2xl border border-gold/30 bg-white/95 p-4 shadow-elegant sm:block lg:-right-6"
                >
                  <div className="font-display text-3xl font-black text-navy">43</div>
                  <div className="text-[10px] font-semibold uppercase tracking-widest text-navy/70">
                    anos servindo
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Indicators — full-width row beneath both columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {indicators.map((i) => {
            const Icon = i.icon;
            return (
              <motion.div
                key={i.label}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/25"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25">
                  <Icon className="h-4 w-4 text-white/70" />
                </div>
                <div className="min-w-0">
                  <div
                    className={`font-display text-2xl font-black leading-none sm:text-3xl ${
                      i.gold ? "text-gold" : "text-white"
                    }`}
                  >
                    {i.value}
                  </div>
                  <div className="mt-1.5 text-[11px] font-medium leading-snug text-white/60">
                    {i.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="relative mt-16 border-y border-white/10 bg-navy-deep/40 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 sm:text-xs">
          <span className="text-gold">Trabalho</span>
          <span>·</span>
          <span>Resultados</span>
          <span>·</span>
          <span className="text-gold">Cuidado</span>
          <span>·</span>
          <span>Interior forte</span>
          <span>·</span>
          <span className="text-gold">Inclusão</span>
          <span>·</span>
          <span>Mulheres</span>
        </div>
      </div>
    </section>
  );
}

/* ============ Trajetória (Timeline) ============ */

const timeline = [
  {
    year: "1983",
    title: "O início do serviço público",
    text:
      "Professora de formação, Carla Machado iniciou sua trajetória no serviço público, em 1983, na área da Educação, atuando como assessora e, posteriormente, como Secretária Municipal de Educação de São João da Barra. Sempre defendeu a educação como instrumento de transformação social, pautando sua atuação pela valorização do ensino e pelo desenvolvimento das pessoas.",
    icon: Sparkles,
    img: inicioServicoPublicoImg,
  },
  {
    year: "1992",
    title: "Fundação da APAE",
    text:
      "Em 1992, Carla Machado fundou a APAE de São João da Barra e tornou-se a primeira presidente. A atuação junto às pessoas com deficiência e suas famílias marca sua trajetória pública, pautada pelo acolhimento, pela inclusão e pela defesa dos direitos, princípios que seguem presentes em sua atuação política por décadas.",
    icon: HandHeart,
    img: fundacaoApaeImg,
  },
  {
    year: "1996",
    title: "Primeira mulher Presidente da Câmara",
    text:
      "Eleita vereadora em 1996, Carla Machado tornou-se a primeira mulher a presidir a Câmara Municipal de São João da Barra. Sua gestão foi marcada pelo fortalecimento do Legislativo e pelo diálogo com a população, consolidando um importante avanço para a participação feminina nos espaços de liderança política.",
    icon: Users,
    img: primeiraMulherPresidenteImg,
  },
  {
    year: "2004",
    title: "Primeira mulher Prefeita de São João da Barra",
    text:
      "Em 2004, Carla Machado tornou-se a primeira mulher eleita prefeita de São João da Barra. Sua gestão foi marcada por investimentos em áreas estratégicas, como infraestrutura, educação, saúde e assistência social, contribuindo para o desenvolvimento do município e para a melhoria da qualidade de vida da população.",
    icon: Landmark,
    img: primeiraMulherImg,
  },
  {
    year: "2001 – 2020",
    title: "Quatro mandatos como Prefeita",
    text:
      "Ao longo de quatro mandatos, Carla Machado liderou importantes transformações em São João da Barra, com investimentos em infraestrutura, saúde, educação e programas sociais. Também acompanhou o processo de desenvolvimento impulsionado pelo Complexo Portuário do Açu, atuando para ampliar oportunidades e promover melhorias para a população.",
    icon: Trophy,
    img: quatroMandatosImg,
  },
  {
    year: "2023",
    title: "Deputada Estadual pela Alerj",
    text:
      "Eleita deputada estadual em 2022, Carla Machado passou a representar o Norte e o Noroeste Fluminense na Assembleia Legislativa do Rio de Janeiro. Sua atuação é voltada à defesa dos municípios do interior, com foco na destinação de recursos, no desenvolvimento regional e no fortalecimento de políticas públicas essenciais.",
    icon: Building2,
    img: deputadaEstadualImg,
  },
  {
    year: "2024",
    title: "Frente Parlamentar em Defesa das Pessoas com TEA",
    text:
      "Na Alerj, Carla Machado criou e coordena a Frente Parlamentar em Defesa das Pessoas com Transtorno do Espectro Autista (TEA). A iniciativa reúne famílias, especialistas e entidades para fortalecer políticas de inclusão, ampliar direitos e promover mais acolhimento e acessibilidade às pessoas atípicas.",
    icon: Accessibility,
    img: frenteParlamentarImg,
  },
];

function Trajetoria() {
  return (
    <section id="trajetoria" className="relative bg-background py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-0 top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-0 bottom-20 h-96 w-96 rounded-full bg-green/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Uma vida dedicada às pessoas</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl font-black leading-tight text-navy sm:text-5xl">
              Experiência para fazer.{" "}
              <span className="text-gradient-gold">Sensibilidade para cuidar.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Cada etapa da trajetória de Carla Machado é marcada por escolhas
              corajosas, entrega diária e a convicção de que política de verdade se
              faz junto de quem precisa.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-20">
          {/* Central line */}
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-14 sm:space-y-20">
            {timeline.map((step, i) => {
              const Icon = step.icon;
              const left = i % 2 === 0;
              return (
                <Reveal key={step.year} delay={0.05}>
                  <div className="relative grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-2 sm:gap-10">
                    {/* Marker */}
                    <div className="absolute left-6 top-3 z-10 -translate-x-1/2 sm:left-1/2">
                      <div className="grid h-12 w-12 place-items-center rounded-full gradient-gold shadow-gold ring-4 ring-background">
                        <Icon className="h-5 w-5 text-navy-deep" />
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`col-span-1 col-start-2 ${
                        left ? "sm:col-start-1 sm:pr-16 sm:text-right" : "sm:col-start-2 sm:pl-16"
                      }`}
                    >
                      <div className="inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gold">
                        <Calendar className="h-3 w-3" />
                        {step.year}
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-extrabold text-navy sm:text-3xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        {step.text}
                      </p>
                    </div>

                    {/* Image */}
                    <div
                      className={`hidden sm:block ${
                        left ? "sm:col-start-2 sm:pl-16" : "sm:col-start-1 sm:row-start-1 sm:pr-16"
                      }`}
                    >
                      <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="overflow-hidden rounded-2xl border border-border shadow-soft"
                      >
                        <img
                          src={step.img}
                          alt={step.title}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </motion.div>
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

/* ============ Números (Dashboard) ============ */

function Numeros() {
  const kpis = [
    { label: "Anos de vida pública", value: 43, suffix: "", accent: "gold" },
    { label: "Mandatos como Prefeita", value: 4, suffix: "", accent: "navy" },
    { label: "Milhões em emendas", value: 6.2, prefix: "R$ ", decimals: 1, accent: "green" },
    { label: "Instituições beneficiadas", value: 100, suffix: "+", accent: "gold" },
  ];
  const areas = [
    { label: "Saúde", pct: 32, color: "bg-red-500/80" },
    { label: "Educação", pct: 24, color: "bg-gold" },
    { label: "Inclusão", pct: 18, color: "bg-green" },
    { label: "Cultura", pct: 14, color: "bg-navy" },
    { label: "Assistência Social", pct: 12, color: "bg-navy-soft" },
  ];
  return (
    <section
      id="numeros"
      className="relative overflow-hidden bg-navy-deep py-24 text-white sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-gold/15 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-green/15 blur-[130px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Resultados em movimento</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl font-black leading-tight sm:text-5xl">
              Números que <span className="text-gradient-gold">falam por si</span>.
            </h2>
            <p className="mt-5 text-white/70 sm:text-lg">
              Um panorama transparente do trabalho realizado por Carla Machado ao lado
              do interior do Rio de Janeiro.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((k, i) => (
            <Reveal key={k.label} delay={i * 0.08}>
              <div className="glass group relative h-full overflow-hidden rounded-3xl p-6">
                <div className="absolute inset-x-0 top-0 h-1 gradient-gold opacity-70" />
                <div className="font-display text-4xl font-black leading-none text-white sm:text-5xl">
                  <Counter
                    target={k.value}
                    prefix={k.prefix}
                    suffix={k.suffix}
                    decimals={k.decimals ?? 0}
                  />
                </div>
                <div className="mt-3 text-sm font-medium text-white/70">{k.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Distribution card */}
        <Reveal delay={0.15}>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="glass rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-extrabold text-white sm:text-2xl">
                  Distribuição dos investimentos
                </h3>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                  2023 – 2025
                </span>
              </div>
              <div className="mt-6 space-y-5">
                {areas.map((a) => (
                  <div key={a.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-white/90">{a.label}</span>
                      <span className="font-mono text-white/70">{a.pct}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${a.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className={`h-full rounded-full ${a.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {[
                { icon: HandHeart, label: "Investimentos em Saúde", val: "R$ 2,0 mi" },
                { icon: GraduationCap, label: "Investimentos em Educação", val: "R$ 1,5 mi" },
                { icon: Accessibility, label: "Investimentos em Inclusão", val: "R$ 1,1 mi" },
                { icon: Palette, label: "Cultura e Assistência", val: "R$ 1,6 mi" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="glass flex items-center gap-4 rounded-2xl p-4"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-gold">
                      <Icon className="h-5 w-5 text-navy-deep" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-white/80">
                        {item.label}
                      </div>
                      <div className="font-display text-lg font-extrabold text-white">
                        {item.val}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ Prestação de Contas ============ */

const contas = [
  {
    icon: HandHeart,
    title: "Saúde",
    value: "R$ 2,0 milhões",
    color: "from-red-500/20 to-transparent",
    items: [
      "Hospitais municipais equipados",
      "Ampliação da atenção básica",
      "Centros terapêuticos apoiados",
    ],
    inst: 28,
  },
  {
    icon: GraduationCap,
    title: "Educação",
    value: "R$ 1,5 milhão",
    color: "from-gold/20 to-transparent",
    items: [
      "Escolas do interior modernizadas",
      "Material didático e reforço escolar",
      "Programas de alfabetização",
    ],
    inst: 22,
  },
  {
    icon: Accessibility,
    title: "Inclusão",
    value: "R$ 1,1 milhão",
    color: "from-green/25 to-transparent",
    items: [
      "APAEs de todo o Norte Fluminense",
      "Centros terapêuticos para TEA",
      "Frente parlamentar ativa",
    ],
    inst: 18,
  },
  {
    icon: HandHeart,
    title: "Assistência Social",
    value: "R$ 800 mil",
    color: "from-navy/20 to-transparent",
    items: [
      "Casas de acolhimento",
      "Programas para mulheres em risco",
      "Apoio a famílias vulneráveis",
    ],
    inst: 14,
  },
  {
    icon: Palette,
    title: "Cultura",
    value: "R$ 500 mil",
    color: "from-gold/20 to-transparent",
    items: [
      "Festas populares e tradição",
      "Bandas, corais e grupos folclóricos",
      "Editais para artistas locais",
    ],
    inst: 12,
  },
  {
    icon: Volleyball,
    title: "Esporte",
    value: "R$ 300 mil",
    color: "from-green/20 to-transparent",
    items: [
      "Escolinhas em bairros",
      "Reformas de quadras públicas",
      "Apoio a atletas amadores",
    ],
    inst: 8,
  },
];

function Contas() {
  return (
    <section id="contas" className="relative bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Prestação de Contas</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl font-black leading-tight text-navy sm:text-5xl">
              Transparência total.{" "}
              <span className="text-gradient-gold">Compromisso público.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Onde cada real foi aplicado, quais instituições foram beneficiadas e o
              impacto concreto na vida de milhares de famílias do Rio de Janeiro.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contas.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 0.06}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 220 }}
                  className={`group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.color} opacity-70`}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-gold shadow-gold">
                        <Icon className="h-6 w-6 text-navy-deep" />
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Investido
                        </div>
                        <div className="font-display text-lg font-black text-navy">
                          {c.value}
                        </div>
                      </div>
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-extrabold text-navy">
                      {c.title}
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-navy/80">
                      {c.items.map((it) => (
                        <li key={it} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Mini bars */}
                    <div className="mt-6 flex items-end gap-1.5">
                      {[40, 62, 48, 78, 55, 92, 70].map((h, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.05 }}
                          className="w-full rounded-t bg-gradient-to-t from-navy/70 to-gold/70"
                          style={{ maxHeight: 56 }}
                        />
                      ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <div className="text-sm">
                        <span className="font-display text-xl font-black text-navy">
                          {c.inst}
                        </span>
                        <span className="ml-1 text-xs text-muted-foreground">
                          instituições beneficiadas
                        </span>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-navy/60 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold" />
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}


/* ============ Causas ============ */

const causas = [
  {
    icon: Accessibility,
    emoji: "♿",
    title: "Inclusão e Autismo",
    subtitle: "Voz para as famílias atípicas",
    text: "Frente Parlamentar em Defesa das Pessoas com TEA, apoio às APAEs e recursos para centros terapêuticos em todo o interior.",
    color: "from-green/20",
  },
  {
    icon: Users,
    emoji: "👩",
    title: "Mulheres",
    subtitle: "Proteção, saúde e autonomia",
    text: "Ações de combate à violência, apoio ao empreendedorismo feminino, saúde da mulher e políticas públicas com escuta ativa.",
    color: "from-gold/20",
  },
  {
    icon: Sprout,
    emoji: "🌾",
    title: "Interior Forte",
    subtitle: "Desenvolvimento com raiz",
    text: "Porto do Açu, agricultura familiar, infraestrutura e geração de empregos que mantêm as famílias na sua terra.",
    color: "from-green/25",
  },
  {
    icon: HandHeart,
    emoji: "❤️",
    title: "Saúde",
    subtitle: "Cuidado ao alcance de todos",
    text: "Emendas para hospitais, ampliação da atenção básica e apoio a centros terapêuticos para quem precisa.",
    color: "from-red-500/15",
  },
];

function Causas() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="causas" className="relative overflow-hidden bg-secondary py-24 sm:py-32">
      {/* Autism awareness accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-puzzle-pattern"
        style={{ opacity: 0.06 }}
      />
      <img
        aria-hidden
        src={mascote88}
        alt=""
        className="pointer-events-none absolute -bottom-6 -right-6 w-40 select-none opacity-[0.10] mix-blend-multiply animate-float-slow sm:w-56 md:w-64"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>As causas que movem a Carla</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl font-black leading-tight text-navy sm:text-5xl">
              Um mandato com <span className="text-gradient-gold">propósito</span>.
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {causas.map((c, i) => {
            const Icon = c.icon;
            const isOpen = open === i;
            return (
              <Reveal key={c.title} delay={i * 0.08}>
                <motion.div
                  layout
                  whileHover={{ y: -6 }}
                  className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft transition-shadow hover:shadow-elegant`}
                >
                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${c.color} to-transparent blur-2xl`}
                  />
                  <div className="relative flex items-start gap-5">
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl gradient-gold text-2xl shadow-gold">
                      <Icon className="h-7 w-7 text-navy-deep" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold uppercase tracking-widest text-gold">
                        {c.subtitle}
                      </div>
                      <h3 className="mt-1 font-display text-2xl font-extrabold text-navy">
                        {c.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {c.text}
                      </p>
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
                      >
                        {isOpen ? "Fechar" : "Ver mais"}
                        <ArrowRight
                          className={`h-4 w-4 transition-transform ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <ul className="mt-4 grid gap-2 border-t border-border pt-4 text-sm text-navy/85">
                              <li className="flex gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                                Projetos em tramitação na Alerj
                              </li>
                              <li className="flex gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                                Parcerias com prefeituras e entidades
                              </li>
                              <li className="flex gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                                Escuta ativa em audiências públicas
                              </li>
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ Galeria ============ */

const gallery = [
  { src: peopleImg, alt: "Encontro com moradoras", h: "tall" },
  { src: hospitalImg, alt: "Visita a hospital", h: "short" },
  { src: universityImg, alt: "Escola atendida", h: "medium" },
  { src: agriImg, alt: "Agricultura familiar", h: "tall" },
  { src: ctaImg, alt: "Ato público", h: "medium" },
  { src: peopleImg, alt: "Comunidade", h: "short" },
  { src: hospitalImg, alt: "Saúde", h: "medium" },
  { src: universityImg, alt: "Educação", h: "tall" },
];

function Galeria() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Momentos</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl font-black leading-tight text-navy sm:text-5xl">
              Cada visita, <span className="text-gradient-gold">uma história</span>.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 columns-2 gap-4 sm:columns-3 lg:columns-4">
          {gallery.map((g, i) => (
            <motion.button
              key={i}
              onClick={() => setOpen(i)}
              whileHover={{ scale: 1.02 }}
              className="mb-4 block w-full overflow-hidden rounded-2xl border border-border shadow-soft"
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className={`w-full object-cover ${
                  g.h === "tall"
                    ? "aspect-[3/4]"
                    : g.h === "short"
                      ? "aspect-[4/3]"
                      : "aspect-square"
                }`}
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
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
              src={gallery[open].src}
              alt={gallery[open].alt}
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

/* ============ Depoimentos ============ */

const testimonials = [
  {
    name: "Dona Marlene",
    role: "Mãe atípica · Campos dos Goytacazes",
    text: "A Carla foi a primeira que abriu a porta pra ouvir a gente. Hoje meu filho tem terapia e um lugar pra chamar de seu.",
    img: peopleImg,
  },
  {
    name: "Prof. Ricardo",
    role: "Educador · São João da Barra",
    text: "Recebemos investimento pra reformar a escola. Ver as crianças aprendendo num ambiente digno não tem preço.",
    img: universityImg,
  },
  {
    name: "Dr. André",
    role: "Diretor de Hospital",
    text: "Emendas destinadas com responsabilidade e acompanhamento. A saúde do interior agradece.",
    img: hospitalImg,
  },
  {
    name: "Sr. João",
    role: "Agricultor familiar",
    text: "Quando o interior é lembrado, o Estado inteiro cresce. A Carla nunca esqueceu de onde veio.",
    img: agriImg,
  },
];

function Depoimentos() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % testimonials.length);
  const prev = () => setI((v) => (v - 1 + testimonials.length) % testimonials.length);
  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section className="relative overflow-hidden bg-navy py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[130px]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Quem viveu, conta</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl font-black leading-tight sm:text-5xl">
              Vozes que <span className="text-gradient-gold">confirmam</span>.
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-3xl border border-white/10 shadow-elegant"
            >
              <img
                src={t.img}
                alt={t.name}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div>
            <Quote className="h-12 w-12 text-gold/70" />
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
              >
                <p className="mt-4 font-display text-2xl font-medium leading-relaxed text-white sm:text-3xl">
                  “{t.text}”
                </p>
                <div className="mt-6">
                  <div className="font-display text-lg font-extrabold text-gold">
                    {t.name}
                  </div>
                  <div className="text-sm text-white/70">{t.role}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={prev}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="ml-3 flex gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === i ? "w-8 bg-gold" : "w-2 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Vídeo ============ */

function Video() {
  const [playing, setPlaying] = useState(false);
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Assista</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl font-black leading-tight text-navy sm:text-5xl">
              Conheça a <span className="text-gradient-gold">história da Carla</span>.
            </h2>
            <p className="mt-5 text-muted-foreground sm:text-lg">
              Em poucos minutos, uma trajetória que atravessa gerações.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-border shadow-elegant">
            <img
              src={peopleImg}
              alt="Vídeo institucional"
              loading="lazy"
              className="aspect-video w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
            <button
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 grid place-items-center"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                className="grid h-24 w-24 place-items-center rounded-full gradient-gold shadow-gold sm:h-28 sm:w-28"
              >
                <PlayCircle className="h-12 w-12 text-navy-deep sm:h-14 sm:w-14" />
              </motion.div>
            </button>
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gold">
                Vídeo institucional
              </div>
              <div className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
                Uma vida a serviço do interior do Rio.
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ Feed Social ============ */

const posts = [
  { icon: Instagram, tag: "Instagram", text: "Manhã em São João da Barra ao lado da APAE." , img: peopleImg },
  { icon: Facebook, tag: "Facebook", text: "Emenda aprovada para o Hospital dos Plantadores.", img: hospitalImg },
  { icon: Youtube, tag: "YouTube", text: "Novo vídeo: 43 anos servindo o Rio de Janeiro.", img: ctaImg },
  { icon: Instagram, tag: "Instagram", text: "Encontro com professores de Campos.", img: universityImg },
];

function Feed() {
  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow>Nas redes</SectionEyebrow>
            <h2 className="mt-5 font-display text-4xl font-black leading-tight text-navy sm:text-5xl">
              Acompanhe o <span className="text-gradient-gold">dia a dia</span>.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={i} delay={i * 0.06}>
                <motion.a
                  href="#"
                  whileHover={{ y: -6 }}
                  className="group block overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={p.img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                      <Icon className="h-3.5 w-3.5" /> {p.tag}
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-relaxed text-navy/85">{p.text}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-gold">
                      Ver publicação
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </motion.a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============ CTA Final ============ */

function CTAFinal() {
  return (
    <section id="caminhar" className="relative overflow-hidden bg-navy-deep py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-gold/20 blur-[110px]" />
        <div className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-green/20 blur-[130px]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-elegant">
            <img
              src={ctaImg}
              alt="Carla Machado"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <SectionEyebrow>Chegou a hora</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl font-black leading-[1.1] sm:text-5xl lg:text-6xl">
              O Rio de Janeiro precisa de quem{" "}
              <span className="text-gradient-gold">sabe fazer</span> e nunca deixou
              de cuidar.
            </h2>
            <p className="mt-6 max-w-xl text-white/80 sm:text-lg">
              Junte-se a milhares de pessoas que acreditam na experiência, na
              sensibilidade e na coragem de continuar transformando o interior e
              todo o Estado.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                className="group inline-flex items-center gap-2 rounded-full gradient-gold px-8 py-4 text-sm font-bold text-navy-deep shadow-gold transition-transform hover:scale-105"
              >
                Quero caminhar com Carla Machado
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://wa.me/5522999999999"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur hover:border-green hover:text-green"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ Footer ============ */

function Footer() {
  return (
    <footer id="rodape" className="bg-navy-deep pt-20 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img src={logoImg} alt="Carla Machado, Deputada Estadual" className="h-16 w-auto object-contain" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              Experiência para fazer. Sensibilidade para cuidar. Uma trajetória de 43
              anos a serviço do interior do Rio de Janeiro.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { icon: MessageCircle, href: "https://wa.me/5522999999999", label: "WhatsApp", color: "hover:bg-green" },
                { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-gold" },
                { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-gold" },
                { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-gold" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className={`grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white transition-colors ${s.color} hover:text-navy-deep`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gold">
              Navegar
            </div>
            <ul className="mt-5 grid gap-3 text-sm text-white/80">
              {[
                ["Trajetória", "#trajetoria"],
                ["Números", "#numeros"],
                ["Prestação de Contas", "#contas"],
                ["Causas", "#causas"],
                ["Mapa", "#mapa-atuacao"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="transition-colors hover:text-gold">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-gold">
              Fale conosco
            </div>
            <ul className="mt-5 grid gap-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Alerj · Rio de Janeiro, RJ
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                (22) 99999-9999
              </li>
              <li className="flex items-start gap-2">
                <Heart className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                contato@carlamachado.com.br
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} Coligação Carla Machado. Todos os direitos
            reservados.
          </div>
          <div className="mt-3 max-w-2xl sm:mt-0 sm:text-right">
            Propaganda eleitoral gratuita, conforme legislação vigente. CNPJ da
            campanha: 00.000.000/0001-00.
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============ Page ============ */


function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Autism awareness — subtle puzzle-piece watermark across the whole page */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-puzzle-pattern"
        style={{ opacity: 0.04 }}
      />
      <div className="relative z-10">
      <Nav />

      <main>
        <Hero />
        <Trajetoria />
        <AtuacaoParlamentar />
        <AtuacaoAlerj />
        <ProjetosSociais />
        <ProjetosLeiDestaque />
        <IndicacoesMandato />
        <PrestacaoContasMandato />
        <InvestimentosPorArea />
        <MapaAtuacao />
        <PrincipaisEntregas />
        <TimelineMandato />
        <ImpactoEstado />
        <Contas />
        
        <Causas />
        <GaleriaCategorias
          imagens={[
            { src: inicioServicoPublicoImg, alt: "Início do serviço público na Educação (1983)", cat: "Educação" },
            { src: fundacaoApaeImg, alt: "Fundação da APAE de São João da Barra (1992)", cat: "Inclusão" },
            { src: primeiraMulherPresidenteImg, alt: "Primeira mulher Presidente da Câmara (1996)", cat: "Municípios" },
            { src: primeiraMulherImg, alt: "Primeira mulher Prefeita de São João da Barra (2004)", cat: "Municípios" },
            { src: quatroMandatosImg, alt: "Quatro mandatos como Prefeita", cat: "Eventos" },
            { src: deputadaEstadualImg, alt: "Deputada Estadual pela Alerj (2023)", cat: "Alerj" },
            { src: frenteParlamentarImg, alt: "Frente Parlamentar em Defesa das Pessoas com TEA", cat: "Inclusão" },
            { src: alerjFala1Asset.url, alt: "Carla Machado em pronunciamento no plenário da Alerj", cat: "Alerj" },
            { src: alerjFala2Asset.url, alt: "Carla Machado discursando em solenidade", cat: "Eventos" },
            { src: alerjFala3Asset.url, alt: "Carla Machado em debate no plenário da Alerj", cat: "Alerj" },
            { src: alerjFala4Asset.url, alt: "Carla Machado em audiência pública", cat: "Alerj" },
            { src: alerjMocao1Asset.url, alt: "Entrega de Moção de Aplausos ao historiador Bruno de Azevedo Costa", cat: "Eventos" },
            { src: alerjMocao2Asset.url, alt: "Entrega de Moção de Aplausos ao Centro Cultural Narcisa Amália", cat: "Eventos" },
            { src: alerjMedalhaAsset.url, alt: "Medalha Tiradentes concedida a Narcisa Amália de Campos", cat: "Eventos" },
            { src: alerjColetivaAsset.url, alt: "Carla Machado em coletiva de imprensa", cat: "Alerj" },
            { src: reuniaoGabineteAsset.url, alt: "Carla Machado em reunião de trabalho no gabinete", cat: "Municípios" },
          ]}
        />
        <Depoimentos />
        <Feed />
        <Legado image={heroImg} />
        <CTAFinal />
      </main>
      <Footer />
      </div>
    </div>
  );
}


