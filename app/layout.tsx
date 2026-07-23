import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sergioloyola.dev"),
  title: {
    default: "Sérgio Roberto Loyola | Suporte e Helpdesk de TI",
    template: "%s | Sérgio Loyola",
  },
  description:
    "Portfólio e currículo online de Sérgio Roberto de Oliveira Loyola, profissional de suporte e helpdesk de TI e estudante de Ciência da Computação.",
  keywords: [
    "Sérgio Roberto Loyola",
    "Suporte de TI",
    "Helpdesk",
    "Desenvolvimento de Sistemas",
    "Portfólio",
    "Currículo",
    "Piauí",
  ],
  authors: [{ name: "Sérgio Roberto Loyola" }],
  creator: "Sérgio Roberto Loyola",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://sergioloyola.dev",
    title: "Sérgio Roberto Loyola | Suporte e Helpdesk de TI",
    description:
      "Portfólio e currículo online de Sérgio Roberto Loyola, com experiência em suporte técnico e helpdesk.",
    siteName: "Portfólio de Sérgio Roberto Loyola",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sérgio Roberto Loyola | Suporte e Helpdesk de TI",
    description:
      "Portfólio e currículo online com experiências em suporte técnico, helpdesk e desenvolvimento de sistemas.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${bebas.variable} ${plexMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
