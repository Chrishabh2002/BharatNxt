import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import RichText from "@/components/RichText";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import { Icon } from "@/components/Icons";
import { imageUrl } from "@/sanity/lib/image";
import { formatDate } from "@/lib/format";
import { getPost, getPostSlugs, getSettings } from "@/lib/content";
import { metadataFrom } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article" };
  return metadataFrom(post.seo, {
    title: post.title,
    description: post.excerpt,
    image: post.image,
    type: "article",
  });
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPost(slug), getSettings()]);
  if (!post) notFound();

  const related = post.related || [];
  const cover = post.image || post.img;

  return (
    <main id="main">
      <PageBanner title={post.title} crumb="Blog" />

      <article className="section">
        <div className="container container--prose">
          <div className="post__meta">
            {post.tag && <span className="post__tag">{post.tag}</span>}
            <time dateTime={post.publishedAt || undefined}>
              {formatDate(post.publishedAt || post.date)}
            </time>
            {post.author && <span>by {post.author}</span>}
          </div>

          {cover && (
            <img className="post__cover" src={imageUrl(cover, 1100, 620)} alt={post.title} />
          )}

          {post.excerpt && <p className="post__lead">{post.excerpt}</p>}

          {post.body?.length > 0 ? (
            <RichText value={post.body} />
          ) : (
            <p className="post__stub">
              The full article is being written. In the meantime,{" "}
              <Link href="/contact">talk to our team</Link> about this topic directly.
            </p>
          )}

          <Link className="btn btn--ghost post__back" href="/blog">
            <Icon name="arrow" size={15} /> All articles
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <Reveal className="center">
              <span className="eyebrow eyebrow--c">Keep Reading</span>
              <h2 className="h-title">More <span className="accent">Articles</span></h2>
            </Reveal>
            <div className="grid-3 blog-grid">
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 70}>
                  <article className="blog-card">
                    <Link href={`/blog/${r.slug}`} className="blog-card__img">
                      <img src={imageUrl(r.image || r.img, 480, 300)} alt={r.title} loading="lazy" />
                      {r.tag && <span className="blog-card__tag">{r.tag}</span>}
                    </Link>
                    <div className="blog-card__body">
                      <span className="blog-card__date">
                        {formatDate(r.publishedAt || r.date)}
                      </span>
                      <h3><Link href={`/blog/${r.slug}`}>{r.title}</Link></h3>
                      <p>{r.excerpt}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt || undefined,
            author: { "@type": "Organization", name: post.author || settings.name },
            publisher: { "@type": "Organization", name: settings.name },
          }),
        }}
      />
    </main>
  );
}
