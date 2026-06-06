"use client";

import { gsap } from "gsap";
import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
  useId,
} from "react";
import styles from "./SvgNode.module.scss";

export interface SvgNodeRef {
  updatePosition: (position: number) => void;
  setVisible: (visible: boolean) => void;
  setLabelVisible: (visible: boolean) => void;
}

export interface SvgNodeProps {
  path: string;
  label?: string;
  glowColor?: string;
  dotColor?: string;
}

const SvgNode = forwardRef<SvgNodeRef, SvgNodeProps>(({
  path,
  label,
  glowColor = "#41D1FF",
  dotColor = "#9fe6fd",
}, ref) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<SVGCircleElement | null>(null);
  const textRef = useRef<SVGTextElement | null>(null);
  const maskCircleRef = useRef<SVGCircleElement | null>(null);
  const radialGradientRef = useRef<SVGRadialGradientElement | null>(null);

  const [pathLength, setPathLength] = useState(0);
  const uniqueId = useId().replace(/:/g, "");
  const gradientWidth = 30;

  // Khởi tạo độ dài Path
  useLayoutEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [path]);

  useImperativeHandle(ref, () => ({
    updatePosition: (position: number) => {
      const pathEl = pathRef.current;
      if (!pathEl || pathLength === 0) return;
      const targetLen = (1 - position) * pathLength;
      try {
        const pt = pathEl.getPointAtLength(targetLen);
        if (dotRef.current) {
          dotRef.current.setAttribute("cx", String(pt.x));
          dotRef.current.setAttribute("cy", String(pt.y));
        }
        if (textRef.current) {
          textRef.current.setAttribute("x", String(pt.x));
          textRef.current.setAttribute("y", String(pt.y + 15));
        }
        if (maskCircleRef.current) {
          maskCircleRef.current.setAttribute("cx", String(pt.x));
          maskCircleRef.current.setAttribute("cy", String(pt.y));
        }
        if (radialGradientRef.current) {
          radialGradientRef.current.setAttribute("cx", String(pt.x));
          radialGradientRef.current.setAttribute("cy", String(pt.y));
        }
      } catch {
        // Ignore errors from unmounted paths or math errors
      }
    },
    setVisible: (visible: boolean) => {
      // Animate attributes directly on the DOM using GSAP to avoid React state/renders
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          attr: { r: visible ? 3 : 0 },
          duration: 0.6,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      }
      const targetRadius = visible ? gradientWidth : 0;
      if (maskCircleRef.current) {
        gsap.to(maskCircleRef.current, {
          attr: { r: targetRadius },
          duration: 0.5,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      }
      if (radialGradientRef.current) {
        gsap.to(radialGradientRef.current, {
          attr: { r: targetRadius },
          duration: 0.5,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      }
    },
    setLabelVisible: (visible: boolean) => {
      if (textRef.current) {
        if (visible) {
          textRef.current.classList.add(styles["label--visible"]);
        } else {
          textRef.current.classList.remove(styles["label--visible"]);
        }
      }
    },
  }));

  // Clean up any running tweens targeting this node's refs when it unmounts
  useEffect(() => {
    const dot = dotRef.current;
    const maskCircle = maskCircleRef.current;
    const radialGradient = radialGradientRef.current;
    return () => {
      if (dot) gsap.killTweensOf(dot);
      if (maskCircle) gsap.killTweensOf(maskCircle);
      if (radialGradient) gsap.killTweensOf(radialGradient);
    };
  }, []);

  return (
    <g>
      <path
        ref={pathRef}
        d={path}
        stroke={`url(#glow_gradient_${uniqueId})`}
        strokeWidth={1.2}
        mask={`url(#glow_mask_${uniqueId})`}
        className={styles.svgPath}
      />

      {dotColor && (
        <circle
          ref={dotRef}
          cx={0}
          cy={0}
          r={0}
          fill={dotColor}
          className={styles.circleDot}
          style={{ "--dot-color": dotColor } as React.CSSProperties}
        />
      )}

      {label && (
        <text
          ref={textRef}
          x={0}
          y={0}
          fill="#a3a3a3"
          className={styles.label}
          textAnchor="middle"
          alignmentBaseline="hanging"
        >
          {label}
        </text>
      )}

      <defs>
        <mask id={`glow_mask_${uniqueId}`}>
          <path d={path} fill="black" />
          <circle
            ref={maskCircleRef}
            cx={0}
            cy={0}
            r={0}
            fill="white"
          />
        </mask>
        <radialGradient
          id={`glow_gradient_${uniqueId}`}
          ref={radialGradientRef}
          cx={0}
          cy={0}
          r={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={glowColor} stopOpacity={1} />
          <stop offset="100%" stopColor={glowColor} stopOpacity={0} />
        </radialGradient>
      </defs>
    </g>
  );
});

SvgNode.displayName = "SvgNode";

export default SvgNode;
