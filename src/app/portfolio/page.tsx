import { Metadata } from "next";
import PortfolioClient from "./portfolio-client";

export const metadata: Metadata = {
  title: "ผลงานออกแบบและสกรีนเสื้อ - SAIFAH Design Studio",
  description:
    "รวมผลงานสกรีนเสื้อด่วน สกรีนเสื้อ DTF คุณภาพพรีเมียมจากลูกค้าที่ไว้วางใจ SAIFAH Studio ชมตัวอย่างงานสกรีนเสื้อบริษัท หน่วยงาน และงานกิจกรรม",
  openGraph: {
    title: "ผลงานสกรีนเสื้อคุณภาพ - SAIFAH Design Studio",
    description: "ชมตัวอย่างงานสกรีนเสื้อด่วน สกรีนเสื้อ DTF ที่สวยงามและทนทาน",
    images: ["/images/carousel-desktop-3.png"],
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
