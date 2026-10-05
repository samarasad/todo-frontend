// Decorative chevron pattern used on the onboarding screen
export default function Zigzag({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="110" height="64" viewBox="0 0 110 64" aria-hidden="true">
      <defs>
        <pattern id="zigzag" width="22" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 12 L11 2 L22 12" fill="none" stroke="white" strokeOpacity="0.22" strokeWidth="3.5" />
        </pattern>
      </defs>
      <rect width="110" height="64" fill="url(#zigzag)" />
    </svg>
  );
}
