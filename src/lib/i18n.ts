export type Lang = "ja" | "en";

export const LANGS: Lang[] = ["ja", "en"];

/**
 * The counterpart URL for a path, for the language switch in the navbar.
 * The English pages live under /en, so the mapping is just that prefix.
 */
export function otherLangPath(pathname: string, lang: Lang): string {
  if (lang === "en") {
    const stripped = pathname.replace(/^\/en(?=\/|$)/, "");
    return stripped === "" ? "/" : stripped;
  }
  return pathname === "/" ? "/en" : `/en${pathname}`;
}

/**
 * Reads a field from a data entry in the requested language.
 *
 * The data files carry one entry per publication with the Japanese text in the
 * plain field and an English translation in `<field>_en`, added only where the
 * two differ — every journal and conference paper is written in English to
 * begin with and needs nothing. So this falls back to the plain field, and an
 * entry that is already English reads the same in both languages.
 *
 * An empty `<field>_en` is not a missing translation but a deliberate one: the
 * field is dropped on the English page.
 */
export function localized<T = string>(
  entry: Record<string, unknown>,
  field: string,
  lang: Lang
): T {
  if (lang === "en") {
    const translated = entry[`${field}_en`];
    if (translated !== undefined && translated !== null) return translated as T;
  }
  return entry[field] as T;
}

/** Interface text that isn't part of the publication data. */
export const strings = {
  ja: {
    noPosts: "記事はまだありません。",
    pressRelease: "所属機関発表",
    switchLanguage: "English",
  },
  en: {
    noPosts: "No posts yet.",
    pressRelease: "Press release",
    switchLanguage: "日本語",
  },
} as const satisfies Record<Lang, Record<string, string>>;
