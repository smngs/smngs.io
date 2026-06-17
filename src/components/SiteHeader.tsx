"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { NavbarThemeToggle } from "./UiClientExports";
import { MailLink } from "./MailLink";

const AVATAR = "https://github.com/smngs.png";

/**
 * Combined navbar + hero header.
 *
 * Scrolling collapses the hero (height + fade), driven by the CSS variable
 * `--p` (0 = expanded, 1 = collapsed). The avatar treatment differs by device:
 *   - Desktop: a single fixed avatar "flies"/shrinks from the hero slot into
 *     the navbar slot (measured each frame).
 *   - Mobile: the real in-flow avatars cross-fade via opacity (no fixed
 *     positioning or measurement, which drifts on mobile).
 */
export function SiteHeader({ hasPosts }: { hasPosts: boolean }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const heroBlock = useRef<HTMLDivElement>(null);
  const barAvatar = useRef<HTMLImageElement>(null); // navbar slot + mobile avatar
  const heroAvatar = useRef<HTMLImageElement>(null); // hero slot + mobile avatar
  const morph = useRef<HTMLAnchorElement>(null); // desktop fly avatar

  useEffect(() => {
    const header = headerRef.current;
    const m = morph.current;
    const ba = barAvatar.current;
    if (!header || !m || !ba) return;

    const isDesktop = () => window.matchMedia("(min-width: 769px)").matches;
    const placeMorph = (
      p: number,
      hero: { left: number; top: number; width: number },
      nav: DOMRect
    ) => {
      const lerp = (f: number, t: number) => f + (t - f) * p;
      const size = lerp(hero.width, nav.width);
      m.style.width = `${size}px`;
      m.style.height = `${size}px`;
      m.style.transform = `translate(${lerp(hero.left, nav.left)}px, ${lerp(hero.top, nav.top)}px)`;
    };

    if (!isHome) {
      header.style.setProperty("--p", "1");
      const n = ba.getBoundingClientRect();
      placeMorph(1, { left: n.left, top: n.top, width: n.width }, n);
      return;
    }

    const setHeroMax = () => {
      if (heroBlock.current) {
        header.style.setProperty(
          "--hero-max",
          `${heroBlock.current.scrollHeight}px`
        );
      }
    };
    // Hero avatar's expanded position in document coords, so the desktop fly
    // has a stable target even after the hero has collapsed.
    let anchor = { left: 0, topDoc: 0, width: 0 };
    const measureAnchor = () => {
      const h = (heroAvatar.current ?? ba).getBoundingClientRect();
      anchor = { left: h.left, topDoc: h.top + window.scrollY, width: h.width };
    };
    const heroViewport = () => ({
      left: anchor.left,
      top: anchor.topDoc - window.scrollY,
      width: anchor.width,
    });
    // Both measurements are bogus while the hero is collapsed: scrollHeight
    // under-reports (the vertically-centered content overflows above the
    // padding box and isn't counted, and the vertical padding has collapsed)
    // and the avatar slot sits in the wrong place. Force the fully-expanded
    // layout (--p = 0 restores the padding, max-height: none unclamps the
    // height) for the measurement, then restore so resizing while scrolled
    // down still yields the correct values.
    const remeasure = () => {
      const hero = heroBlock.current;
      const prevP = header.style.getPropertyValue("--p");
      const prevMax = hero?.style.maxHeight;
      header.style.setProperty("--p", "0");
      if (hero) hero.style.maxHeight = "none";
      setHeroMax();
      measureAnchor();
      if (hero) hero.style.maxHeight = prevMax ?? "";
      if (prevP) header.style.setProperty("--p", prevP);
      else header.style.removeProperty("--p");
    };

    remeasure();

    const COLLAPSE_AT = 24;
    const EXPAND_AT = 4;
    let target = window.scrollY > COLLAPSE_AT ? 1 : 0;
    let cur = target;
    let raf = 0;

    const render = () => {
      header.style.setProperty("--p", `${cur}`);
      if (isDesktop()) placeMorph(cur, heroViewport(), ba.getBoundingClientRect());
    };
    const frame = () => {
      cur += (target - cur) * 0.2;
      if (Math.abs(target - cur) < 0.003) cur = target;
      render();
      if (cur !== target) raf = requestAnimationFrame(frame);
    };
    const onScroll = () => {
      const y = window.scrollY;
      const t = y > COLLAPSE_AT ? 1 : y < EXPAND_AT ? 0 : target;
      if (t === target) return;
      target = t;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      remeasure();
      render();
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [isHome]);

  return (
    <div className="site-header" data-home={isHome} ref={headerRef}>
      <div className="header-bar">
        <Link href="/" className="header-brand" aria-label="Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="bar-avatar" src={AVATAR} alt="@smngs" ref={barAvatar} />
        </Link>
        <div className="header-right">
          <nav className="header-links">
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              About
            </Link>
            {hasPosts && (
              <Link href="/blog" className={pathname.startsWith("/blog") ? "active" : ""}>
                Blog
              </Link>
            )}
          </nav>
          <NavbarThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <button
            className="header-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="header-mobile-menu">
            <Link href="/" onClick={() => setMenuOpen(false)}>About</Link>
            {hasPosts && <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>}
          </div>
        )}
      </div>

      {isHome && (
        <div className="header-hero" ref={heroBlock}>
          <div className="header-hero-text">
            <div className="name">峯岸 聖太</div>
            <div className="eng-name">Shota Minegishi</div>
            <div className="hero-badges">
              <a href="https://github.com/smngs" className="hero-badge">Github</a>
              <a href="https://orcid.org/0009-0003-1426-2431" className="hero-badge">ORCID</a>
              <a href="https://researchmap.jp/s_minegishi" className="hero-badge">Researchmap</a>
              <MailLink className="hero-badge">Mail</MailLink>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="hero-avatar" src={AVATAR} alt="@smngs" ref={heroAvatar} />
        </div>
      )}

      {/* Desktop only: the single avatar that flies between the slots. */}
      <Link href="/" className="morph-avatar" aria-label="Home" ref={morph}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={AVATAR} alt="@smngs" />
      </Link>
    </div>
  );
}
