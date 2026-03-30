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
  Avatar,
} from "./UiClientExports";
import { ThemeToggle } from "./ThemeToggle";

export function SiteNavbar() {
  const pathname = usePathname();

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
            <Link href="/blog" className={pathname.startsWith("/blog") ? "active" : ""}>
              Blog
            </Link>
          </NavbarLinks>
          <ThemeToggle />
          <NavbarHamburger />
        </NavbarRight>
        <NavbarMobileMenu>
          <Link href="/">About</Link>
          <Link href="/blog">Blog</Link>
        </NavbarMobileMenu>
      </Navbar>
    </>
  );
}
