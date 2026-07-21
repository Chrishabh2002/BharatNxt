// Exact content cloned from the reference site structure,
// rebranded for BharatNXT Wave. Edit freely.

export const COMPANY = {
  name: "BharatNXT Wave",
  legalName: "BharatNXT Wave Private Limited",
  tagline: "Professional Startup Consulting",
  welcome: "Welcome to BharatNXT Wave – grow your Business with us",
  phone: "+91-8595555756",
  phoneHref: "+918595555756",
  whatsapp: "918595555756",
  email: "info@bharatnxtwave.com",
  hours: "Mon - Fri: 09:30 - 18:30",
};

export const FOOTER = {
  tagline:
    "Empowering startups and MSMEs across India with tailored consulting solutions for sustainable growth and success. Together, we simplify your journey to greatness. Connect with us today!",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ],
  offices: [
    { city: "Head Office", addr: "Office no. 102 First Floor, H-180, H Block, Sector 63, Noida, Uttar Pradesh 201309" },
    { city: "Jaipur", addr: "303, Third Floor, Shree G D Tower, Plot NO 3/99, Neel Kanth Colony, Ajmer Road, Jaipur - 302021" },
  ],
  disclaimer: [
    "BharatNXT Wave is a professional start-up consultancy based in India, dedicated to supporting emerging businesses with expert guidance tailored to modern enterprise needs. We operate solely as an independent consultancy and are not affiliated with or endorsed by any Government or Non-Government body, agency, institution, organization, or department.",
    "All service payments must be made only to the following entities: BharatNXT Wave. Payments are accepted only through Current Accounts via NEFT, IMPS, RTGS, or authorized digital payment gateways such as Cashfree, Razorpay, and Aggrepay. We do not accept payments through personal accounts or under any other name.",
  ],
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Company Profiling", href: "/services/company-profiling" },
      { label: "Legal Compliances", href: "/services/legal-compliances" },
      { label: "Fund Raising", href: "/services/fund-raising" },
      { label: "Certifications", href: "/services/certifications" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
    ],
  },
  { label: "FAQs", href: "/faqs" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

// Unsplash image helper (all IDs pre-verified to return 200)
export const IMG = (id, w = 600, h = 400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=75`;

export const IMAGES = {
  heroBg: "photo-1497215728101-856f4ea42174", // modern office interior at dusk
  coreValues: "photo-1522071820081-009f0129c71c", // team working top-down
};

// Hero auto-slideshow — all startup/business/office/consulting themed
export const HERO_IMAGES = [
  "photo-1497215728101-856f4ea42174", // modern office interior at dusk
  "photo-1486406146926-c627a92ad1ab", // corporate office building
  "photo-1600880292203-757bb62b4baf", // business meeting / handshake
  "photo-1522071820081-009f0129c71c", // startup team working
  "photo-1531973576160-7125cd663d86", // consulting discussion
];

export const HERO = {
  marquee: [
    "Welcome to BharatNXT Wave – Grow Your Business With Us",
    "India's Leading Startup Partner Delivering End-to-End Business Growth Solutions",
  ],
  eyebrow: "Professional Startup Consulting",
  sub: "BharatNXT Wave helps startups and MSMEs with company registration, funding support, compliance, website development and digital marketing solutions.",
};

export const SERVICES_INTRO = {
  eyebrow: "Grow your business with us",
  title: "We Offer Great Number of Legal Services",
};

export const SERVICES = [
  {
    key: "registration",
    title: "Business Registration",
    desc: "Company registration, GST, MSME, and legal compliance services for startups and businesses.",
    icon: "building",
  },
  {
    key: "funding",
    title: "Fund Raising",
    desc: "DPIIT recognition, government grant support, seed funding & angel funding for startups and businesses.",
    icon: "rocket",
  },
  {
    key: "marketing",
    title: "Digital Marketing",
    desc: "SEO, website & application development, social media marketing to grow startups and businesses online.",
    icon: "megaphone",
  },
  {
    key: "profiling",
    title: "Company Profiling",
    desc: "Pitch decks, DPR, fund utilization, logo designing, financial projections & investor-ready documents.",
    icon: "chart",
  },
];

export const FUNDING_INTRO = {
  eyebrow: "Our Business Partner",
  title: "Secure Government Backed",
  rotate: ["Premium Funding", "Priority Schemes", "Subsidies"],
  sub: "Fast-track your approval through our expert ecosystem.",
};

export const FUNDING = [
  { amount: "₹2 cr", title: "NAIFF Loans", note: "(Funding)", icon: "rupee" },
  { amount: "₹5 cr", title: "Collateral Free Loans", note: "(Funding)", icon: "bank" },
  { amount: "₹1 cr", title: "Startup Seed Support", note: "(Funding)", icon: "seed" },
  { amount: "₹10 cr", title: "Grant Fund", note: "(Funding)", icon: "building" },
  { amount: "₹20 L", title: "Seed Fund", note: "(Funding)", icon: "chart" },
  { amount: "₹2 cr", title: "PMEGP", note: "(Funding)", icon: "doc" },
];

export const CORE_VALUES = {
  eyebrow: "Built on trust and excellence",
  title: "Our Core Values",
  tabs: [
    {
      key: "philosophy",
      tab: "Our Philosophy",
      lead: "A dedicated firm committed to empowering startups through personalized, hand-holding partnerships.",
      points: [
        {
          title: "Empowering Startup Partnerships",
          desc: "We offer personalized hand-holding solutions to empower startups for long-term success.",
        },
        {
          title: "Innovation Excellence",
          desc: "We offer innovative, ethical solutions centered around our clients' evolving needs.",
        },
      ],
    },
    {
      key: "mission",
      tab: "Our Mission",
      lead: "To be the leading catalyst for startup success, fostering innovation and growth through dedicated support and partnership.",
      points: [
        {
          title: "Startups for Success",
          desc: "We offer comprehensive support to drive growth through personalized hand-holding solutions.",
        },
        {
          title: "Driven Growth",
          desc: "We offer strategic partnerships to catalyze innovation and long-term entrepreneurial success.",
        },
      ],
    },
    {
      key: "vision",
      tab: "Our Vision",
      lead: "To empower startups with comprehensive support, driving growth and success through personalized, hand-holding solutions.",
      points: [
        {
          title: "Business Acceleration",
          desc: "We offer personalized hand-holding solutions to drive sustainable startup growth effectively.",
        },
        {
          title: "Founder Empowerment",
          desc: "We offer strategic guidance and essential resources to empower the next generation.",
        },
      ],
    },
  ],
};

export const FOOTPRINT = {
  eyebrow: "Our Pan-India Client Footprint",
  title: "BharatNXT Wave Network: Empowering Startups Across India",
  states: [
    { name: "Maharashtra", pct: 80 },
    { name: "Gujarat", pct: 90 },
    { name: "Delhi", pct: 72 },
    { name: "Karnataka", pct: 68 },
    { name: "Rest of India", pct: 75 },
  ],
  sectors: [
    { name: "Manufacturing Sector", pct: 80 },
    { name: "Agriculture Sector", pct: 85 },
    { name: "Healthcare Sector", pct: 72 },
    { name: "IT Sector", pct: 75 },
  ],
};

export const PORTFOLIO_INTRO = {
  eyebrow: "What We Offer",
  text: "We help you see the world differently, discover opportunities you may never have imagined and achieve results that bridge what is with what can be.",
};

export const PORTFOLIO_CATS = [
  "All",
  "Company Profiling",
  "Digital Marketing",
  "Incorporations",
  "Certifications",
];

export const PORTFOLIO = [
  { title: "Letter Head Design", cat: "Company Profiling", img: "photo-1454165804606-c3d57bc86b40" },
  { title: "NGO Registration", cat: "Incorporations", img: "photo-1521737604893-d14cc237f11d" },
  { title: "Flyers Design", cat: "Company Profiling", img: "photo-1626785774573-4b799315345d" },
  { title: "Logo Designing", cat: "Company Profiling", img: "photo-1611224923853-80b023f02d71" },
  { title: "Application Development", cat: "Digital Marketing", img: "photo-1581291518857-4e27b48ff24e" },
  { title: "Social Media Management", cat: "Digital Marketing", img: "photo-1611162617474-5b21e879e113" },
  { title: "Search Engine Optimization", cat: "Digital Marketing", img: "photo-1460925895917-afdab827c52f" },
  { title: "Website Development", cat: "Digital Marketing", img: "photo-1467232004584-a241de8bcf5d" },
  { title: "Brochure Design", cat: "Company Profiling", img: "photo-1542744173-8e7e53415bb0" },
  { title: "Investor Deck", cat: "Company Profiling", img: "photo-1551434678-e076c223a692" },
  // certifications — rendered as branded badge cards
  { title: "ISO Certificate", cat: "Certifications", badge: { bg: "#ff4c0d", fg: "#fff", big: "ISO", small: "CERTIFICATION" } },
  { title: "IEC — Import Export Code", cat: "Certifications", badge: { bg: "#ffd11a", fg: "#1b2440", big: "IEC", small: "IMPORT EXPORT LICENCE" } },
  { title: "ZED Certification", cat: "Certifications", badge: { bg: "#1b8f4d", fg: "#fff", big: "ZED", small: "ZERO DEFECT ZERO EFFECT" } },
  { title: "MSME / Udyam", cat: "Certifications", badge: { bg: "#1a7efb", fg: "#fff", big: "MSME", small: "UDYAM REGISTRATION" } },
  { title: "Startup India Recognition", cat: "Certifications", badge: { bg: "#0c1019", fg: "#fff", big: "DPIIT", small: "STARTUP INDIA" } },
];

export const PORTFOLIO_INITIAL = 9;

export const STATS = [
  { value: 15, suffix: "k", label: "Happy Customers", sub: "Across PAN India", icon: "building" },
  { value: 9, suffix: "+", label: "Years of Experience", sub: "", icon: "eye" },
  { value: 85, suffix: "%", label: "Satisfaction Rate", sub: "", icon: "badge" },
];

export const TESTIMONIALS = [
  {
    name: "Rohan Mehta",
    role: "client of company",
    quote:
      "BharatNXT Wave handled our DPIIT recognition and seed funding end-to-end. The hand-holding support made all the difference for our startup.",
    seed: "rohan",
  },
  {
    name: "Priya Sharma",
    role: "client of company",
    quote:
      "From company registration to our pitch deck and website — one team did it all. Professional, fast and genuinely supportive throughout.",
    seed: "priya",
  },
  {
    name: "Imran Qureshi",
    role: "client of company",
    quote:
      "Got our collateral-free loan approved with their guidance. The compliance support alone saved us months of effort. Highly recommended.",
    seed: "imran",
  },
];

export const ABOUT_TEXT =
  "BharatNXT Wave Private Limited is a dedicated consultancy firm committed to empowering startups. We provide comprehensive support and guidance, fostering growth and innovation.";

export const HEAD_OFFICE = {
  title: "Head Office",
  label: "Visit Us Daily",
  addr: "711, 7th Floor, Times Square-I, Near Bagban Party Plot, Thaltej, Ahmedabad, Gujarat 380059.",
};

export const BRANCHES = [
  {
    city: "Ahmedabad",
    addr: "508, Abhishree Adroit, Judges Bunglow Rd, Near Mansi Circle, Vastrapur, Ahmedabad, Gujarat 380015",
  },
  {
    city: "Pune",
    addr: "City Vista, B Wing, 4th Floor, Office No 13&14, Fountain Road, Ashoka Nagar, Kharadi, Pune, Maharashtra 411014",
  },
  {
    city: "Ahmedabad",
    addr: "Office-401, Regency Plaza, Prernatirth Derasar Rd, Jodhpur Village, Ahmedabad, Gujarat 380015",
  },
];

// Partners. `logo` tries a real logo image first (Clearbit Logo API, or drop
// your own file at /public/partners/<file>); falls back to the styled wordmark.
// `logo` = real official logo (auto). To use your own / for the niche ones,
// drop a file at /public/partners/<base>.<ext> (png/svg/jpg/webp) — it wins.
// Falls back to a clean wordmark if neither loads.
// `logo` = real official logo (auto). For the niche ones, drop your file at
// /public/partners/<base>.<ext> (png/svg/jpg/webp) — it shows automatically.
// Until then a clean wordmark is shown.
export const PARTNERS = [
  { name: "HDFC BANK", sub: "We understand your world", color: "#004c8f", base: "/partners/hdfc", logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg" },
  { name: "Razorpay", sub: "", color: "#3395ff", base: "/partners/razorpay", logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" },
  { name: "Cashfree", sub: "Payments", color: "#5a2d82", base: "/partners/cashfree", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Cashfree_logo.png" },
  { name: "NIFientreC", sub: "Incubation & Entrepreneurship", color: "#1a7d3c", base: "/partners/nifientrec" },
  { name: "TATA Tele", sub: "Business Services", color: "#1a3b8b", base: "/partners/tata", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Tata_Tele_Logo.svg" },
  { name: "IMI Kolkata", sub: "Intl. Management Institute", color: "#16245c", base: "/partners/imi" },
  { name: "PDEU IIC", sub: "Innovation & Incubation Centre", color: "#1f7a3d", base: "/partners/pdeu" },
];

// ---------------- Service detail pages (by slug) ----------------
export const SERVICE_DETAILS = {
  "company-profiling": {
    title: "Company Profiling",
    icon: "chart",
    img: "photo-1551434678-e076c223a692",
    intro:
      "Investor-ready profiling that tells your startup's story with numbers and design — pitch decks, DPRs, financial projections and brand identity.",
    points: [
      "Investor pitch decks & business plans",
      "DPR (Detailed Project Report) preparation",
      "Financial projections & fund utilization",
      "Logo designing & complete brand identity",
    ],
  },
  "legal-compliances": {
    title: "Legal Compliances",
    icon: "doc",
    img: "photo-1454165804606-c3d57bc86b40",
    intro:
      "End-to-end legal and statutory compliance so you never miss a filing — from incorporation to ongoing ROC, GST and tax compliance.",
    points: [
      "Company / LLP / firm incorporation",
      "GST, MSME & Udyam registration",
      "ROC annual filings & secretarial compliance",
      "Trademark, agreements & legal documentation",
    ],
  },
  "fund-raising": {
    title: "Fund Raising",
    icon: "rocket",
    img: "photo-1559526324-4b87b5e36e44",
    intro:
      "We help you access the right government schemes, grants, loans and private capital — and manage the full application lifecycle.",
    points: [
      "DPIIT recognition & Startup India benefits",
      "Government grants & seed fund schemes (SISFS)",
      "Collateral-free & CGTMSE backed loans",
      "Angel & seed investor connections",
    ],
  },
  certifications: {
    title: "Certifications",
    icon: "badge",
    img: "photo-1450101499163-c8848c66ca85",
    intro:
      "Get every certification your business needs to qualify for tenders, schemes and credibility — handled end to end.",
    points: [
      "ISO 9001 / 14001 certifications",
      "ZED (Zero Defect Zero Effect) certification",
      "IEC — Import Export Code licence",
      "Startup India & MSME recognition",
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    icon: "megaphone",
    img: "photo-1460925895917-afdab827c52f",
    intro:
      "Grow your startup online with performance-driven digital marketing — websites, apps, SEO and social media that convert.",
    points: [
      "Website & application development",
      "SEO & Google ranking optimization",
      "Social media management & ads",
      "Content, creatives & brand campaigns",
    ],
  },
};

export const FAQS = [
  {
    q: "What services does BharatNXT Wave provide?",
    a: "We provide end-to-end startup solutions — company registration, legal compliance, fund raising, certifications, company profiling and digital marketing.",
  },
  {
    q: "Can you help my startup raise government funding?",
    a: "Yes. We help with DPIIT recognition, government grants, seed fund schemes (SISFS), collateral-free loans and angel/seed investor connections, and manage the full application process.",
  },
  {
    q: "How long does company registration take?",
    a: "A Private Limited or LLP registration typically takes 7–12 working days once all documents are ready. We handle the entire filing for you.",
  },
  {
    q: "Do you work with startups outside Gujarat?",
    a: "Absolutely. We have a pan-India footprint with clients across Maharashtra, Delhi, Karnataka and more, supported remotely and through our branch offices.",
  },
  {
    q: "Which certifications can you help us obtain?",
    a: "ISO, ZED (Zero Defect Zero Effect), IEC (Import Export Code), MSME/Udyam, Startup India recognition and other compliance certifications.",
  },
  {
    q: "How do I get started?",
    a: "Just fill the consultation form or call us. Our team will understand your requirement and map the right path within 24 hours.",
  },
];

export const BLOG_POSTS = [
  {
    title: "How to Get DPIIT Recognition for Your Startup in 2026",
    excerpt:
      "A step-by-step guide to qualifying for Startup India benefits, tax exemptions and government funding through DPIIT recognition.",
    img: "photo-1559526324-4b87b5e36e44",
    tag: "Fund Raising",
    date: "Jun 18, 2026",
  },
  {
    title: "Collateral-Free Loans: Everything MSMEs Should Know",
    excerpt:
      "Understand CGTMSE-backed credit, eligibility and how to apply for collateral-free loans up to ₹5 crore for your business.",
    img: "photo-1454165804606-c3d57bc86b40",
    tag: "Funding",
    date: "Jun 10, 2026",
  },
  {
    title: "Why Every Startup Needs an Investor-Ready Pitch Deck",
    excerpt:
      "What investors actually look for in a pitch deck — structure, financials and storytelling that gets you funded.",
    img: "photo-1551434678-e076c223a692",
    tag: "Company Profiling",
    date: "Jun 2, 2026",
  },
  {
    title: "ISO & ZED Certification: A Complete Beginner's Guide",
    excerpt:
      "How certifications boost credibility, unlock tenders and qualify you for government schemes — explained simply.",
    img: "photo-1450101499163-c8848c66ca85",
    tag: "Certifications",
    date: "May 24, 2026",
  },
  {
    title: "SEO for Startups: Rank Higher Without Burning Budget",
    excerpt:
      "Practical, affordable SEO tactics every early-stage startup can use to grow organic traffic and leads.",
    img: "photo-1460925895917-afdab827c52f",
    tag: "Digital Marketing",
    date: "May 15, 2026",
  },
  {
    title: "GST & ROC Compliance Calendar Every Founder Needs",
    excerpt:
      "Never miss a filing again. Here are the key compliance deadlines and how to stay penalty-free year-round.",
    img: "photo-1467232004584-a241de8bcf5d",
    tag: "Legal",
    date: "May 6, 2026",
  },
];
