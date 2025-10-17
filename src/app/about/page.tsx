import { Container } from "react-bootstrap";
import bg from "assets/hero.svg";
import "./about.scss";
import About from "@/components/sections/about";

const AboutPage = () => {
  return (
    <div className="about-screen">
      <div className="hero-background"></div>{" "}
      <section className="mt-md-5 mt-5 pt-md-5 pt-4">
        <Container>
          <About />
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
