import "./globals.css";
import React from "react";

export const metadata = {
  title: "AI Chief of Staff",
  description: "Unified Life OS dashboard powered by collaborating agents.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
