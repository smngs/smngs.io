"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Navbar,
  NavbarHamburger,
  NavbarHeader,
  NavbarIconLink,
  NavbarLinks,
  NavbarMobileMenu,
  NavbarRight,
  NavbarThemeToggle,
  useTheme,
} from "./UiClientExports";
import { MailLink } from "./MailLink";
import { GithubIcon, OrcidIcon, ResearchmapIcon, MailIcon } from "./ProfileIcons";
import { otherLangPath, strings, type Lang } from "@/lib/i18n";
import { NAME_EN, NAME_JA } from "@/lib/site";

const AVATAR_SRC = "https://github.com/smngs.png";

/**
 * Picks the header for the current route: the home page gets the hero and its
 * scroll behaviour, everything else gets the bare navbar. Both are @smngs/ui's;
 * `brandLink` hands them Next's Link so the avatar keeps client-side routing.
 */
export function SiteHeader({ hasPosts, lang }: { hasPosts: boolean; lang: Lang }) {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();

  const home = lang === "ja" ? "/" : "/en";
  const blog = `${lang === "ja" ? "" : "/en"}/blog`;
  const isHome = pathname === home;
  const avatar = { src: AVATAR_SRC, alt: "@smngs", href: home };

  const bar = (
    <NavbarRight>
      <NavbarLinks>
        {/* The nav button variants, not bare anchors: a bare link takes the
            default link colour, which is the brand colour the bar is painted
            in. */}
        <Button variant={isHome ? "nav-active" : "nav"} asChild>
          <Link href={home}>About</Link>
        </Button>
        {hasPosts && (
          <Button variant={pathname.startsWith(blog) ? "nav-active" : "nav"} asChild>
            <Link href={blog}>Blog</Link>
          </Button>
        )}
      </NavbarLinks>
      {/* A link rather than a button: the other language is a real page, so it
          should be openable in a new tab and followable by a crawler. */}
      <NavbarIconLink
        href={otherLangPath(pathname, lang)}
        label={strings[lang].switchLanguage}
        hrefLang={lang === "ja" ? "en" : "ja"}
      >
        <FontAwesomeIcon icon={faGlobe} />
      </NavbarIconLink>
      <NavbarThemeToggle isDark={isDark} onToggle={toggleTheme} />
      <NavbarHamburger />
    </NavbarRight>
  );

  const menu = (
    <NavbarMobileMenu>
      <Link href={home}>About</Link>
      {hasPosts && <Link href={blog}>Blog</Link>}
    </NavbarMobileMenu>
  );

  if (!isHome) {
    return (
      <Navbar>
        <Link href={home} className="smngs-navbar-brand" aria-label="Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="smngs-navbar-avatar" src={avatar.src} alt={avatar.alt} />
        </Link>
        {bar}
        {menu}
      </Navbar>
    );
  }

  return (
    <NavbarHeader
      avatar={avatar}
      brandLink={<Link href={home} aria-label="Home" />}
      hero={<Hero lang={lang} />}
    >
      {bar}
      {menu}
    </NavbarHeader>
  );
}

/** The name leads in the page's own language; the other form sits under it. */
function Hero({ lang }: { lang: Lang }) {
  return (
    <>
      <div className="name" lang={lang === "ja" ? "ja" : "en"}>
        {lang === "ja" ? NAME_JA : NAME_EN}
      </div>
      <div className="eng-name" lang={lang === "ja" ? "en" : "ja"}>
        {lang === "ja" ? NAME_EN : NAME_JA}
      </div>
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
