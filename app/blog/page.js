import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { BLOG_POSTS, IMG } from "@/lib/data";

export const metadata = { title: "Blog — BharatNXT Wave" };

export default function BlogPage() {
  return (
    <main>
      <PageBanner title="Our Blog" crumb="Blog" />
      <section className="section">
        <div className="container">
          <div className="center" style={{ marginBottom: 40 }}>
            <span className="eyebrow eyebrow--c">Insights & Updates</span>
            <h2 className="h-title">
              Latest from the <span className="accent">Blog</span>
            </h2>
          </div>
          <div className="grid-3 blog-grid">
            {BLOG_POSTS.map((b, i) => (
              <Reveal key={b.title} delay={i * 70}>
                <article className="blog-card">
                  <div className="blog-card__img">
                    <img src={IMG(b.img, 480, 300)} alt={b.title} loading="lazy" />
                    <span className="blog-card__tag">{b.tag}</span>
                  </div>
                  <div className="blog-card__body">
                    <span className="blog-card__date">{b.date}</span>
                    <h3>{b.title}</h3>
                    <p>{b.excerpt}</p>
                    <a className="svc-card__link" href="#" style={{ color: "var(--orange)" }}>
                      Read More <Icon name="arrow" size={15} />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
