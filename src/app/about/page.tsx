import { Container } from "react-bootstrap";
import About from "@/components/sections/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Tác Giả Lê Văn Nguyên (sos nu).",
};

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
