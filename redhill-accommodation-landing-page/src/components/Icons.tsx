import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" {...props}>
      {/* Hill */}
      <path
        d="M3 24 C 8 14, 14 14, 19 20 C 22 12, 26 12, 29 24 Z"
        fill="currentColor"
        opacity="0.25"
      />
      <path
        d="M3 24 C 8 14, 14 14, 19 20 C 22 12, 26 12, 29 24"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Sun/house dot */}
      <circle cx="22" cy="12" r="2.25" fill="currentColor" />
    </svg>
  );
}
