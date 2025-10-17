"use client";
import { Col, Container, Row } from "react-bootstrap";
import AnimationLottie from "@/components/share/animation-lottie";
import { DEVELOPMENT_LOTTIE } from "@/assets/lottie/string/development";
import codingJSON from "@/assets/lottie/coding.json";
import { CONTACT_LOTTIE } from "@/assets/lottie/string/contact";

import { FaGraduationCap } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import GlowCard from "@/components/share/glow-card";
import Divider from "../divider";
import SocialMedia from "../social.media";
import { APP_DATA } from "@/helpers/data";
import "./about.scss";

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="about-screen">
        <div className="hero-background"></div>{" "}
        <section className="mt-md-5 mt-5 pt-md-5 pt-4">
          <Container>
            <Row>
              <Col md={6} xs={12}>
                <h3 className="text-center mb-md-5 mb-2">
                  {t("aboutPage.title1")}{" "}
                  <span className="brand-red">{t("aboutPage.title2")}</span>{" "}
                </h3>
                <div>
                  <div>
                    <p>{t("aboutPage.greeting")}</p>

                    <p>{t("aboutPage.job")}</p>

                    <p>{t("aboutPage.degreeInfo")}</p>
                  </div>
                </div>
                <div>
                  <p>{t("aboutPage.hobbiesTitle")}</p>
                  <ul>
                    <li>{t("aboutPage.hobby1")}</li>
                    <li>{t("aboutPage.hobby2")}</li>
                    <li>{t("aboutPage.hobby3")}</li>
                  </ul>
                </div>
                <div>
                  <p className="text-center brand-red">
                    {t("aboutPage.quote")}
                  </p>
                  <p className="text-center brand-red">
                    {t("aboutPage.quoteAuthor")}
                  </p>
                </div>
              </Col>
              <Col
                md={6}
                xs={12}
                className="d-flex align-items-center justify-content-center"
              >
                <AnimationLottie width="80%" animationPath={codingJSON} />
              </Col>
            </Row>
            <Row>
              <Col
                md={6}
                xs={12}
                className="d-none d-md-flex align-items-center justify-content-center mt-md-5 mt-3"
              >
                <AnimationLottie
                  width="50%"
                  //animation with rp => convert sang text
                  // https://github.com/airbnb/lottie-web/issues/2070
                  animationPath={JSON.parse(DEVELOPMENT_LOTTIE)}
                />
              </Col>
              <Col md={6} xs={12} className="mt-md-5 mt-3">
                <div className="d-flex flex-column align-items-center gap-3">
                  <div>
                    <h4 className="text-center brand-red">
                      {t("aboutPage.educationTitle")}
                    </h4>
                  </div>
                  <div>
                    <GlowCard identifier={`experience-5`}>
                      <div className="p-3 relative">
                        <div className="experience-container">
                          <div className="duration-text">
                            <p>20xx-20xx</p>
                          </div>
                          <div className="details">
                            <div className="icon">
                              <FaGraduationCap size={36} />
                            </div>
                            <div className="info">
                              <p className="title">{t("aboutPage.degree")}</p>
                              <p className="company">
                                {t("aboutPage.university")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                  </div>
                </div>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col md={6} xs={12} className=" mt-md-5 mt-3">
                <h3 className="mb-md-5 mb-2">{t("aboutPage.findMeOn")}</h3>
                <SocialMedia
                  youtube={APP_DATA.YOUTUBE_URL}
                  facebook={APP_DATA.FACEBOOK_URL}
                  tiktok={APP_DATA.TIKTOK_URL}
                  udemy={APP_DATA.UDEMY_URL}
                />
              </Col>
              <Col
                md={6}
                xs={12}
                className="d-flex flex-column align-items-center justify-content-center"
              >
                <AnimationLottie
                  width="50%"
                  //animation with rp => convert sang text
                  // https://github.com/airbnb/lottie-web/issues/2070
                  animationPath={JSON.parse(CONTACT_LOTTIE)}
                />
                <h4 className="text-center">{t("aboutPage.contactMe")}</h4>
              </Col>
            </Row>
            <div className="mb-5"></div>{" "}
          </Container>
        </section>
      </div>
    </>
  );
};

export default About;
