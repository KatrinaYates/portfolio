import type { Metadata } from "next";
import {
  Playfair_Display,
  JetBrains_Mono,
  Cormorant_Garamond,
  Quicksand,
  Poppins,
  Nunito,
  Cinzel,
  Fraunces,
  Playpen_Sans,
  Space_Grotesk,
  Cabin_Sketch,
  Inter,
  VT323,
  Lacquer,
  Shadows_Into_Light_Two,
} from "next/font/google";
import "./globals.css";
import { ViewModeProvider } from "@/hooks/useViewMode";
import { ThemeProvider } from "@/hooks/useTheme";
import A11yDevPanelWrapper from "@/components/DevTools/A11yDevPanelWrapper";

// Display Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

// Body Fonts
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  variable: "--font-playpen-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const cabinSketch = Cabin_Sketch({
  subsets: ["latin"],
  variable: "--font-cabin-sketch",
  weight: ["400", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  weight: "400",
  display: "swap",
});

const lacquer = Lacquer({
  subsets: ["latin"],
  variable: "--font-lacquer",
  weight: "400",
  display: "swap",
});

const shadowsIntoLightTwo = Shadows_Into_Light_Two({
  subsets: ["latin"],
  variable: "--font-shadows-into-light-two",
  weight: "400",
  display: "swap",
});

// Mono Font
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Katrina Yates | Senior Creative Developer",
  description:
    "UX Engineering portfolio showcasing digital experiences, accessible interfaces, and scalable component systems.",
  keywords: [
    "UX Engineer",
    "Creative Developer",
    "React",
    "Front-End Developer",
    "Accessibility",
    "Component Systems",
    "Next.js",
    "TypeScript",
    "Design Systems",
  ],
  authors: [{ name: "Katrina Yates" }],
  creator: "Katrina Yates",
  metadataBase: new URL("https://katrinayates.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Katrina Yates | Senior Creative Developer",
    description:
      "UX Engineering portfolio showcasing digital experiences and accessible, scalable interfaces.",
    type: "website",
    locale: "en_US",
    siteName: "Katrina Yates Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Katrina Yates | Senior Creative Developer",
    description:
      "UX Engineering portfolio showcasing digital experiences and accessible interfaces.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        scroll-smooth
        ${playfair.variable}
        ${cormorant.variable}
        ${cinzel.variable}
        ${quicksand.variable}
        ${poppins.variable}
        ${nunito.variable}
        ${fraunces.variable}
        ${playpenSans.variable}
        ${spaceGrotesk.variable}
        ${cabinSketch.variable}
        ${inter.variable}
        ${vt323.variable}
        ${lacquer.variable}
        ${shadowsIntoLightTwo.variable}
        ${jetbrainsMono.variable}
      `}
    >
      <body className="antialiased">
        {/* Skip to main content link - visible on focus for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--bg-card)] focus:text-[var(--text-primary)] focus:border focus:border-[var(--accent-start)] focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-start)] focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <ViewModeProvider>{children}</ViewModeProvider>
          <A11yDevPanelWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
