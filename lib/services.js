// ============================================================
// All BharatNXT Wave services — grouped mega-menu + per-service pages.
// Data-driven: one dynamic route renders all of these as STATIC pages
// (generateStaticParams) so navigation is instant and never hangs.
// ============================================================

export function slugify(s) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[()/.]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// raw groups exactly as in the services mega-menu
const GROUPS = [
  {
    group: "Company Registration & Compliance",
    icon: "building",
    kind: "compliance",
    imgs: [
      "photo-1497215728101-856f4ea42174",
      "photo-1556761175-b413da4baf72",
      "photo-1454165804606-c3d57bc86b40",
      "photo-1521737604893-d14cc237f11d",
      "photo-1600880292203-757bb62b4baf",
      "photo-1531973576160-7125cd663d86",
      "photo-1522071820081-009f0129c71c",
    ],
    items: [
      "Private Limited Company Registration",
      "Limited Liability Partnership (LLP) Registration",
      "One Person Company (OPC) Registration",
      "Section 8 Company (NGO) Registration",
      "ROF Registration",
      "Nidhi Company Registration",
      "12A & 80G Registration",
    ],
  },
  {
    group: "Certificate & Registrations",
    icon: "badge",
    kind: "certificate",
    imgs: [
      "photo-1450101499163-c8848c66ca85",
      "photo-1454165804606-c3d57bc86b40",
      "photo-1556742049-0cfed4f6a45d",
      "photo-1542744173-8e7e53415bb0",
      "photo-1600585154340-be6161a56a0c",
      "photo-1589758438368-0ad531db3366",
      "photo-1531973576160-7125cd663d86",
    ],
    items: [
      "Start-Up India Certificate",
      "Tax Exemption Certificate",
      "GST Certificate",
      "GEM Registration",
      "Fssai License",
      "ISO Certification",
      "Trademark Registration",
      "NSIC Registration",
      "ZED Certification",
      "IEC Code (Import Export Code)",
    ],
  },
  {
    group: "Government Grant",
    icon: "rupee",
    kind: "grant",
    imgs: [
      "photo-1579621970795-87facc2f976d",
      "photo-1565514020179-026b92b84bb6",
      "photo-1638913662252-70efce1e60a7",
      "photo-1559067096-49ebca3406aa",
      "photo-1554224155-6726b3ff858f",
      "photo-1600585154340-be6161a56a0c",
      "photo-1559526324-4b87b5e36e44",
    ],
    items: [
      "Seed Fund India",
      "TIDE 2.0",
      "Startup Support Grant",
      "RKVY-RAFTAAR",
      "Healthcare Innovation Grant",
      "Fund for Agri",
      "Empowering Women Entrepreneurs",
      "NGO Growth Fund",
    ],
  },
  {
    group: "Private Lending",
    icon: "bank",
    kind: "lending",
    imgs: [
      "photo-1591033594798-33227a05780d",
      "photo-1543286386-2e659306cd6c",
      "photo-1556155092-490a1ba16284",
      "photo-1664575602554-2087b04935a5",
      "photo-1664575599736-c5197c684128",
      "photo-1579621970795-87facc2f976d",
      "photo-1565514020179-026b92b84bb6",
    ],
    items: [
      "MSME Loan",
      "CGTMSE Loan",
      "MUDRA Loan",
      "PMFME",
      "Venture Capital",
      "NAIFF",
      "PMEGP",
      "Financial Assistance for SC & OBC",
      "Equity Elevator",
      "Non-Banking Financial Company (NBFC)",
      "Loan for Dairy Business (AHIDF)",
    ],
  },
  {
    group: "Digital Marketing",
    icon: "megaphone",
    kind: "marketing",
    imgs: [
      "photo-1460925895917-afdab827c52f",
      "photo-1467232004584-a241de8bcf5d",
      "photo-1581291518857-4e27b48ff24e",
      "photo-1611162617474-5b21e879e113",
      "photo-1611224923853-80b023f02d71",
      "photo-1626785774573-4b799315345d",
      "photo-1557804506-669a67965ba0",
    ],
    items: [
      "Website Development",
      "Digital Marketing",
      "Logo Design",
      "Search Engine Optimization (SEO)",
      "Social Media Marketing",
      "Whatsapp Marketing",
      "Brand Strategy",
    ],
  },
];

// content templates per kind
const TEMPLATES = {
  compliance: {
    desc: (t) => `Hassle-free ${t} handled end to end by experts.`,
    intro: (t) =>
      `${t} done right, the first time. BharatNXT Wave manages your ${t.toLowerCase()} from start to finish — documentation, drafting, government portal filing and approvals — so you stay fully compliant while you focus on growing your business.`,
    points: [
      "Complete documentation & drafting",
      "Government portal filing & follow-up",
      "Expert-reviewed, error-free submission",
      "Ongoing compliance reminders & support",
    ],
  },
  certificate: {
    desc: (t) => `Get your ${t} quickly, without the paperwork hassle.`,
    intro: (t) =>
      `Get your ${t} without the paperwork hassle. Our experts prepare, file and follow up on your ${t.toLowerCase()} so you receive it fast and stay eligible for tenders, government schemes and added business credibility.`,
    points: [
      "Eligibility check & document preparation",
      "Application filing & department liaison",
      "Fast turnaround with live status tracking",
      "Valid certificate + timely renewal support",
    ],
  },
  grant: {
    desc: (t) => `Unlock ${t} with an expert-built, fundable application.`,
    intro: (t) =>
      `Unlock the ${t} for your startup. We assess your eligibility, build a strong fundable application and pitch, and manage the entire process end to end to maximise your chances of approval and disbursement.`,
    points: [
      "Scheme eligibility assessment",
      "Fundable application & pitch preparation",
      "End-to-end submission & department follow-up",
      "Dedicated advisor till disbursement",
    ],
  },
  lending: {
    desc: (t) => `Access ${t} on the best terms, faster.`,
    intro: (t) =>
      `Access ${t} on the best possible terms. BharatNXT Wave connects you to the right lenders, prepares your financials and project report, and handles the entire application so funds reach your business faster.`,
    points: [
      "Loan eligibility check & lender matching",
      "Financials & project report (DPR) preparation",
      "Application filing & bank coordination",
      "Support right up to sanction & disbursement",
    ],
  },
  marketing: {
    desc: (t) => `Grow faster with professional ${t} that converts.`,
    intro: (t) =>
      `Grow faster with professional ${t}. Our team plans, designs, builds and runs ${t.toLowerCase()} that turns attention into customers and revenue — with clear reporting every step of the way.`,
    points: [
      "Strategy tailored to your business goals",
      "Professional design & development",
      "Data-driven execution & optimization",
      "Monthly reporting & growth insights",
    ],
  },
};

// build the menu (with slugs) and the per-page detail map
export const SERVICE_MENU = GROUPS.map((g) => ({
  group: g.group,
  icon: g.icon,
  items: g.items.map((title) => ({ title, slug: slugify(title) })),
}));

export const SERVICE_PAGES = {};
GROUPS.forEach((g) => {
  const tpl = TEMPLATES[g.kind];
  g.items.forEach((title, i) => {
    const slug = slugify(title);
    SERVICE_PAGES[slug] = {
      title,
      group: g.group,
      icon: g.icon,
      img: g.imgs[i % g.imgs.length],
      desc: tpl.desc(title),
      intro: tpl.intro(title),
      points: tpl.points,
    };
  });
});

export const ALL_SERVICE_SLUGS = Object.keys(SERVICE_PAGES);

// other services in the same group (for "related" links)
export function relatedServices(slug, n = 6) {
  const page = SERVICE_PAGES[slug];
  if (!page) return [];
  return ALL_SERVICE_SLUGS
    .filter((s) => s !== slug && SERVICE_PAGES[s].group === page.group)
    .slice(0, n)
    .map((s) => ({ slug: s, ...SERVICE_PAGES[s] }));
}
