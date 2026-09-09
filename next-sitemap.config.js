/**
 * Each page exists in both languages, so every entry carries the pair — the
 * Japanese page is the x-default, matching what the layouts declare in their
 * own `alternates`.
 */
function pair(path) {
  const ja = path.startsWith("/en") ? path.replace(/^\/en/, "") || "/" : path;
  const en = ja === "/" ? "/en" : `/en${ja}`;
  return { ja, en };
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://smngs.io",
  generateRobotsTxt: false,
  outDir: "out",
  transform: async (config, path) => {
    const { ja, en } = pair(path);
    const abs = (p) => ({ href: `${config.siteUrl}${p}`, hrefIsAbsolute: true });

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [
        { ...abs(ja), hreflang: "ja" },
        { ...abs(en), hreflang: "en" },
        { ...abs(ja), hreflang: "x-default" },
      ],
    };
  },
};
