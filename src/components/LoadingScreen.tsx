import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LoadingScreenProps {
  onDone: () => void;
}

export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 2200;
    let frame: number;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 350);
      }
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="ornament-pattern absolute inset-0" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="relative h-20 w-20">
              <motion.div
                className="absolute inset-0 rounded-full border border-gold/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-3 rounded-full border border-gold/70"
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-7 rounded-full bg-gold" />
            </div>
            <h1 className="font-display text-2xl tracking-[0.3em] text-ivory sm:text-3xl">
              DI SẢN VIỆT NAM
            </h1>
            <p className="font-serif text-sm italic tracking-wide text-ivory-dim">
              Đang mở kho lưu trữ…
            </p>
            <div className="h-px w-56 overflow-hidden rounded-full bg-white/10 sm:w-72">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-serif text-xs tabular-nums text-gold/80">{progress}%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
