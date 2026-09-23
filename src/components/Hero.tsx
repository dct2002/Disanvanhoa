import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { getLenis } from "../hooks/useLenis";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import HeritageImage from "./HeritageImage";

const HeroScene = lazy(() => import("./HeroScene"));

const HERO_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/b/b9/%C4%90%E1%BA%A1i_n%E1%BB%99i.jpg";

const titleLine1 = "DI SẢN".split("");
const titleLine2 = "VĂN HÓA VIỆT NAM".split("");

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { duration: 1.3 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const showScene = !isMobile && !reducedMotion;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-ink"
    >
      <div className="absolute inset-0">
        <HeritageImage
          src={HERO_IMAGE}
          alt="Đại Nội Huế - biểu tượng di sản văn hóa Việt Nam"
          eager
          className={`h-full w-full object-cover object-center opacity-60 ${
            reducedMotion ? "" : "animate-[heroZoom_24s_ease-in-out_infinite_alternate]"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        <div className="ornament-pattern absolute inset-0" />
      </div>

      {showScene && (
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-4 font-serif text-xs uppercase tracking-[0.5em] text-gold sm:text-sm"
        >
          Bảo tàng số 3D
        </motion.p>

        <h1 className="font-display font-black leading-none text-ivory">
          <span className="mb-2 block text-[3.2rem] tracking-wide sm:text-7xl md:text-8xl">
            {titleLine1.map((c, i) => (
              <motion.span
                key={i}
                className="text-glow-gold inline-block text-gradient-gold"
                initial={{ opacity: 0, y: 40, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.7, ease: "easeOut" }}
              >
                {c === " " ? " " : c}
              </motion.span>
            ))}
          </span>
          <span className="block text-2xl tracking-[0.15em] sm:text-4xl md:text-5xl">
            {titleLine2.map((c, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.02, duration: 0.6, ease: "easeOut" }}
              >
                {c === " " ? " " : c}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-6 max-w-xl font-serif text-base italic text-ivory-dim sm:text-lg"
        >
          Khám phá những giá trị được lưu truyền qua hàng nghìn năm lịch sử
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          onClick={() => scrollToId("map")}
          data-cursor-hover
          className="btn-glow group relative mt-10 overflow-hidden rounded-full border border-gold/60 px-9 py-3.5 font-serif text-sm uppercase tracking-[0.25em] text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:border-gold"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-ink">
            Bắt đầu khám phá
          </span>
          <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-gradient-to-t from-gold to-gold-light transition-transform duration-400 ease-out group-hover:scale-y-100" />
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory-dim"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Cuộn xuống</span>
        <div className="flex h-9 w-6 justify-center rounded-full border border-gold/40 p-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-gold"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
