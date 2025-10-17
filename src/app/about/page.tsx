import { Container } from "react-bootstrap";
import About from "@/components/sections/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Tác Giả Lê Văn Nguyên (sos nu).",
};

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
