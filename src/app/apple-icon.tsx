import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" fill="#b45309" />
        <circle cx="32" cy="31" r="15" fill="#f59e0b" />
        <path d="M0 50 Q32 44 64 50 V64 H0Z" fill="#1c1917" />
        <path
          d="M30.5 49 C30.5 43 31 39 27 34 L31 36.5 L31.5 31 H33 L33.5 36.5 L37 33 C35 38 35.5 43 35.5 49Z"
          fill="#1c1917"
        />
        <ellipse cx="32" cy="30" rx="18" ry="4.5" fill="#1c1917" />
        <ellipse cx="24" cy="32.5" rx="8" ry="2.5" fill="#1c1917" />
        <ellipse cx="41" cy="32.5" rx="7" ry="2.5" fill="#1c1917" />
        <path d="M48 8 L49.6 12.4 L54 14 L49.6 15.6 L48 20 L46.4 15.6 L42 14 L46.4 12.4Z" fill="#fff" />
      </svg>
    ),
    size,
  );
}
