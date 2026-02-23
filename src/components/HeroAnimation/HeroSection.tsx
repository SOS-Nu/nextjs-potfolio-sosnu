"use client";

import React from "react";
import HeroDiagram from "./HeroDiagram";
import styles from "./HeroSection.module.scss";

const HeroSection: React.FC<{ play?: boolean }> = ({ play = false }) => {
  return (
    <section className={styles.hero}>
      {/* Container này dùng để chứa Tagline/Text nếu có, giống bên Vue */}
      <div className="container">{/* Nội dung chữ của bạn sẽ nằm ở đây */}</div>

      {/* Diagram nằm ngoài container để tự do tràn viền */}
      <HeroDiagram />
    </section>
  );
};

export default HeroSection;
