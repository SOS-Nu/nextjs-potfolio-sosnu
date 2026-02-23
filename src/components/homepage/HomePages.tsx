"use client";
import Divider from "@/components/sections/divider";
import Experience from "@/components/sections/experience";
import Introduction from "@/components/sections/introduction";
import Skill from "@/components/sections/skill";
import { useAppSelector } from "@/redux/store";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { MdFileDownload } from "react-icons/md";
import HeroLeft from "../sections/hero/hero.left";
import HeroRight from "../sections/hero/hero.right";
import ResizeButton from "../sections/resize.button";
const HeroComponent = dynamic(
  () => import("@/components/HeroAnimation/HeroSection"),
  { ssr: false },
);
const HomePage = () => {
  const { t } = useTranslation();

  const expRef = useRef<HTMLElement>(null);
  const theme = useAppSelector((state) => state.app.layoutConfig.theme);
  const heroRef = useRef<HTMLElement>(null);

  const scrollToExperienceSection = () => {
    expRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ width: "100%", overflowX: "hidden", position: "relative" }}>
      <div className="homepage-screen">
        {/* <div
          style={{
            backgroundImage: `url("assets/top-bg.svg")`,
            width: "100%",
            height: 500,
            position: "absolute",
            top: 0,
            backgroundRepeat: "repeat",
            zIndex: 0,
          }}
        ></div> */}
        <section className="mt-md-7 mt-6">
          <Container style={{ position: "relative" }}>
            <Row>
              <Col className="d-none d-md-block" md={6}>
                <HeroLeft
                  scrollToExperienceSection={scrollToExperienceSection}
                />
              </Col>
              <Col md={6}>
                <HeroRight />
              </Col>
              <Col
                xs={12}
                className="d-md-none d-flex mt-4 justify-content-center"
              >
                <ResizeButton
                  btnText={t("heroSection.cv")}
                  btnIcons={<MdFileDownload />}
                />
              </Col>
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Introduction />
          </Container>
        </section>
        {theme === "dark" && (
          <section
            ref={heroRef}
            style={{ position: "relative", minHeight: "300px" }}
          >
            {/* Luôn render để hiện sẵn giao diện tĩnh */}
            <HeroComponent />
          </section>
        )}

        <section ref={expRef}>
          <Container>
            <Experience />
          </Container>
        </section>

        <Divider />
        <section>
          <Container>
            <Skill />
          </Container>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
