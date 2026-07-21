import { seo, richText, navLink } from "./objects";
import {
  siteSettings,
  navigation,
  homePage,
  aboutPage,
  contactPage,
  percentBar,
} from "./singletons";
import {
  serviceGroup,
  service,
  post,
  faq,
  testimonial,
  portfolioItem,
  partner,
} from "./collections";

// Documents that exist exactly once. The Studio sidebar (sanity/structure.js)
// reads this list to render them as single "open and edit" entries.
export const SINGLETONS = [
  { type: "siteSettings", title: "Site settings", icon: "⚙️" },
  { type: "navigation", title: "Main menu", icon: "🧭" },
  { type: "homePage", title: "Home page", icon: "🏠" },
  { type: "aboutPage", title: "About page", icon: "📄" },
  { type: "contactPage", title: "Contact page", icon: "📍" },
];

export const schemaTypes = [
  // objects
  seo,
  richText,
  navLink,
  percentBar,
  // singletons
  siteSettings,
  navigation,
  homePage,
  aboutPage,
  contactPage,
  // collections
  serviceGroup,
  service,
  post,
  faq,
  testimonial,
  portfolioItem,
  partner,
];
