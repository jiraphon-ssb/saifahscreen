import { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
  title: 'SAIFAH Design Studio - สกรีนเสื้อด่วน สกรีนเสื้อ DTF คุณภาพพรีเมียม',
  description: 'โรงสกรีนเสื้อคุณภาพสูง ออกแบบเสื้อของคุณเองได้ทันที สกรีนเสื้อด่วน สกรีนเสื้อ DTF ราคาคุ้มค่า เริ่มต้นไม่มีขั้นต่ำ ส่งทั่วประเทศไทย',
  openGraph: {
    title: 'SAIFAH Design Studio - สกรีนเสื้อด่วน สกรีนเสื้อ DTF',
    description: 'โรงสกรีนเสื้อคุณภาพสูง ออกแบบเสื้อของคุณเองได้ทันที สกรีนเสื้อด่วน',
    url: 'https://saifahscreen.com',
    siteName: 'SAIFAH Design Studio',
    images: [
      {
        url: '/images/carousel-desktop-1.png',
        width: 1200,
        height: 630,
        alt: 'SAIFAH Design Studio - สกรีนเสื้อด่วน',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
};

export default function Home() {
  return <HomeClient />;
}
