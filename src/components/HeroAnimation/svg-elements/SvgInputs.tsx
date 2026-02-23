"use client";

import React from "react";
import SvgNode from "../common/SvgNode";
import styles from "./SvgInputs.module.scss";

interface InputLine {
  path: string;
  position?: number;
  visible?: boolean;
  label?: string;
  labelVisible?: boolean;
  dotColor?: string;
  glowColor?: string;
}

interface SvgInputsProps {
  inputLines: InputLine[];
}

const SvgInputs: React.FC<SvgInputsProps> = ({ inputLines }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="844"
      height="644"
      viewBox="0 0 844 644"
      fill="none"
      className={styles.inputLines} // Sử dụng class từ SCSS Module
    >
      {/* Lặp qua danh sách các đường line đầu vào */}
      {inputLines.map((line, index) => (
        <g key={line.path || index}>
          {/* Đường path mờ chạy phía dưới */}
          <path
            d={line.path}
            stroke="url(#base_gradient)"
            strokeWidth={1.2}
            style={{ opacity: 0.8 }}
            fill="none"
          />

          {/* Component SvgNode xử lý dot và glow animation */}
          <SvgNode
            path={line.path}
            position={line.position}
            visible={line.visible}
            labelVisible={line.labelVisible}
            label={line.label}
            dotColor={line.dotColor}
            glowColor={line.glowColor}
          />
        </g>
      ))}

      {/* Định nghĩa gradient dùng chung cho tất cả các line */}
      <defs>
        <linearGradient
          id="base_gradient"
          x1="88.1032"
          y1="324.167"
          x2="843.505"
          y2="324.167"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#c6caff" stopOpacity={0} />
          <stop offset="0.2" stopColor="#c6caff" stopOpacity={0.1} />
          <stop offset="0.4" stopColor="white" stopOpacity={0.4} />
          <stop offset="0.6" stopColor="#c6caff" stopOpacity={0.2} />
          <stop offset="0.8" stopColor="#c6caff" stopOpacity={0.2} />
          <stop offset="0.9" stopColor="#c6caff" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SvgInputs;
