// GlowCard.tsx

import { useAppSelector } from "@/redux/store";
import { useEffect, useRef } from "react";
import "./glow-card.scss";

interface IProps {
  children: React.ReactNode;
  identifier: string;
  proximity?: number;
}

const GlowCard = ({ children, identifier, proximity }: IProps) => {
  const isTablet = useAppSelector((state) => state.app.isTablet);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isTablet) return; // Không áp dụng hiệu ứng trên tablet
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const CONFIG = {
      proximity: proximity ?? 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
      speed: 1,
    };

    const RESTYLE = () => {
      container.style.setProperty("--gap", "" + CONFIG.gap);
      container.style.setProperty("--blur", "" + CONFIG.blur);
      container.style.setProperty("--spread", "" + CONFIG.spread);
      container.style.setProperty(
        "--direction",
        CONFIG.vertical ? "column" : "row",
      );
    };

    RESTYLE();

    // Attach listeners directly to the container to avoid global window/body listeners, preventing layout thrashing and stale bounds.
    const handlePointerMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX;
      const y = event.clientY;

      // Tính toán góc dựa trên vị trí chuột
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.5;

      let ANGLE = (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI;
      ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;

      card.style.setProperty("--start", "" + (ANGLE + 90));
      card.style.setProperty("--active", "1");
    };

    const handlePointerLeave = () => {
      card.style.setProperty("--active", "" + CONFIG.opacity);
    };

    container.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [proximity, isTablet]);

  return (
    <div ref={containerRef} className={`glow-container-${identifier} glow-container`}>
      <article ref={cardRef} className={`glow-card glow-card-${identifier}`}>
        <div className="glows"></div>
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
