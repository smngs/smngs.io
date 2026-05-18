"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarTitle,
  NavbarLinks,
  NavbarRight,
  NavbarHamburger,
  NavbarMobileMenu,
  NavbarThemeToggle,
  Avatar,
} from "./UiClientExports";
import { useTheme } from "./ThemeProvider";

export function SiteNavbar({ hasPosts }: { hasPosts: boolean }) {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <div className="nav-spacer" aria-hidden="true" />
      <Navbar>
        <NavbarTitle asChild>
          <Link href="/">
            <Avatar src="https://github.com/smngs.png" fallback="SM" size="sm" />
          </Link>
        </NavbarTitle>
        <NavbarRight>
          <NavbarLinks>
            <Link href="/" className={pathname === "/" ? "active" : ""}>
              About
            </Link>
            {hasPosts && (
              <Link href="/blog" className={pathname.startsWith("/blog") ? "active" : ""}>
                Blog
              </Link>
            )}
          </NavbarLinks>
          <NavbarThemeToggle isDark={isDark} onToggle={toggleTheme} />
          <NavbarHamburger />
        </NavbarRight>
        <NavbarMobileMenu>
          <Link href="/">About</Link>
          {hasPosts && <Link href="/blog">Blog</Link>}
        </NavbarMobileMenu>
      </Navbar>
    </>
  );
}
