import { PlusIcon } from "./Icons";

export default function AddFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Add task"
      className="fixed bottom-6 left-1/2 z-30 flex size-16 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition hover:scale-105 active:scale-95"
    >
      <PlusIcon width={28} height={28} />
    </button>
  );
}
