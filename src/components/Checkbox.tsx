import { CheckIcon } from "./Icons";

export default function Checkbox({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className="flex size-5 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] border-primary/80 bg-white text-primary transition disabled:opacity-50"
    >
      {checked && <CheckIcon width={14} height={14} />}
    </button>
  );
}
