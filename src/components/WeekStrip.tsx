import { SHORT_DAYS, padCount, toISODate } from "@/lib/dates";

export default function WeekStrip({
  days,
  selected,
  onSelect,
}: {
  days: Date[];
  selected: string;
  onSelect: (date: string) => void;
}) {
  return (
    <div className="grid grid-cols-7 gap-1" role="tablist" aria-label="Days of the week">
      {days.map((day, i) => {
        const value = toISODate(day);
        const active = value === selected;
        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(value)}
            className={`flex flex-col items-center rounded-md py-2 transition ${
              active ? "bg-primary text-white" : "text-faint hover:bg-primary/5"
            }`}
          >
            <span className={`text-[11px] font-medium ${active ? "text-white" : "text-muted"}`}>
              {SHORT_DAYS[i]}
            </span>
            <span className="mt-1 text-[15px] font-medium">{padCount(day.getDate())}</span>
            <span className={`mt-0.5 size-1 rounded-full ${active ? "bg-white" : "bg-transparent"}`} />
          </button>
        );
      })}
    </div>
  );
}
