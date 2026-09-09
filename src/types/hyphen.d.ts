/** Minimal typings for `hyphen` (ISC), which ships none of its own. */
declare module "hyphen/en-us" {
  export function hyphenateSync(
    text: string,
    options?: { hyphenChar?: string; minWordLength?: number; debug?: boolean }
  ): string;
}
