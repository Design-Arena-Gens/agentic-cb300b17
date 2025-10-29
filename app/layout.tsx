import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HelpDesk Professional",
  description: "Sistema profissional de gerenciamento de tickets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
