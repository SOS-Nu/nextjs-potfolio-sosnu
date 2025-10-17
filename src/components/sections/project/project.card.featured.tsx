"use client";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";

interface IProps {
  imgPath: string;
  title: { vi: string; en: string };
  description: { vi: string; en: string };
  githubLink: string;
  githubLink1?: string;
  currentLanguage: "vi" | "en";
  demoLink: string;
  youtubeVideoId: string; // Đã thay đổi
}

function ProjectCardFeatured(props: IProps) {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const embedUrl = `https://www.youtube.com/embed/${props.youtubeVideoId}`;

  return (
    <>
      <Card className="project-card-view-featured">
        <Card.Img
          variant="top"
          src={props.imgPath}
          alt="card-img"
          style={{ maxHeight: 350 }}
        />
        <Card.Body className="d-flex flex-column" style={{ paddingTop: "5px" }}>
          <Card.Title>{props.title[props.currentLanguage]}</Card.Title>
          <div className="d-flex flex-column justify-content-between h-100">
            <Card.Text style={{ textAlign: "justify" }}>
              {props.description[props.currentLanguage]}
            </Card.Text>
            <div>
              <Col className="d-flex flex-row">
                <Button
                  variant="primary"
                  href={props.githubLink}
                  target="_blank"
                >
                  <BsGithub /> &nbsp;Backend
                </Button>
                <Button
                  variant="primary"
                  href={props.githubLink1}
                  target="_blank"
                  style={{ marginLeft: "5px" }}
                >
                  <BsGithub />
                  &nbsp; Frontend
                </Button>
                <Button
                  variant="primary"
                  onClick={handleShow} // Gọi hàm mở Modal
                  style={{ marginLeft: "5px" }}
                >
                  <CgWebsite /> &nbsp; {"Demo"}
                </Button>
              </Col>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.title[props.currentLanguage]} - Demo Video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%", // Tỷ lệ 16:9
              height: 0,
              overflow: "hidden",
            }}
          >
            <iframe
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ProjectCardFeatured;
