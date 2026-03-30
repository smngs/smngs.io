import { Avatar } from "./UiClientExports";
import { MailLink } from "./MailLink";

export function HeroSection() {
  return (
    <div className="hero">
      <div className="hero-text">
        <div className="name">峯岸 聖太</div>
        <div className="eng-name">Shota Minegishi</div>
        <div className="hero-badges">
          <a href="https://github.com/smngs" className="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            Github
          </a>
          <a href="https://orcid.org/0009-0003-1426-2431" className="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.847-1.184-3.722-3.978-3.722h-2.341z"/></svg>
            ORCID
          </a>
          <a href="https://researchmap.jp/s_minegishi" className="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H3zm3 4h12v2H6V6zm0 4h12v2H6v-2zm0 4h8v2H6v-2z"/></svg>
            Researchmap
          </a>
          <MailLink className="hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
            Mail
          </MailLink>
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://github.com/smngs.png" alt="@smngs" className="hero-icon" />
    </div>
  );
}
