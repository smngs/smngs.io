"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Button,
  Navbar,
  NavbarHamburger,
  NavbarHeader,
  NavbarLinks,
  NavbarMobileMenu,
  NavbarRight,
  NavbarThemeToggle,
  useTheme,
} from "./UiClientExports";
import { MailLink } from "./MailLink";
import { GithubIcon, OrcidIcon, ResearchmapIcon, MailIcon } from "./ProfileIcons";

const AVATAR = { src: "https://github.com/smngs.png", alt: "@smngs", href: "/" };

/**
 * Picks the header for the current route: the home page gets the hero and its
 * scroll behaviour, everything else gets the bare navbar. Both are @smngs/ui's;
 * `brandLink` hands them Next's Link so the avatar keeps client-side routing.
 */
export function SiteHeader({ hasPosts }: { hasPosts: boolean }) {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();
  const isHome = pathname === "/";

  const bar = (
    <NavbarRight>
      <NavbarLinks>
        {/* The nav button variants, not bare anchors: a bare link takes the
            default link colour, which is the brand colour the bar is painted
            in. */}
        <Button variant={pathname === "/" ? "nav-active" : "nav"} asChild>
          <Link href="/">About</Link>
        </Button>
        {hasPosts && (
          <Button variant={pathname.startsWith("/blog") ? "nav-active" : "nav"} asChild>
            <Link href="/blog">Blog</Link>
          </Button>
        )}
      </NavbarLinks>
      <NavbarThemeToggle isDark={isDark} onToggle={toggleTheme} />
      <NavbarHamburger />
    </NavbarRight>
  );

  const menu = (
    <NavbarMobileMenu>
      <Link href="/">About</Link>
      {hasPosts && <Link href="/blog">Blog</Link>}
    </NavbarMobileMenu>
  );

  if (!isHome) {
    return (
      <Navbar>
        <Link href="/" className="smngs-navbar-brand" aria-label="Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="smngs-navbar-avatar" src={AVATAR.src} alt={AVATAR.alt} />
        </Link>
        {bar}
        {menu}
      </Navbar>
    );
  }

  return (
    <NavbarHeader avatar={AVATAR} brandLink={<Link href="/" aria-label="Home" />} hero={<Hero />}>
      {bar}
      {menu}
    </NavbarHeader>
  );
}

function Hero() {
  return (
    <>
      <div className="name">峯岸 聖太</div>
      <div className="eng-name">Shota Minegishi</div>
      <div className="hero-badges">
        <a
          href="https://github.com/smngs"
          className="hero-badge"
          aria-label="GitHub"
          title="GitHub"
        >
          <GithubIcon />
        </a>
        <a
          href="https://orcid.org/0009-0003-1426-2431"
          className="hero-badge"
          aria-label="ORCID"
          title="ORCID"
        >
          <OrcidIcon />
        </a>
        <a
          href="https://researchmap.jp/s_minegishi"
          className="hero-badge"
          aria-label="researchmap"
          title="researchmap"
        >
          <ResearchmapIcon />
        </a>
        <MailLink className="hero-badge" ariaLabel="Mail" title="Mail">
          <MailIcon />
        </MailLink>
      </div>
    </>
  );
}
