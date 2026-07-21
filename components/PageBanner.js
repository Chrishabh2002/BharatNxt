import Link from "next/link";

// Inner-page hero banner with breadcrumb (used on About, Services, FAQs, etc.)
export default function PageBanner({ title, crumb }) {
  return (
    <section className="banner">
      <div className="banner__shade" />
      <div className="container banner__inner">
        <h1 className="banner__title">{title}</h1>
        <nav className="banner__crumb">
          <Link href="/">Home</Link>
          <span>›</span>
          <span className="banner__cur">{crumb || title}</span>
        </nav>
      </div>
    </section>
  );
}
