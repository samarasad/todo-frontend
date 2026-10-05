import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps): IconProps => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  ...props,
});

export const SearchIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.5-4.5" />
  </svg>
);

export const TrashIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 7h16" />
    <path d="M10 11v6M14 11v6" />
    <path d="M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12" />
    <path d="M9 7V4h6v3" />
  </svg>
);

export const EditIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
    <path d="M18.5 2.5a2.1 2.1 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export const PlusIcon = (props: IconProps) => (
  <svg {...base({ strokeWidth: 2.2, ...props })}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...base({ strokeWidth: 2, ...props })}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const CalendarIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);

export const ClockIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const BackIcon = (props: IconProps) => (
  <svg {...base({ strokeWidth: 2, ...props })}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const ChevronIcon = (props: IconProps) => (
  <svg {...base({ strokeWidth: 2, ...props })}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...base({ strokeWidth: 2.4, ...props })}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const CheckSquareIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
    <path d="M8 12.5l3 3 5-6" />
  </svg>
);

export const XSquareIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
    <path d="M9 9l6 6M15 9l-6 6" />
  </svg>
);
