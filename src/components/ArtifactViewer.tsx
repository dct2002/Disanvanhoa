import { Suspense, lazy, useState } from "react";
import { motion } from "framer-motion";
import { trongDongDongSon } from "../data/heritage";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import HeritageImage from "./HeritageImage";
import SectionHeading from "./SectionHeading";

const ArtifactScene = lazy(() => import("./ArtifactScene"));

const INFO_ITEMS = [
  { label: "Chất liệu", value: trongDongDongSon.material },
  { label: "Niên đại", value: "Khoảng thế kỷ 7 TCN – thế kỷ 2 SCN" },
  { label: "Nguồn gốc", value: trongDongDongSon.origin },
  { label: "Họa tiết", value: trongDongDongSon.pattern },
  { label: "Ý nghĩa", value: trongDongDongSon.significance },
];

export default function ArtifactViewer() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const [autoRotate, setAutoRotate] = useState(true);
  const show3D = !reducedMotion && !isMobile;

  return (
    <section id="artifact" className="relative overflow-hidden bg-ink py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08),transparent_65%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Bảo vật quốc gia"
          title="HIỆN VẬT"
          subtitle="Chạm, xoay và chiêm ngưỡng Trống đồng Đông Sơn — đỉnh cao kỹ nghệ đúc đồng của người Việt cổ."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="order-2 space-y-4 lg:order-1">
            {INFO_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="glass-panel rounded-xl border-l-2 border-gold/60 p-4"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold">{item.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ivory-dim">{item.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-gold/20 bg-gradient-to-b from-charcoal to-ink shadow-[inset_0_0_120px_rgba(0,0,0,0.6)]">
              {show3D ? (
                <Suspense
                  fallback={
                    <div className="flex h-full w-full items-center justify-center text-ivory-dim">
                      Đang tải mô hình 3D…
                    </div>
                  }
                >
                  <ArtifactScene autoRotate={autoRotate} />
                </Suspense>
              ) : (
                <HeritageImage
                  src={trongDongDongSon.image}
                  alt={trongDongDongSon.name}
                  className="h-full w-full object-contain p-10"
                />
              )}

              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_20px_rgba(0,0,0,0.5)]" />
            </div>

            {show3D && (
              <div className="mt-5 flex items-center justify-center gap-4 text-xs text-ivory-dim">
                <button
                  data-cursor-hover
                  onClick={() => setAutoRotate((v) => !v)}
                  className="rounded-full border border-gold/40 px-4 py-2 uppercase tracking-wider text-gold transition-colors hover:bg-gold/10"
                >
                  {autoRotate ? "Tạm dừng xoay" : "Tự động xoay"}
                </button>
                <span>Kéo để xoay · Cuộn để phóng to</span>
              </div>
            )}
            {isMobile && (
              <p className="mt-2 text-center text-[0.65rem] text-ivory-dim/70">
                * Trên di động hiển thị ảnh hiện vật thay cho mô hình 3D để tiết kiệm pin.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
