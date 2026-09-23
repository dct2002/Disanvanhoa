import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-serif text-xs uppercase tracking-[0.4em] text-gold"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`mt-3 font-display text-3xl font-bold sm:text-5xl ${light ? "text-ink" : "text-ivory"}`}
      >
        {title}
      </motion.h2>
      <div className="divider-gold mx-auto mt-5 w-24" />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`mt-5 font-serif text-base italic leading-relaxed ${
            light ? "text-ink/70" : "text-ivory-dim"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
