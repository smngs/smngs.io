"use client";

export function MailLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.location.href = "mai" + "lto:" + "smngs" + "@" + "smngs.io";
      }}
    >
      {children}
    </a>
  );
}
