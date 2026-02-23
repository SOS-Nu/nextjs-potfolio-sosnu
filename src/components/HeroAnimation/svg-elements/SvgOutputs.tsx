"use client";

import React from "react";
import SvgNode from "../common/SvgNode";
import styles from "./SvgOutputs.module.scss"; // Hoặc .css tùy file bạn đặt

interface OutputLine {
  position?: number;
  visible?: boolean;
  label?: string;
  labelVisible?: boolean;
}

interface SvgOutputsProps {
  outputLines: OutputLine[];
}

const SvgOutputs: React.FC<SvgOutputsProps> = ({ outputLines }) => {
  // Path cố định từ bản Vue gốc
  const constantPath = "M843.463 1.3315L245.316 5.47507L0.633077 4.69725";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="844"
      height="80"
      viewBox="0 0 844 40"
      fill="none"
      // Cách gọi class có dấu gạch ngang từ file module
      className={styles["output-line"]}
      style={{ opacity: 0.8 }}
    >
      {/* Đường dẫn nền */}
      <path d={constantPath} stroke="url(#output_gradient)" strokeWidth={1.2} />

      {/* Lặp qua các dòng output giống v-for */}
      {outputLines.map((line, index) => (
        <g key={index}>
          <SvgNode
            path={constantPath}
            position={line.position ?? 0}
            visible={line.visible}
            labelVisible={line.labelVisible}
            label={line.label}
            dotColor="#d499ff"
            glowColor="#BD34FE"
          />
        </g>
      ))}

      {/* Định nghĩa Gradient */}
      <defs>
        <linearGradient id="output_gradient" gradientUnits="userSpaceOnUse">
          <stop offset="0.1" stopColor="#E0C8FF" stopOpacity={0} />
          <stop offset="0.4" stopColor="#E0C8FF" stopOpacity={0.4} />
          <stop offset="1" stopColor="#E0C8FF" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SvgOutputs;
