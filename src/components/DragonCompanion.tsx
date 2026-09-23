import { Suspense, lazy, useEffect, useRef } from "react";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import type { MouseNDC } from "./DragonScene";

const DragonScene = lazy(() => import("./DragonScene"));

export default function DragonCompanion() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const mouseRef = useRef<MouseNDC>({ x: 0, y: 0.25 });

  useEffect(() => {
    if (isMobile || reducedMotion) return;

    function handleMove(e: PointerEvent) {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [isMobile, reducedMotion]);

  if (isMobile || reducedMotion) return null;

  return (
    <div className="dragon-layer pointer-events-none fixed inset-0 z-30" aria-hidden="true">
      <Suspense fallback={null}>
        <DragonScene mouse={mouseRef} />
      </Suspense>
    </div>
  );
}
