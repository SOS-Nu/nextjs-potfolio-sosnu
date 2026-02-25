"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./HeroDiagram.module.scss";

import Image from "next/image";
import SvgBlueIndicator from "./svg-elements/SvgBlueIndicator";
import SvgInputs from "./svg-elements/SvgInputs";
import SvgOutputs from "./svg-elements/SvgOutputs";
import SvgPinkIndicator from "./svg-elements/SvgPinkIndicator";

// Register Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Types ---
export interface LineData {
  path: string;
  position: number;
  visible: boolean;
  labelVisible: boolean;
  label: string;
  currentKey?: string;
  currentDefault?: string;
  dotColor: string;
  glowColor: string;
}

interface ActiveStates {
  blue: boolean;
  pink: boolean;
  logo: boolean;
}

// --- Constants ---
const INPUT_PATHS = [
  "M843.505 284.659L752.638 284.659C718.596 284.659 684.866 280.049 653.251 271.077L598.822 255.629L0.675021 1.00011",
  "M843.505 298.181L724.342 297.36C708.881 297.36 693.45 296.409 678.22 294.518L598.822 284.659C592.82 284.659 200.538 190.002 0.675028 164.892",
  "M843.505 311.703L701.108 310.061L598.822 305.136L0.675049 256.071",
  "M843.505 325.224L598.822 326.002L0.675049 321.858",
  "M843.505 338.746L701.108 340.388L598.822 345.442L0.675038 387.646",
  "M843.505 352.268L724.342 353.088C708.881 353.088 693.45 354.039 678.22 355.93L598.822 365.789L0.675067 478.825",
  "M843.505 365.789L752.638 365.789C718.596 365.789 684.866 370.399 653.251 379.372L598.822 394.82L0.675049 642.717",
];

const INPUT_FILE_SETS = [
  [
    { key: "hero.cv", default: "SOLID & Design Patterns", color: "#61DBFB" },
    { key: "hero.jobDesc", default: "Clean Architecture" },
    { key: "hero.salary", default: "Unit Test", color: "#FF66AA" },
  ],
  [
    { key: "hero.experience", default: "Kinh nghiệm", color: "#FFA500" },
    { key: "hero.skills", default: "Kỹ năng", color: "#45B880" },
    { key: "hero.benefits", default: "Phúc lợi", color: "#E0E0E0" },
  ],
  [
    { key: "hero.cv", default: "Bằng cấp" },
    { key: "hero.jobDesc", default: "Thư giới thiệu", color: "#FFD700" },
    { key: "hero.salary", default: "Review Công ty", color: "#00CED1" },
  ],
];

const HeroDiagram: React.FC = () => {
  const { t, i18n } = useTranslation();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tick dùng để trigger re-render khi Ref data thay đổi (GSAP update)
  const [, setTick] = useState(0);
  const sync = useCallback(() => setTick((v) => v + 1), []);

  const animData = useRef({
    inputLines: INPUT_PATHS.map((path) => ({
      position: 0,
      visible: false,
      labelVisible: false,
      label: "",
      currentKey: "",
      currentDefault: "",
      dotColor: "#9fe6fd",
      path,
    })) as LineData[],
    outputLines: Array(3)
      .fill(null)
      .map(() => ({
        position: 0,
        visible: false,
        labelVisible: false,
        label: "",
        path: "",
      })) as LineData[],
    activeStates: { blue: false, pink: false, logo: false } as ActiveStates,
  }).current;

  // Sync labels - Xử lý đa ngôn ngữ chuẩn xác
  useEffect(() => {
    animData.inputLines.forEach((line) => {
      // Kiểm tra chắc chắn có currentKey mới thực hiện dịch
      if (line.currentKey) {
        line.label = t(line.currentKey, line.currentDefault || "");
      }
    });

    // Đối với outputLines, nếu bạn fix cứng key thì có thể dùng "" làm fallback
    animData.outputLines[0].label = t("hero.outputOffer", "Nhận được Offer");
    animData.outputLines[1].label = t("hero.outputSalary", "Lương hấp dẫn");
    animData.outputLines[2].label = t("hero.outputCulture", "Phù hợp văn hóa");

    sync();
  }, [t, i18n.language, sync, animData]);

  // Animation Logics
  const animateSingleInput = useCallback(
    (line: LineData, isMobile: boolean) => {
      const tl = gsap.timeline();
      tl.set(line, { position: 0, visible: true, labelVisible: false });
      if (isMobile) {
        tl.to(line, { position: 1, duration: 1.8, ease: "power2.out" }).set(
          line,
          { visible: false },
          0.5,
        );
      } else {
        tl.to(line, {
          position: Math.random() * 0.1 + 0.4,
          duration: 1,
          ease: "expo.out",
        })
          .set(line, { labelVisible: true }, 0.2)
          .to(line, { position: 1, duration: 1.2, ease: "power3.in" }, 1.2)
          .set(line, { labelVisible: false }, 1.6)
          .set(line, { visible: false }, 1.9);
      }
      return tl;
    },
    [],
  );

  const animateSingleOutput = useCallback(
    (line: LineData, index: number, isMobile: boolean) => {
      const tl = gsap.timeline();
      tl.set(line, { position: 0, visible: false, labelVisible: false });
      if (isMobile) {
        tl.to(line, { position: 0.7, duration: 2, ease: "power1.inOut" }, 0.3)
          .set(line, { visible: true }, 0.75)
          .set(line, { visible: false }, 1.2);
      } else {
        tl.to(
          line,
          {
            position: (0.6 / 3) * (index + 1) + 0.05,
            duration: 1.5,
            ease: "expo.out",
          },
          0,
        )
          .set(line, { visible: true }, 0)
          .set(line, { labelVisible: true }, 0.4)
          .to(line, { position: 1, duration: 1.5, ease: "power3.in" }, 2)
          .set(line, { labelVisible: false }, 2.5)
          .set(line, { visible: false }, 3);
      }
      return tl;
    },
    [],
  );

  const animateDiagram = useCallback(() => {
    const isMobile = window.innerWidth < 768;
    const { inputLines, outputLines, activeStates } = animData;

    const tl = gsap.timeline({
      onComplete: () => animateDiagram(),
      onUpdate: sync,
    });
    timelineRef.current = tl;

    const set =
      INPUT_FILE_SETS[Math.floor(Math.random() * INPUT_FILE_SETS.length)];
    const selectedIndexes = new Set<number>();
    while (selectedIndexes.size < 3)
      selectedIndexes.add(Math.floor(Math.random() * inputLines.length));

    Array.from(selectedIndexes).forEach((lineIdx, fileIdx) => {
      const item = set[fileIdx];
      const line = inputLines[lineIdx];
      line.currentKey = item.key;
      line.currentDefault = item.default;
      line.label = t(item.key, item.default);
      const activeColor = item.color || "#9fe6fd";
      line.dotColor = activeColor;
      line.glowColor = activeColor; // Thêm dòng này

      tl.add(
        animateSingleInput(line, isMobile),
        fileIdx * (isMobile ? 0.4 : 0.2),
      );
    });

    tl.set(activeStates, { blue: true }, isMobile ? ">-2" : ">-0.2")
      .set(activeStates, { logo: true }, "<-0.3")
      .set(activeStates, { pink: true }, "<+0.3");

    tl.addLabel("outputs", "<");
    outputLines.forEach((line, idx) => {
      tl.add(
        animateSingleOutput(line, idx, isMobile),
        "outputs+=" + (isMobile ? 0.3 : 0.1) * idx,
      );
    });

    if (!isMobile) {
      tl.set(activeStates, { blue: false, pink: false }, ">-1");
    }
  }, [animData, sync, t, animateSingleInput, animateSingleOutput]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "center 100%",
        once: true,
        onEnter: () => animateDiagram(),
      });
    });

    return () => {
      ctx.revert();
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, [animateDiagram]);

  return (
    <>
      <div
        ref={containerRef}
        className={styles.hero__diagram}
        id="hero-diagram"
      >
        <SvgInputs inputLines={animData.inputLines} />
        <SvgOutputs outputLines={animData.outputLines} />
        <SvgBlueIndicator active={animData.activeStates.blue} />
        <SvgPinkIndicator active={animData.activeStates.pink} />

        <div
          className={`${styles["vite-chip"]} ${animData.activeStates.logo ? styles.active : ""}`}
        >
          <div className={styles["vite-chip__background"]}>
            <div className={styles["vite-chip__border"]} />
            <div className={styles["vite-chip__edge"]} />
          </div>
          <div className={styles["vite-chip__filter"]} />
          <div className={styles["vite-chip__logo-container"]}>
            <Image
              src="/logojobhunter.png"
              alt="Logo JobHunter"
              // Cung cấp kích thước gốc để Next.js không báo lỗi và giữ tỉ lệ
              width={134}
              height={134}
              // Giữ nguyên class cũ để không hỏng cấu trúc SCSS
              className={styles["vite-chip__logo"]}
              priority
            />
          </div>
        </div>
      </div>
      <div
        className={`${styles.hero__background} ${animData.activeStates.logo ? styles.active : ""}`}
      />
    </>
  );
};

export default HeroDiagram;
