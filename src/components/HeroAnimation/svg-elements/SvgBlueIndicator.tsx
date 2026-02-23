"use client";

import React, { useId } from "react";
import styles from "./SvgBlueIndicator.module.scss";

interface Props {
  active?: boolean;
}

const SvgBlueIndicator: React.FC<Props> = ({ active = false }) => {
  // Tạo ID duy nhất cho các Filter để không bị trùng lặp
  const id = useId().replace(/:/g, "");

  return (
    <>
      <svg
        width="142"
        height="82"
        viewBox="0 0 142 82"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${styles["blue-indicator"]} ${active ? styles.active : ""}`}
      >
        {/* Khối Path chính */}
        <g opacity="0.2" filter={`url(#filter0_${id})`}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M136.073 3V45.1271C136.073 51.5014 130.905 56.6688 124.531 56.6688H40.2769V54.3604H124.531C129.63 54.3604 133.764 50.2265 133.764 45.1271V3H136.073Z"
            fill="#0D0D0D"
          />
          <path
            d="M136.361 3V2.71146H136.073H133.764H133.476V3V45.1271C133.476 50.0672 129.471 54.0719 124.531 54.0719H40.2769H39.9883V54.3604V56.6688V56.9573H40.2769H124.531C131.065 56.9573 136.361 51.6607 136.361 45.1271V3Z"
            stroke="#404040"
            strokeWidth="0.577083"
          />
        </g>

        {/* Nút vuông bo góc */}
        <g filter={`url(#filter1_${id})`}>
          <rect
            x="12"
            y="69.9419"
            width="30.0083"
            height="30.0083"
            rx="5.01812"
            transform="rotate(-90 12 69.9419)"
            fill="#1F1F1F"
          />
        </g>
        <rect
          x="12"
          y="69.9419"
          width="30.0083"
          height="30.0083"
          rx="5.01812"
          transform="rotate(-90 12 69.9419)"
          stroke="#2C2C2C"
          strokeOpacity="0.4"
          strokeWidth="3.75141"
        />

        {/* Các chấm xanh (Chỉ hiện khi active - Giả lập v-show) */}
        <g className={!active ? styles.vShowHidden : ""}>
          <path
            d="M18.4048 57.9946C18.4048 57.3366 18.9382 56.8032 19.5961 56.8032H24.3614C25.0194 56.8032 25.5528 57.3366 25.5528 57.9946V62.7599C25.5528 63.4179 25.0194 63.9512 24.3614 63.9512H19.5961C18.9382 63.9512 18.4048 63.4179 18.4048 62.7599V57.9946Z"
            fill="#41D1FF"
          />
          <path
            d="M27.9354 57.9946C27.9354 57.3366 28.4688 56.8032 29.1268 56.8032H33.8921C34.5501 56.8032 35.0834 57.3366 35.0834 57.9946V62.7599C35.0834 63.4179 34.5501 63.9512 33.8921 63.9512H29.1268C28.4688 63.9512 27.9354 63.4179 27.9354 62.7599V57.9946Z"
            fill="#41D1FF"
          />
          <path
            d="M27.9354 47.6694C27.9354 47.0114 28.4688 46.478 29.1268 46.478H33.8921C34.5501 46.478 35.0834 47.0114 35.0834 47.6694V52.4347C35.0834 53.0926 34.5501 53.626 33.8921 53.626H29.1268C28.4688 53.626 27.9354 53.0926 27.9354 52.4347V47.6694Z"
            fill="#41D1FF"
          />
          <path
            d="M18.4048 47.6694C18.4048 47.0114 18.9382 46.478 19.5961 46.478H24.3614C25.0194 46.478 25.5528 47.0114 25.5528 47.6694V52.4347C25.5528 53.0926 25.0194 53.626 24.3614 53.626H19.5961C18.9382 53.626 18.4048 53.0926 18.4048 52.4347V47.6694Z"
            fill="#41D1FF"
          />

          {/* Group hiệu ứng Blur khi active */}
          <g filter={`url(#filter2_${id})`}>
            <path
              d="M18.4048 57.9946C18.4048 57.3366 18.9382 56.8032 19.5961 56.8032H24.3614V62.7599H19.5961V57.9946Z"
              fill="#41D1FF"
            />
            <path
              d="M27.9354 57.9946C27.9354 57.3366 28.4688 56.8032 29.1268 56.8032H33.8921V62.7599H29.1268V57.9946Z"
              fill="#41D1FF"
            />
            <path
              d="M27.9354 47.6694C27.9354 47.0114 28.4688 46.478 29.1268 46.478H33.8921V52.4347H29.1268V47.6694Z"
              fill="#41D1FF"
            />
          </g>
        </g>

        {/* Các lớp trắng mờ (Overlay) - Luôn hiển thị */}
        <path
          d="M18.4048 57.9946C18.4048 57.3366 18.9382 56.8032 19.5961 56.8032H24.3614V62.7599H19.5961V57.9946Z"
          fill="white"
          fillOpacity={0.5}
        />
        <path
          d="M27.9354 57.9946C27.9354 57.3366 28.4688 56.8032 29.1268 56.8032H33.8921V62.7599H29.1268V57.9946Z"
          fill="white"
          fillOpacity={0.5}
        />
        <path
          d="M27.9354 47.6694C27.9354 47.0114 28.4688 46.478 29.1268 46.478H33.8921V52.4347H29.1268V47.6694Z"
          fill="white"
          fillOpacity={0.5}
        />
        <path
          d="M18.4048 47.6694C18.4048 47.0114 18.9382 46.478 19.5961 46.478H24.3614V52.4347H19.5961V47.6694Z"
          fill="white"
          fillOpacity={0.5}
        />

        {/* Định nghĩa Filters */}
        <defs>
          <filter
            id={`filter0_${id}`}
            x="35.0831"
            y="0.114583"
            width="106.183"
            height="64.0563"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2.30833" />
            <feGaussianBlur stdDeviation="2.30833" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.65 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1_2"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1_2"
              result="shape"
            />
          </filter>
          <filter
            id={`filter1_${id}`}
            x="10.1243"
            y="38.0579"
            width="33.7597"
            height="33.7597"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2.30833" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.85 0"
            />
            <feBlend
              mode="normal"
              in2="shape"
              result="effect1_innerShadow_1_2"
            />
          </filter>
          <filter
            id={`filter2_${id}`}
            x="0.802473"
            y="28.8757"
            width="51.8833"
            height="52.6778"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="8.80116"
              result="effect1_foregroundBlur_1_2"
            />
          </filter>
        </defs>
      </svg>
      {/* Vùng tỏa sáng bên ngoài */}
      <div
        className={`${styles["blue-glow"]} ${active ? styles.active : ""}`}
      />
    </>
  );
};

export default SvgBlueIndicator;
