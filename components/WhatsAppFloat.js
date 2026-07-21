export default function WhatsAppFloat({ whatsapp }) {
  if (!whatsapp) return null;
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 12a8 8 0 01-11.9 7L4 20l1.05-4A8 8 0 1120 12Zm-8-6a6 6 0 00-5.1 9.15l-.6 2.2 2.27-.6A6 6 0 1012 6Zm3.3 7.6c-.2.5-1 1-1.4 1-.4.04-.4.3-2.4-.6s-3-3-3.1-3.2c-.1-.2-.7-1-.7-1.8s.4-1.2.6-1.4c.1-.1.3-.2.5-.2h.4c.1 0 .3 0 .4.4l.6 1.4c0 .1.1.3 0 .4l-.3.4c-.1.1-.2.3-.1.5s.5.9 1.1 1.4c.7.6 1.3.8 1.5.9.2 0 .3 0 .4-.1l.6-.7c.1-.2.3-.1.4-.1l1.3.7c.2.1.3.1.3.2.1.1.1.4 0 .6Z" />
      </svg>
    </a>
  );
}
