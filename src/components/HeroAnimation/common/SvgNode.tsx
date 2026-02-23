"use client";

import { gsap } from "gsap";
import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./SvgNode.module.scss";

export interface SvgNodeProps {
  path: string;
  position?: number;
  visible?: boolean;
  labelVisible?: boolean;
  label?: string;
  glowColor?: string;
  dotColor?: string;
}

const SvgNode: React.FC<SvgNodeProps> = ({
  path,
  position = 0,
  visible = false,
  labelVisible = false,
  label,
  glowColor = "#41D1FF",
  dotColor = "#9fe6fd",
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState(0);
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });

  const gradientWidth = 30;
  const [gradScale, setGradScale] = useState(visible ? 1 : 0);
  const [dotR, setDotR] = useState(visible ? 3 : 0);

  const uniqueId = useId().replace(/:/g, "");

  // Khởi tạo độ dài Path
  useLayoutEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [path]);

  // Tính toán vị trí dot (Pure logic)
  useEffect(() => {
    if (!pathRef.current || pathLength === 0) return;
    const targetLen = (1 - position) * pathLength;
    try {
      const pt = pathRef.current.getPointAtLength(targetLen);
      setDotPos({ x: pt.x, y: pt.y });
    } catch {
      // Bỏ 'e' để tránh warning unused var
    }
  }, [position, pathLength]);

  // GSAP Animation logic
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sử dụng object trung gian để tránh phụ thuộc trực tiếp vào state trong closure
      const state = { grad: gradScale, r: dotR };

      gsap.to(state, {
        grad: visible ? 1 : 0,
        duration: 0.5,
        ease: "power2.inOut",
        onUpdate: () => setGradScale(state.grad),
      });

      gsap.to(state, {
        r: visible ? 3 : 0,
        duration: 0.6,
        ease: "power2.inOut",
        onUpdate: () => setDotR(state.r),
      });
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]); // Chỉ trigger khi visible thay đổi

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
          cx={dotPos.x}
          cy={dotPos.y}
          r={dotR}
          fill={dotColor}
          className={styles.circleDot}
          style={{ "--dot-color": dotColor } as React.CSSProperties}
        />
      )}

      {label && (
        <text
          x={dotPos.x}
          y={dotPos.y + 15}
          fill="#a3a3a3"
          className={`${styles.label} ${
            labelVisible ? styles["label--visible"] : ""
          }`}
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
            cx={dotPos.x}
            cy={dotPos.y}
            r={gradientWidth * gradScale}
            fill="white"
          />
        </mask>
        <radialGradient
          id={`glow_gradient_${uniqueId}`}
          cx={dotPos.x}
          cy={dotPos.y}
          r={gradientWidth * gradScale}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={glowColor} stopOpacity={1} />
          <stop offset="100%" stopColor={glowColor} stopOpacity={0} />
        </radialGradient>
      </defs>
    </g>
  );
};

export default SvgNode;
