import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
// eslint-disable-next-line import-x/no-unresolved
import { GeistSans } from "geist/font/sans";
import { type Metadata, type Viewport } from "next";
import "react-quill-new/dist/quill.snow.css"; // Import the styles

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#2E8B57",
};

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://regula-aqui-one.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Regula Aqui",
    template: "%s / Regula Aqui",
  },
  applicationName: "Regula Aqui",
  description:
    "Assistência para emissão de notas de encaminhamento para médicos",
  alternates: {
    canonical: baseUrl,
  },
  robots: "noindex, nofollow",
  openGraph: {
    locale: "pt_BR",
    type: "website",
    title: "Regula Aqui",
    description:
      "Assistência para emissão de notas de encaminhamento para médicos",
    url: baseUrl,
    siteName: "Regula Aqui",
    countryName: "Brazil",
    images: [
      {
        url: `${baseUrl}/images/regula-aqui-open-graph.png`,
        alt: "Regula Aqui",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title: "Regula Aqui",
    description:
      "Assistência para emissão de notas de encaminhamento para médicos",
    site: baseUrl,
    card: "summary_large_image",
    images: [
      {
        url: `${baseUrl}/images/regula-aqui-open-graph.png`,
        alt: "Regula Aqui",
        width: 1200,
        height: 630,
      },
    ],
  },
  // manifest: `${baseUrl}/manifest.json`,
  keywords: ["Regula Aqui"],
  icons: {
    // Standard Icons
    icon: [
      { url: "/favicon.ico", media: "(prefers-color-scheme: light)" },
      { url: "/icon.png", type: "image/png" },
      {
        url: "/images/favicon-196x196.png",
        sizes: "196x196",
        type: "image/png",
      },
      { url: "/images/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-128.png", sizes: "128x128", type: "image/png" },
    ],
    // Apple Icons
    apple: [
      {
        url: "/images/apple-touch-icon-57x57.png",
        sizes: "57x57",
        rel: "apple-touch-icon-precomposed",
      },
      {
        url: "/images/apple-touch-icon-114x114.png",
        sizes: "114x114",
        rel: "apple-touch-icon-precomposed",
      },
      {
        url: "/images/apple-touch-icon-72x72.png",
        sizes: "72x72",
        rel: "apple-touch-icon-precomposed",
      },
      {
        url: "/images/apple-touch-icon-144x144.png",
        sizes: "144x144",
        rel: "apple-touch-icon-precomposed",
      },
      {
        url: "/images/apple-touch-icon-60x60.png",
        sizes: "60x60",
        rel: "apple-touch-icon-precomposed",
      },
      {
        url: "/images/apple-touch-icon-120x120.png",
        sizes: "120x120",
        rel: "apple-touch-icon-precomposed",
      },
      {
        url: "/images/apple-touch-icon-76x76.png",
        sizes: "76x76",
        rel: "apple-touch-icon-precomposed",
      },
      {
        url: "/images/apple-touch-icon-152x152.png",
        sizes: "152x152",
        rel: "apple-touch-icon-precomposed",
      },
    ],
    // Microsoft Tile Icons
    other: [
      {
        rel: "msapplication-TileColor",
        url: "#FFFFFF",
      },
      {
        rel: "msapplication-TileImage",
        url: "/images/mstile-144x144.png",
      },
      {
        rel: "msapplication-square70x70logo",
        url: "/images/mstile-70x70.png",
      },
      {
        rel: "msapplication-square150x150logo",
        url: "/images/mstile-150x150.png",
      },
      {
        rel: "msapplication-wide310x150logo",
        url: "/images/mstile-310x150.png",
      },
      {
        rel: "msapplication-square310x310logo",
        url: "/images/mstile-310x310.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in" signInUrl="/sign-in">
      <html lang="en" className="drag-none select-none scroll-smooth">
        <body className={GeistSans.className}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
