"usse client";
import { Container } from "react-bootstrap";
import Project from "@/components/sections/project";

const ProjectPage = () => {
  return (
    <div className="project-screen">
      <div
        style={{
          backgroundImage: `url("assets/top-bg.svg"))`,
          width: "100%",
          height: 500,
          position: "absolute",
          top: 0,
          backgroundRepeat: "repeat",
          zIndex: 0,
        }}
      ></div>
      <section className="mt-md-2 mt-2 pt-md-5 pt-0">
        <Container>
          <Project />
        </Container>
      </section>
    </div>
  );
};

export default ProjectPage;
