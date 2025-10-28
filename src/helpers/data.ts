export const APP_DATA = {
  YOUTUBE_URL: "https://www.youtube.com/@SOSNu",
  TIKTOK_URL: "https://www.tiktok.com/@sosnu",
  UDEMY_URL: "",
  FACEBOOK_URL: "https://www.facebook.com/SOS.Nuu/",
};

export const EXPERIENCES = [
  {
    id: 1,
    title: {
      vi: "Lập Trình viên Fullstack",
      en: "Fullstack Developer",
    },
    company: {
      vi: "Phát Triển Website JobHunter để tìm việc dễ dàng hơn",
      en: "JobHunter Web Development Project",
    },
    duration: {
      vi: "tháng 5 2025 - tháng 12 2025",
      en: "May 2025 - Dec 2025",
    },
  },
  {
    id: 2,
    title: {
      vi: "Lập Trình Viên",
      en: "Internship Developer",
    },

    company: {
      vi: "THỰC TẬP TẠI CÔNG TY VIHAT SOFTWARE",
      en: "Vihat Software Company (Internship)",
    },
    duration: {
      vi: "Tháng 8/2024 - Tháng 11/2024",
      en: "Aug 2024 - Nov 2024",
    },
  },
  // {
  //   id: 3,
  //   title: {
  //     vi: "Dự án tự làm",
  //     en: "Self Employed",
  //   },
  //   company: {
  //     vi: "Học kiến thức mới mỗi ngày",
  //     en: "Code and build something in everyday.",
  //   },
  //   duration: {
  //     vi: "Tháng 1/2020 - Hiện tại",
  //     en: "Jan 2020 - Present",
  //   },
  // },
];
export const PROJECTSFeatured = [
  {
    id: 1,
    imgPath: "assets/project/jobhunter.png",
    title: {
      vi: "JobHunter | Ứng dụng Full-Stack (Nổi bật & Mới nhất)",
      en: "JobHunter | Full-Stack Application (Featured & Latest)",
    },
    description: {
      vi: `Một nền tảng tuyển dụng, kết nối nhà tuyển dụng và ứng viên.
- Backend được xây dựng với Java Spring (RESTful API), Hibernate, MySQL và áp dụng các Design Pattern, MVC.
- Bảo mật bằng Spring Security với JWT, Redis cache. Tích hợp Kafka để gửi email thông báo công việc mới.
- Call API Google Gemini, thanh toán VNPay, đăng nhập với Google, Cronjob để đối soát dữ liệu.
- Frontend sử dụng React với TypeScript, sử dụng Ant Design cho UI và Axios để gọi API.
- Về DevOps, đóng gói bằng Docker, tự động backup database, và giám sát bằng bộ công cụ Grafana, Prometheus, Node Exporter.`,
      en: `A recruitment platform connecting employers and candidates.
- The backend is built with Java Spring (RESTful API), Hibernate, MySQL, applying Design Patterns and MVC.
- Secured with Spring Security using JWT and Redis cache. Integrated Kafka for sending new job notification emails.
- Features Google Gemini API calls, VNPay payment gateway, Google login, and Cronjobs for data reconciliation.
- The frontend is developed with React and TypeScript, using Ant Design for the UI and Axios for API calls.
- For DevOps, the application is containerized with Docker, with automated database backups and monitoring using the Grafana, Prometheus, and Node Exporter stack.`,
    },
    githubLink: "https://github.com/SOS-Nu/springrest-sosnu",
    githubLink1: "https://github.com/SOS-Nu/react-vite-khoaluan",
    demoLink: "",
    youtubeVideoId: "",
  },
];

export const PROJECTS = [
  {
    id: 1,
    imgPath: "assets/project/soundcloud.png",
    title: {
      vi: "SoundCloud Clone | Next.js 14",
      en: "SoundCloud Clone | Next.js 14",
    },
    description: {
      vi: `Dự án frontend nhân bản giao diện và các tính năng cốt lõi của SoundCloud. Xây dựng bằng Next.js 14, tận dụng các tính năng mới nhất như Server Actions để tối ưu hóa trải nghiệm người dùng. Tích hợp NextAuth để xử lý xác thực, và áp dụng các kỹ thuật caching dữ liệu nâng cao cùng với revalidateTag để đảm bảo dữ liệu luôn mới nhất và hiệu năng.`,
      en: `A frontend project cloning the UI and core features of SoundCloud. Built with Next.js 14, leveraging the latest features like Server Actions to optimize user experience. Integrated NextAuth for authentication and applied advanced data caching techniques with revalidateTag to ensure data is always fresh and performance is high.`,
    },
    githubLink: "https://github.com/your-username/soundcloud-clone",
    demoLink: "https://your-demo-link.com",
  },
  {
    id: 2,
    imgPath: "assets/project/bookstore.png",
    title: {
      vi: "Hiệu sách E-commerce | React.js",
      en: "E-commerce Bookstore | React.js",
    },
    description: {
      vi: `Website thương mại điện tử chuyên bán sách, được xây dựng hoàn toàn bằng React. Giao diện người dùng được thiết kế chuyên nghiệp và thân thiện với thư viện Ant Design. Tích hợp các chức năng quan trọng như thanh toán online an toàn qua cổng VNPay và đăng nhập tiện lợi bằng tài khoản Google.`,
      en: `An e-commerce website specializing in selling books, built entirely with React. The user interface is professionally and friendly designed using the Ant Design library. It integrates key features such as secure online payments via the VNPay gateway and convenient login with Google accounts.`,
    },
    githubLink: "https://github.com/your-username/react-bookstore",
    demoLink: "https://your-demo-link.com",
  },
  {
    id: 3,
    imgPath: "assets/project/laptopshop.png",
    title: {
      vi: "Ứng dụng Web | Java Spring MVC & JSP",
      en: "Web Application | Java Spring MVC & JSP",
    },
    description: {
      vi: `Một ứng dụng web được xây dựng theo kiến trúc Java Spring MVC truyền thống. Sử dụng JSP (JavaServer Pages) làm view engine để render giao diện phía server. Hệ thống xác thực người dùng dựa trên Session, tương tác với cơ sở dữ liệu thông qua JPA (Java Persistence API) và được bảo mật bởi Spring Security.`,
      en: `A web application built following the traditional Java Spring MVC architecture. It uses JSP (JavaServer Pages) as the view engine for server-side rendering. The user authentication system is session-based, interacts with the database via JPA (Java Persistence API), and is secured by Spring Security.`,
    },
    githubLink: "https://github.com/your-username/spring-mvc-project",
    demoLink: "https://your-demo-link.com",
  },
];

export const SKILLS_DATA = [
  "HTML",
  "CSS",
  "Javascript",
  "Typescript",
  "React",
  "Next JS",
  // 'Tailwind',
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Git",
  //   "AWS",
  "Bootstrap",
  "Docker",
  //   "Go",
  "Figma",
  "Firebase",
  "MaterialUI",
  "Nginx",
  "Java",
  // "Node JS",
  //   "Strapi",
];

// Choose your skills from below. Make sure it's in the same format and spelled correctly.
// Couldn't find the required skills? Raise an issue on github at https://github.com/hhhrrrttt222111/developer-portfolio/issues/new

// AVAILABLE SKILLS

/* 
    HTML
    CSS
    JS 
    React
    Next JS
    Nuxt JS
    Node JS
    Vue
    Angular
    Docker
    Photoshop
    Illustrator
    Svelte
    GCP
    Azure
    Fastify
    Haxe
    Ionic
    Markdown
    Microsoft Office
    Picsart
    Sketch
    Unity
    WolframAlpha
    Adobe XD
    After Effects
    Bootstrap
    Bulma
    CapacitorJs
    Coffeescript
    MemSQL
    C
    C++
    C#
    Python
    Java
    Julia
    Matlab
    Swift
    Ruby
    Kotlin
    Go
    PHP
    Flutter
    Dart
    Typescript
    Swift
    Git
    Figma
    Canva
    Ubuntu
    Bootstrap
    MongoDB
    Tailwind
    ViteJS
    VuetifyJS
    MySQL
    PostgreSQL
    AWS
    Firebase
    Blender
    Premiere Pro
    Adobe Audition
    Deno
    Django
    Gimp
    Graphql
    Lightroom
    MaterialUI
    Nginx
    Numpy
    OpenCV
    Pytorch
    Selenium
    Strapi
    Tensorflow
    Webex
    Wordpress
  */
