"use client";

import { useEffect, useRef } from "react";

interface IProps {
  animationPath: object;
  width?: string;
}

const AnimationLottie = ({ animationPath, width = "95%" }: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let anim: { destroy: () => void } | null = null;
    let isMounted = true;

    // Dynamically load lottie-web on the client side to keep bundle sizes small and ensure SSR safety
    import("lottie-web").then((lottieModule) => {
      const lottie = lottieModule.default || lottieModule;
      if (!isMounted || !containerRef.current) return;

      // Deep clone the animation path data to prevent lottie-web's internal mutations from corrupting state
      const animationData = JSON.parse(JSON.stringify(animationPath));

      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });
    });

    return () => {
      isMounted = false;
      if (anim) {
        anim.destroy();
      }
    };
  }, [animationPath]);

  return (
    <div
      ref={containerRef}
      style={{
        width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

export default AnimationLottie;

