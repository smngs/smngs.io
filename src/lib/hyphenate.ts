import { hyphenateSync } from "hyphen/en-us";

/**
 * Insert soft hyphens (U+00AD) into English text using TeX's hyphenation
 * patterns.
 *
 * The publication entries are justified so their right edge lines up, and in
 * the narrow mobile column that only reads well if long words can break.
 * Browsers' own `hyphens: auto` does not help here — Blink/WebKit hyphenate
 * only when a word would otherwise overflow, not to tighten the gaps that
 * justification opens up. So we supply the break points ourselves; this runs
 * in server components, i.e. at build time, and ships no client-side JS.
 *
 * Short words are left alone: breaking them buys little and reads worse.
 */
export function hyphenate(text: string): string {
  return hyphenateSync(text, { minWordLength: 7 });
}
