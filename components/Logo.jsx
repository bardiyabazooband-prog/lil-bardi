import Link from "next/link";

/**
 * LB. wordmark. The dot is the Bardi accent and is always pink.
 * Rendered as an inline SVG so it scales crisply and inherits currentColor.
 */
export function LogoMark({ className = "h-6 w-auto" }) {
  return (
    <svg
      viewBox="0 0 72 32"
      role="img"
      aria-label="Lil Bardi"
      fill="none"
      className={className}
    >
      <path
        d="M4 3v22h13"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="square"
      />
      <path
        d="M26 3h10.5c4.4 0 7.5 2.3 7.5 6.2 0 2.6-1.4 4.5-3.6 5.3 2.9.7 4.8 2.9 4.8 6 0 4.4-3.4 7-8.6 7H26V3Zm5.4 8.8h4.6c1.7 0 2.8-.9 2.8-2.3 0-1.4-1.1-2.2-2.8-2.2h-4.6v4.5Zm0 9.4h5.3c2 0 3.2-1 3.2-2.6 0-1.6-1.2-2.5-3.2-2.5h-5.3v5.1Z"
        fill="currentColor"
      />
      <circle cx="58" cy="22.5" r="4.2" fill="#FF4FB8" />
    </svg>
  );
}

export default function Logo({ className = "", onClick, onMouseEnter, label = "Lil Bardi — home" }) {
  return (
    <Link
      href="/"
      aria-label={label}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`group inline-flex items-center transition-transform duration-300 hover:-rotate-2 ${className}`}
    >
      <LogoMark className="h-5 w-auto sm:h-6" />
    </Link>
  );
}
