"use client";

import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export function ReferenceTooltip({ reference }: { reference: string }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const wasFocusedRef = useRef(false);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const btn = btnRef.current;
      if (!btn) return;
      if (document.activeElement !== btn) return;
      if (!btn.contains(e.target as Node)) btn.blur();
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  const updatePosition = () => {
    const btn = btnRef.current;
    const tip = tipRef.current;
    if (!btn || !tip) return;
    tip.style.left = "";
    tip.style.transform = "";
    const btnRect = btn.getBoundingClientRect();
    const margin = 16;
    const vw = document.documentElement.clientWidth;
    const tipWidth = Math.min(tip.offsetWidth, vw - margin * 2);
    const iconCenter = btnRect.left + btnRect.width / 2;
    let left = iconCenter - tipWidth / 2;
    left = Math.max(margin, Math.min(left, vw - margin - tipWidth));
    const arrowX = iconCenter - left;
    tip.style.left = `${left - btnRect.left}px`;
    tip.style.transform = "none";
    tip.style.setProperty("--arrow-x", `${arrowX}px`);
  };

  return (
    <button
      ref={btnRef}
      type="button"
      className="reference-tooltip"
      aria-label={reference}
      onMouseEnter={updatePosition}
      onFocus={updatePosition}
      onTouchStart={updatePosition}
      onPointerDown={(e) => {
        wasFocusedRef.current = document.activeElement === e.currentTarget;
      }}
      onClick={(e) => {
        e.preventDefault();
        if (wasFocusedRef.current) e.currentTarget.blur();
      }}
    >
      <FontAwesomeIcon icon={faBook} />
      <span ref={tipRef} className="reference-tooltip-content">
        {reference}
      </span>
    </button>
  );
}
