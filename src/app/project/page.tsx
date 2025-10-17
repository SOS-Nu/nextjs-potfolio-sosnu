//project/page.tsx
import Project from "@/components/sections/project";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Project", // Sẽ tự động trở thành "Các Dự Án | Le Van Nguyen"
  description:
    "Tổng hợp các dự án lập trình nổi bật của Lê Văn Nguyên (sos nu).",
};

const ProjectPage = () => {
  return <Project />;
};

export default ProjectPage;
