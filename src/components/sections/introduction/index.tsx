import { Col, Row } from "react-bootstrap";
import Tilt from "react-parallax-tilt";
import "./introduction.scss";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const Introduction = () => {
  const { t, i18n } = useTranslation();

  return (
    <section
      className="introduction-section my-5 my-md-7"
      style={{ position: "relative" }}
    >
      <Row>
        <Col xs={12} md={9}>
          <h2 className="text-center text-md-start">
            {i18n.resolvedLanguage === "en" ? (
              <>
                LET ME <span className="text-pink-100"> INTRODUCE </span> MYSELF
              </>
            ) : (
              <>
                <span className="text-pink-100">GIỚI THIỆU</span> BẢN THÂN
              </>
            )}
          </h2>
          <br />
          <p>
            {t("introSection.heading1")}
            <br />
            <br />
            {t("introSection.heading2")}
            <i>
              <b className="text-pink-100">
                {" "}
                Java {t("introSection.and")} Javascript.{" "}
              </b>
            </i>
            <br />
            <br />
            {t("introSection.heading3")} &nbsp;
            <i>
              <b className="text-pink-100">{t("introSection.heading4")}</b>
            </i>
            <br />
            <br />
            {t("introSection.heading5")}
            <i>
              <b className="text-pink-100">&nbsp;Java Spring</b>{" "}
            </i>
            {t("introSection.and")}
            <i>
              <b className="text-pink-100"> Next JS</b>
            </i>
          </p>
        </Col>
        <Col
          xs={12} /* Chiếm toàn bộ chiều rộng trên màn hình nhỏ */
          md={3}
          className="d-md-block p-6 p-md-2" /* DI CHUYỂN PADDING LÊN ĐÂY */
        >
          <Tilt>
            <div
              className="img-fluid"
              style={{
                position: "relative",
                width: "100%",
                height: "auto",
                paddingBottom: "100%",
              }}
            >
              <Image
                src={"/assets/levannguyen.png"}
                alt="avatar"
                fill
                style={{
                  objectFit: "cover", // 3. Giữ ảnh không bị méo
                }}
                className="img-fluid"
              />
            </div>
          </Tilt>
        </Col>
      </Row>
      <div className="about-container d-none d-md-flex">
        <span className="about-label">{t("introSection.about")}</span>
        <span className="vertical-line"></span>
      </div>
    </section>
  );
};

export default Introduction;
