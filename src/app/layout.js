import { Poppins } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Portfolio",
  description: "Developer Portfolio",
  keywords: "portfolio, developer, frontend, full stack",
  authors: [{ name: "Avik Jain" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio.vercel.app",
    title: "Avik Jain - Developer Portfolio",
    description: "Portfolio of Avik Jain - Full Stack Developer",
    siteName: "Avik Jain",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avik Jain - Developer Portfolio",
    description: "Portfolio of Avik Jain - Full Stack Developer",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
