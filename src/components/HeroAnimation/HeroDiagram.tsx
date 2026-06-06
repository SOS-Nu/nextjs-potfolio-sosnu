"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./HeroDiagram.module.scss";

import Image from "next/image";
import SvgBlueIndicator from "./svg-elements/SvgBlueIndicator";
import SvgInputs from "./svg-elements/SvgInputs";
import SvgOutputs from "./svg-elements/SvgOutputs";
import SvgPinkIndicator from "./svg-elements/SvgPinkIndicator";
import { SvgNodeRef } from "./common/SvgNode";

// Register Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- Types ---
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
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const inputNodeRefs = useRef<(SvgNodeRef | null)[]>([]);
  const outputNodeRefs = useRef<(SvgNodeRef | null)[]>([]);

  const isMounted = useRef(true);

  // States
  const [cycleData, setCycleData] = useState<{
    selectedIndexes: number[];
    set: typeof INPUT_FILE_SETS[number];
  } | null>(null);

  const [activeStates, setActiveStates] = useState<ActiveStates>({
    blue: false,
    pink: false,
    logo: false,
  });

  // Lifecycle tracking to prevent memory leaks and state updates on unmounted component
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Helper to trigger the next animation cycle in a single state update (preventing render cascading)
  const triggerNextCycle = () => {
    if (!isMounted.current) return;
    const set = INPUT_FILE_SETS[Math.floor(Math.random() * INPUT_FILE_SETS.length)];
    const selectedIndexes = new Set<number>();
    while (selectedIndexes.size < 3) {
      selectedIndexes.add(Math.floor(Math.random() * INPUT_PATHS.length));
    }
    setCycleData({
      selectedIndexes: Array.from(selectedIndexes),
      set,
    });
  };

  // Derive input config dynamically to avoid storing redundant synced state (and extra renders)
  const inputConfig = useMemo(() => {
    const defaultPaths = INPUT_PATHS.map((path) => ({
      path,
      label: "",
      dotColor: "#9fe6fd",
      glowColor: "#9fe6fd",
    }));

    if (!cycleData) return defaultPaths;
    const { selectedIndexes, set } = cycleData;

    selectedIndexes.forEach((lineIdx, fileIdx) => {
      const item = set[fileIdx];
      const activeColor = item.color || "#9fe6fd";
      defaultPaths[lineIdx] = {
        path: INPUT_PATHS[lineIdx],
        label: t(item.key, item.default),
        dotColor: activeColor,
        glowColor: activeColor,
      };
    });
    return defaultPaths;
  }, [cycleData, t]);

  // Derive output config dynamically
  const outputConfig = useMemo(() => {
    return [
      { label: t("hero.outputOffer", "Nhận được Offer") },
      { label: t("hero.outputCulture", "Phù hợp văn hóa") },
      { label: t("hero.outputSalary", "Lương hấp dẫn") },
    ];
  }, [t]);

  // 1. Lắng nghe Scroll để kích hoạt cycle đầu tiên
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "center 100%",
        once: true,
        onEnter: () => {
          triggerNextCycle();
        },
      });
    },
    { scope: containerRef }
  );

  // 4. Kích hoạt hiệu ứng GSAP cho vòng lặp mới khi config sẵn sàng
  useGSAP(
    () => {
      if (!cycleData) return;

      const isMobile = window.innerWidth < 768;
      const { selectedIndexes } = cycleData;

      if (isMounted.current) {
        setActiveStates({ blue: false, pink: false, logo: false });
      }

      inputNodeRefs.current.forEach((node) => node?.setVisible(false));
      inputNodeRefs.current.forEach((node) => node?.setLabelVisible(false));
      outputNodeRefs.current.forEach((node) => node?.setVisible(false));
      outputNodeRefs.current.forEach((node) => node?.setLabelVisible(false));

      const tl = gsap.timeline({
        onComplete: () => {
          triggerNextCycle();
        },
      });

      // Line Inputs Animations
      selectedIndexes.forEach((lineIdx, fileIdx) => {
        const nodeRef = inputNodeRefs.current[lineIdx];
        if (!nodeRef) return;

        const singleInputTl = gsap.timeline();
        singleInputTl.call(() => nodeRef.setVisible(true));

        const animObj = { position: 0 };
        if (isMobile) {
          singleInputTl
            .to(animObj, {
              position: 1,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => nodeRef.updatePosition(animObj.position),
            })
            .call(() => nodeRef.setVisible(false), undefined, 0.5);
        } else {
          singleInputTl
            .to(animObj, {
              position: Math.random() * 0.1 + 0.4,
              duration: 1,
              ease: "expo.out",
              onUpdate: () => nodeRef.updatePosition(animObj.position),
            })
            .call(() => nodeRef.setLabelVisible(true), undefined, 0.2)
            .to(
              animObj,
              {
                position: 1,
                duration: 1.2,
                ease: "power3.in",
                onUpdate: () => nodeRef.updatePosition(animObj.position),
              },
              1.2
            )
            .call(() => nodeRef.setLabelVisible(false), undefined, 1.6)
            .call(() => nodeRef.setVisible(false), undefined, 1.9);
        }

        tl.add(singleInputTl, fileIdx * (isMobile ? 0.4 : 0.2));
      });

      // Active state toggles
      tl.call(
        () => {
          if (isMounted.current) {
            setActiveStates((prev) => ({ ...prev, blue: true, logo: true }));
          }
        },
        undefined,
        isMobile ? ">-2" : ">-0.2"
      );

      tl.call(
        () => {
          if (isMounted.current) {
            setActiveStates((prev) => ({ ...prev, pink: true }));
          }
        },
        undefined,
        isMobile ? ">-1.7" : "<+0.3"
      );

      tl.addLabel("outputs", "<");

      // Line Outputs Animations
      outputNodeRefs.current.forEach((nodeRef, idx) => {
        if (!nodeRef) return;

        const singleOutputTl = gsap.timeline();
        const animObj = { position: 0 };

        if (isMobile) {
          singleOutputTl
            .to(
              animObj,
              {
                position: 0.7,
                duration: 2,
                ease: "power1.inOut",
                onUpdate: () => nodeRef.updatePosition(animObj.position),
              },
              0.3
            )
            .call(() => nodeRef.setVisible(true), undefined, 0.75)
            .call(() => nodeRef.setVisible(false), undefined, 1.2);
        } else {
          singleOutputTl
            .to(
              animObj,
              {
                position: (0.6 / 3) * (idx + 1) + 0.05,
                duration: 1.5,
                ease: "expo.out",
                onUpdate: () => nodeRef.updatePosition(animObj.position),
              },
              0
            )
            .call(() => nodeRef.setVisible(true), undefined, 0)
            .call(() => nodeRef.setLabelVisible(true), undefined, 0.4)
            .to(
              animObj,
              {
                position: 1,
                duration: 1.5,
                ease: "power3.in",
                onUpdate: () => nodeRef.updatePosition(animObj.position),
              },
              2
            )
            .call(() => nodeRef.setLabelVisible(false), undefined, 2.5)
            .call(() => nodeRef.setVisible(false), undefined, 3);
        }

        tl.add(singleOutputTl, "outputs+=" + (isMobile ? 0.3 : 0.1) * idx);
      });

      if (!isMobile) {
        tl.call(
          () => {
            if (isMounted.current) {
              setActiveStates((prev) => ({ ...prev, blue: false, pink: false }));
            }
          },
          undefined,
          ">-1"
        );
      }
    },
    { dependencies: [cycleData], scope: containerRef }
  );

  return (
    <>
      <div
        ref={containerRef}
        className={styles.hero__diagram}
        id="hero-diagram"
      >
        <SvgInputs inputLines={inputConfig} nodeRefs={inputNodeRefs} />
        <SvgOutputs outputLines={outputConfig} nodeRefs={outputNodeRefs} />
        <SvgBlueIndicator active={activeStates.blue} />
        <SvgPinkIndicator active={activeStates.pink} />

        <div
          className={`${styles["vite-chip"]} ${activeStates.logo ? styles.active : ""}`}
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
              width={134}
              height={134}
              className={styles["vite-chip__logo"]}
              priority
            />
          </div>
        </div>
      </div>
      <div
        className={`${styles.hero__background} ${activeStates.logo ? styles.active : ""}`}
      />
    </>
  );
};

export default HeroDiagram;
