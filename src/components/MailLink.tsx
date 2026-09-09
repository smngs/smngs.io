"use client";

export function MailLink({
  className,
  ariaLabel,
  title,
  children,
}: {
  className?: string;
  ariaLabel?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#"
      className={className}
      aria-label={ariaLabel}
      title={title}
      onClick={(e) => {
        e.preventDefault();
        window.location.href = "mai" + "lto:" + "smngs" + "@" + "smngs.io";
      }}
    >
      {children}
    </a>
  );
}
