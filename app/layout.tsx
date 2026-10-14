import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title: "Uzair — Full Stack & AI/ML",description: "Rana Muhammad Uzair. Full-stack web experiences, machine learning and intelligent products. Based in New York."};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en" className="dark"><body>{children}</body></html>}
