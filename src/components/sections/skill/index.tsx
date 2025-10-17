// src/components/Skill/Skill.js

import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "./skill.scss";
import { SKILLS_DATA } from "@/helpers/data";
import { skillsImage } from "@/helpers/skill.image";
import Image from "next/image";

const Skill = () => {
  const { t } = useTranslation();

  return (
    <Row className="skills-container">
      <Col xs={12} className="my-3 my-md-5">
        <div className="text-center">
          <h3>{t("skill.title")}</h3>
        </div>
      </Col>
      <Col xs={12} className="skills-carousel">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          allowTouchMove={true}
          slidesPerView={"auto"}
          //tốc độ trượt của item
          speed={3500}
          autoplay={{
            //thời gian chờ giữa các lần chuyển slide sua khi trượt hết
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true, // <-- THÊM DÒNG NÀY
          }}
          breakpoints={{
            320: { spaceBetween: 15 },
            768: { spaceBetween: 20 },
            1024: { spaceBetween: 25 },
          }}
          className="mySwiper"
        >
          {SKILLS_DATA.map((skill, id) => (
            <SwiperSlide key={id} style={{ width: "auto" }}>
              <div className="skill-item">
                <div className="skill-card">
                  <Image
                    src={skillsImage(skill)!}
                    alt={skill}
                    width={40}
                    height={40}
                    // Không cần thuộc tính style/className nếu kích thước đã được thiết lập qua width/height
                  />
                  <p className="skill-name">{skill}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Col>
    </Row>
  );
};

export default Skill;
