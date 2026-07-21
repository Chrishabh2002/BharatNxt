// Lightweight inline SVG icon set (stroke-based, on-brand). No external deps.

const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function Icon({ name, size = 28 }) {
  const p = { ...base, width: size, height: size };
  switch (name) {
    case "building":
      return (
        <svg {...p}>
          <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M15 21V9h2a2 2 0 0 1 2 2v10" />
          <path d="M8 7h2M8 11h2M8 15h2" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...p}>
          <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
          <path d="M5.5 16.5 3 21l4.5-2.5M16 5c3 1 5 4 5 4s-3 2-4 5c-1 3-4 5-4 5s-3-2-5-2-4-3-4-3 2-3 5-4c3-3 5-4 5-4s1-1 2-1Z" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...p}>
          <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z" />
          <path d="M14 8a4 4 0 0 1 0 8M10 18v2a1 1 0 0 0 1 1h1" />
        </svg>
      );
    case "chart":
      return (
        <svg {...p}>
          <path d="M3 3v18h18M7 15l3-4 3 2 4-6" />
        </svg>
      );
    case "badge":
      return (
        <svg {...p}>
          <path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
          <path d="M9 14.5 8 22l4-2 4 2-1-7.5" />
        </svg>
      );
    case "heart":
      return (
        <svg {...p}>
          <path d="M19 5.5c-1.7-1.7-4.5-1.7-6.2 0l-.8.8-.8-.8c-1.7-1.7-4.5-1.7-6.2 0s-1.7 4.5 0 6.2L12 19l7-7.3c1.7-1.7 1.7-4.5 0-6.2Z" />
        </svg>
      );
    case "target":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      );
    case "eye":
      return (
        <svg {...p}>
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "phone":
      return (
        <svg {...p}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...p}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m2 7 10 6 10-6" />
        </svg>
      );
    case "pin":
      return (
        <svg {...p}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...p}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "rupee":
      return (
        <svg {...p}>
          <path d="M7 4h10M7 8h10M16 4c0 4-3 6-7 6h-1l7 10" />
        </svg>
      );
    case "bank":
      return (
        <svg {...p}>
          <path d="M3 10 12 4l9 6M5 10v8M19 10v8M9 10v8M15 10v8M3 21h18" />
        </svg>
      );
    case "doc":
      return (
        <svg {...p}>
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" />
          <path d="M14 3v6h6M8 13h8M8 17h6" />
        </svg>
      );
    case "seed":
      return (
        <svg {...p}>
          <path d="M12 22c-4 0-8-3-8-8 4 0 8 3 8 8ZM12 22c4 0 8-3 8-8-4 0-8 3-8 8ZM12 22V8" />
          <path d="M12 8a4 4 0 0 1 4-4 4 4 0 0 1-4 4Z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "search":
      return (
        <svg {...p}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );
    case "facebook":
      return (<svg {...p} fill="currentColor" stroke="none"><path d="M13 22v-8h3l1-4h-4V8c0-1 .3-2 2-2h2V2.1C18 2 17 2 16 2c-3 0-5 1.8-5 5v3H8v4h3v8h2Z" /></svg>);
    case "whatsapp":
      return (<svg {...p} fill="currentColor" stroke="none"><path d="M20 12a8 8 0 01-11.9 7L4 20l1.05-4A8 8 0 1120 12Zm-8-6a6 6 0 00-5.1 9.15l-.6 2.2 2.27-.6A6 6 0 1012 6Zm3.3 7.6c-.2.5-1 1-1.4 1-.4.04-.4.3-2.4-.6s-3-3-3.1-3.2c-.1-.2-.7-1-.7-1.8s.4-1.2.6-1.4c.1-.1.3-.2.5-.2h.4c.1 0 .3 0 .4.4l.6 1.4c0 .1.1.3 0 .4l-.3.4c-.1.1-.2.3-.1.5s.5.9 1.1 1.4c.7.6 1.3.8 1.5.9.2 0 .3 0 .4-.1l.6-.7c.1-.2.3-.1.4-.1l1.3.7c.2.1.3.1.3.2.1.1.1.4 0 .6Z" /></svg>);
    case "linkedin":
      return (<svg {...p} fill="currentColor" stroke="none"><path d="M6.94 7A1.94 1.94 0 105 5.06 1.94 1.94 0 006.94 7ZM5.4 8.5h3v10h-3v-10Zm5 0h2.9v1.37h.04c.4-.76 1.4-1.57 2.86-1.57 3.06 0 3.63 2 3.63 4.65v5.55h-3v-4.92c0-1.18-.02-2.69-1.64-2.69s-1.89 1.28-1.89 2.6v5.01h-3v-10Z" /></svg>);
    case "instagram":
      return (<svg {...p}><path d="M12 8a4 4 0 100 8 4 4 0 000-8Zm0 6.5A2.5 2.5 0 1112 9.5a2.5 2.5 0 010 5ZM17.5 7.5h.01M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4Z" /></svg>);
    case "check":
      return (
        <svg {...p}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    default:
      return null;
  }
}
