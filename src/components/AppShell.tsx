export default function AppShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-dvh md:flex md:items-center md:justify-center md:py-6">
      <div
        className={`relative mx-auto w-full max-w-md overflow-hidden bg-surface min-h-dvh md:min-h-[min(820px,calc(100dvh-3rem))] md:rounded-[28px] md:shadow-xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
