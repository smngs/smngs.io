"use client";

import { usePathname } from "next/navigation";
import { Toc } from "./UiClientExports";

export function SiteToc() {
  const pathname = usePathname();

  return <Toc container="main" title="Contents" refreshKey={pathname} />;
}
