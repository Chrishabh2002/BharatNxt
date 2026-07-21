// The Studio is a full application in its own right: it renders its own chrome
// and expects to own the page. So it gets a root layout of its own, separate
// from the marketing site's — no header, no footer, no globals.css.
export const metadata = {
  title: "Content Studio — BharatNXT Wave",
  robots: { index: false, follow: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function StudioRootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
