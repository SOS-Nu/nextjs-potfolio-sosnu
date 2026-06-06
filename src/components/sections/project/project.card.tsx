import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import Image from "next/image";

interface IProps {
  imgPath: string;
  title: { vi: string; en: string };
  description: { vi: string; en: string };
  githubLink?: string;
  demoLink?: string;
  currentLanguage: "vi" | "en";
}

function ProjectCard(props: IProps) {
  const imageSrc = props.imgPath.startsWith("/") ? props.imgPath : `/${props.imgPath}`;

  return (
    <>
      {" "}
      <Card className="project-card-view">
        <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
          <Image
            src={imageSrc}
            alt={props.title[props.currentLanguage]}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover", borderTopLeftRadius: "0.75rem", borderTopRightRadius: "0.75rem" }}
          />
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title>{props.title[props.currentLanguage]}</Card.Title>
          <div className="d-flex flex-column justify-content-between h-100">
            <Card.Text style={{ textAlign: "justify" }}>
              {props.description[props.currentLanguage]}
            </Card.Text>
            <div>
              <Button variant="primary" href={props.githubLink} target="_blank">
                <BsGithub /> &nbsp; GitHub
              </Button>

              <Button
                variant="primary"
                href={props.demoLink}
                target="_blank"
                style={{ marginLeft: "10px" }}
              >
                <CgWebsite /> &nbsp;
                {"Demo"}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
export default ProjectCard;
