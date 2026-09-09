import { themeInitScript } from "@smngs/ui/theme-script";
import Script from "next/script";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteToc } from "@/components/SiteToc";
import { Footer, ThemeProvider } from "@/components/UiClientExports";
import { getAllPosts } from "@/lib/blog";
import type { Lang } from "@/lib/i18n";
import { NAME_EN, personJsonLd } from "@/lib/site";

/**
 * The document both roots render.
 *
 * There are two root layouts — one per language — because `<html lang>` has to
 * differ and `output: "export"` rules out Next's middleware-based i18n
 * routing. Everything below `<html>` is identical apart from the `lang` that
 * gets threaded down, so it lives here rather than being copied twice.
 */
export function RootShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const hasPosts = getAllPosts().length > 0;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const enableAnalytics =
    process.env.NODE_ENV === "production" && Boolean(gaId);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(lang)) }}
        />
        {enableAnalytics && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <ThemeProvider>
          <SiteHeader hasPosts={hasPosts} lang={lang} />
          <div className="smngs-layout">
            <div className="page">
              <main>{children}</main>
            </div>
            <SiteToc />
          </div>
          <Footer>{NAME_EN}</Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
