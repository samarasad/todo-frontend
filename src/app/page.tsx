import Link from "next/link";
import AppShell from "@/components/AppShell";
import Zigzag from "@/components/Zigzag";

export default function OnboardingPage() {
  return (
    <AppShell className="flex flex-col">
      <div className="relative h-[62dvh] shrink-0 overflow-hidden bg-primary md:h-[460px]">
        <div className="absolute -right-5 -top-6 size-[88px] rounded-full border-[14px] border-white/20" />
        <Zigzag className="absolute left-0 top-[88px]" />
        <Zigzag className="absolute bottom-6 right-0" />
      </div>

      <div className="flex flex-1 flex-col bg-white px-6 pb-8 pt-8">
        <h1 className="text-[22px] font-semibold leading-tight text-black">Manage What To Do</h1>
        <p className="mt-4 max-w-[260px] text-xs leading-5 text-muted">
          The best way to manage what you have to do, don&apos;t forget your plans
        </p>

        <div className="flex-1" />

        <Link
          href="/home"
          className="mt-10 flex h-12 w-full items-center justify-center bg-primary text-base font-medium text-white transition hover:bg-primary/90"
        >
          Get Started
        </Link>
      </div>
    </AppShell>
  );
}
