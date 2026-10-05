import { padCount } from "@/lib/dates";
import { CheckSquareIcon, XSquareIcon } from "./Icons";

export default function StatCards({ completed, pending }: { completed: number; pending: number }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-[3px] bg-complete-bg p-3.5 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-[3px] bg-complete-icon text-primary-dark">
            <CheckSquareIcon width={18} height={18} />
          </span>
          <span className="text-xs font-medium text-ink">Task Complete</span>
        </div>
        <p className="mt-2 flex items-baseline gap-1.5 pl-9">
          <span className="text-[22px] font-bold leading-none">{padCount(completed)}</span>
          <span className="text-[10px] text-muted">This Week</span>
        </p>
      </div>

      <div className="rounded-[3px] bg-pending-bg p-3.5 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-[3px] bg-pending-icon text-pending-ink">
            <XSquareIcon width={18} height={18} />
          </span>
          <span className="text-xs font-medium text-ink">Task Pending</span>
        </div>
        <p className="mt-2 flex items-baseline gap-1.5 pl-9">
          <span className="text-[22px] font-bold leading-none">{padCount(pending)}</span>
          <span className="text-[10px] text-muted">This Week</span>
        </p>
      </div>
    </div>
  );
}
