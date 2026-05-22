import Link from "next/link";
import { BRAND } from "@/lib/brand";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function Logo({ showText = true, size = "md", className = "" }: LogoProps) {
  const iconSize = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const iconInner = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 ${className}`}
    >
      <div
        className={`flex ${iconSize} items-center justify-center rounded-lg bg-gradient-to-br from-red-500 via-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105`}
      >
        <svg
          className={`${iconInner} text-white`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      {showText && (
        <span className="text-sm font-semibold tracking-tight text-white">
          {BRAND.name}
        </span>
      )}
    </Link>
  );
}
