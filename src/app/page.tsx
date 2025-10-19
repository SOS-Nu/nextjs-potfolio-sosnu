//page.tsx
import HomePage from "@/components/homepage/HomePages";
import { Metadata } from "next";

export const metadata: Metadata = {
  // Ghi đè Title và Description của layout.tsx (chủ yếu là Description)
  title: "Trang chủ | Lê Văn Nguyên (SOS Nu)", // Sẽ kết hợp với template trong layout
  description:
    "Chào mừng đến với portfolio của Lê Văn Nguyên (SOS Nu). Khám phá các dự án lập trình, kinh nghiệm và kỹ năng Fullstack của tôi tại đây. (levannguyen.pro)",
  // Có thể thêm OpenGraph/Keywords cụ thể hơn cho trang chủ nếu cần
};

const Home = () => {
  return <HomePage />;
};

export default Home;
