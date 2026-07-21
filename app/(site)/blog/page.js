import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { imageUrl } from "@/sanity/lib/image";
import { formatDate } from "@/lib/format";
import { getPosts } from "@/lib/content";

export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main id="main">
      <PageBanner title="Our Blog" crumb="Blog" />
      <section className="section">
        <div className="container">
          <div className="center" style={{ marginBottom: 40 }}>
            <span className="eyebrow eyebrow--c">Insights &amp; Updates</span>
            <h2 className="h-title">
              Latest from the <span className="accent">Blog</span>
            </h2>
          </div>

          {posts.length === 0 ? (
            <p className="lead center">No posts published yet — check back soon.</p>
          ) : (
            <div className="grid-3 blog-grid">
              {posts.map((b, i) => (
                <Reveal key={b.slug} delay={i * 70}>
                  <article className="blog-card">
                    <Link href={`/blog/${b.slug}`} className="blog-card__img">
                      <img
                        src={imageUrl(b.image || b.img, 480, 300)}
                        alt={b.title}
                        loading="lazy"
                      />
                      {b.tag && <span className="blog-card__tag">{b.tag}</span>}
                    </Link>
                    <div className="blog-card__body">
                      <span className="blog-card__date">{formatDate(b.publishedAt || b.date)}</span>
                      <h3>
                        <Link href={`/blog/${b.slug}`}>{b.title}</Link>
                      </h3>
                      <p>{b.excerpt}</p>
                      <Link
                        className="svc-card__link"
                        href={`/blog/${b.slug}`}
                        style={{ color: "var(--orange)" }}
                      >
                        Read More <Icon name="arrow" size={15} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
