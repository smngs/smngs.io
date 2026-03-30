import type { Metadata } from "next";
import Script from "next/script";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteToc } from "@/components/SiteToc";
import { SidebarProfile } from "@/components/SidebarProfile";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Shota Minegishi (@smngs)",
    template: "%s | Shota Minegishi",
  },
  description:
    "Shota Minegishi is a doctoral course student of the Faculty of Science and Technology, Sophia University, Japan.",
  metadataBase: new URL("https://smngs.io"),
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Shota Minegishi (@smngs)",
    description:
      "Shota Minegishi is a doctoral course student of the Faculty of Science and Technology, Sophia University, Japan.",
    url: "https://smngs.io",
    siteName: "smngs.io",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Shota Minegishi (@smngs)",
    description:
      "Shota Minegishi is a doctoral course student of the Faculty of Science and Technology, Sophia University, Japan.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FV70F5MH3L"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FV70F5MH3L');
          `}
        </Script>
      </head>
      <body>
        <ThemeProvider>
          <div className="layout">
            <SidebarProfile />
            <div className="page">
              <SiteNavbar />
              <main>{children}</main>
              <Footer />
            </div>
            <SiteToc />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
