export default function WeeklyProgress({ completed, total }: { completed: number; total: number }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section aria-label="Weekly progress">
      <h2 className="text-base font-semibold">Weekly Progress</h2>
      <div
        className="mt-3 h-5 w-full bg-primary-soft"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className="h-full bg-primary-dark transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
}
