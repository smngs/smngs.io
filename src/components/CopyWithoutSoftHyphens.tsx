"use client";

import { useEffect } from "react";

const SOFT_HYPHEN = "\u00AD";

/**
 * Strip the build-time soft hyphens (see @/lib/hyphenate) from copied text.
 *
 * They are invisible on the page, but a native copy carries them along, and
 * they then surface wherever the text is pasted: as stray hyphens in a word
 * processor, as `<ad>` in an editor, and as characters that make a search for
 * the title fail. The browser's own copy is left alone unless the selection
 * contains any, so nothing else on the site is affected.
 */
export function CopyWithoutSoftHyphens() {
  useEffect(() => {
    const onCopy = (event: ClipboardEvent) => {
      const selection = window.getSelection();
      const data = event.clipboardData;
      if (!selection || !data || selection.isCollapsed) return;
      const text = selection.toString();
      if (!text.includes(SOFT_HYPHEN)) return;

      // Keep the rich-text flavour as well, so links survive a paste into a
      // word processor or a mail client.
      const fragment = document.createElement("div");
      for (let i = 0; i < selection.rangeCount; i++) {
        fragment.appendChild(selection.getRangeAt(i).cloneContents());
      }
      event.preventDefault();
      data.setData("text/plain", text.replaceAll(SOFT_HYPHEN, ""));
      data.setData("text/html", fragment.innerHTML.replaceAll(SOFT_HYPHEN, ""));
    };
    document.addEventListener("copy", onCopy);
    return () => document.removeEventListener("copy", onCopy);
  }, []);
  return null;
}
