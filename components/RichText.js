import { PortableText } from "@portabletext/react";
import { imageUrl, imageAlt } from "@/sanity/lib/image";

// Maps the Studio's limited block set onto the site's existing prose styles.
// Deliberately narrow: an editor cannot introduce a layout the CSS can't hold.
const components = {
  types: {
    image: ({ value }) => (
      <figure className="prose__fig">
        <img src={imageUrl(value, 1000, 620)} alt={imageAlt(value)} loading="lazy" />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const external = /^https?:\/\//.test(value?.href || "");
      return (
        <a
          href={value?.href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h2: ({ children }) => <h2 className="prose__h2">{children}</h2>,
    h3: ({ children }) => <h3 className="prose__h3">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="prose__quote">{children}</blockquote>,
  },
};

export default function RichText({ value }) {
  if (!value?.length) return null;
  return (
    <div className="prose">
      <PortableText value={value} components={components} />
    </div>
  );
}
