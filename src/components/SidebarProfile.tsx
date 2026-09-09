"use client";

import { Avatar } from "./UiClientExports";
import { MailLink } from "./MailLink";
import { GithubIcon, OrcidIcon, ResearchmapIcon, MailIcon } from "./ProfileIcons";

export function SidebarProfile() {
  return (
    <aside className="sidebar-profile">
      <Avatar src="https://github.com/smngs.png" fallback="SM" size="lg" />
      <div className="sidebar-profile-name">峯岸 聖太</div>
      <div className="sidebar-profile-eng-name">Shota Minegishi</div>
      <nav className="sidebar-profile-links">
        <a href="https://github.com/smngs">
          <GithubIcon />
          <span>GitHub<small className="sidebar-profile-handle">@smngs</small></span>
        </a>
        <a href="https://orcid.org/0009-0003-1426-2431">
          <OrcidIcon />
          <span>ORCID<small className="sidebar-profile-handle">0009-0003-1426-2431</small></span>
        </a>
        <a href="https://researchmap.jp/s_minegishi">
          <ResearchmapIcon />
          <span>Researchmap<small className="sidebar-profile-handle">s_minegishi</small></span>
        </a>
        <MailLink>
          <MailIcon />
          <span>Mail<small className="sidebar-profile-handle">smngs [at] smngs.io</small></span>
        </MailLink>
      </nav>
    </aside>
  );
}
