# Editing the website

The website content lives in a **Content Studio** — a private admin panel, a bit
like WordPress. You log in, change the words or pictures, press **Publish**, and
the live site updates within a minute. No code, no deploys, nothing to break.

- **Studio address:** `https://your-site.netlify.app/studio`
- **Who can get in:** only people you invite (see *Adding a teammate*)

---

## Part 1 — One-time setup (developer)

This section is done once. Skip to Part 2 if the Studio is already live.

### 1. Create the Sanity project

```bash
npx sanity login          # opens a browser; sign in with Google/GitHub
npx sanity init --env     # choose "Create new project", dataset: production
```

`init --env` writes `.env.local` for you with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. Import the current website content

Create a write token at **sanity.io/manage → your project → API → Tokens**,
permission **Editor**. Add it to `.env.local`:

```
SANITY_API_WRITE_TOKEN=sk...
```

Then:

```bash
npm run seed
```

This copies every service, blog post, FAQ, testimonial, address and phone
number that is on the site today into the CMS, and uploads all the images. It
takes a few minutes because of the images. Add `-- --skip-images` to do a fast
run without them.

The script only *creates* — running it twice will not overwrite anything an
editor has since changed. Use `npm run seed -- --force` if you deliberately want
to reset everything back to the built-in content.

### 3. Tell Netlify about the project

**Netlify → Site configuration → Environment variables**, add:

| Key | Value |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | the id from step 1 |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-real-domain.com` |

`SANITY_API_WRITE_TOKEN` is **not** needed in Netlify — it is only for the local
import script. Do not add it there.

Redeploy. `/studio` is now live.

### 4. Allow the Studio to load

**sanity.io/manage → API → CORS origins → Add origin**: your Netlify URL
(and your custom domain), with **Allow credentials** ticked.

---

## Part 2 — Day-to-day editing

Go to `/studio` and sign in. The left sidebar is the whole website:

| Sidebar item | What it controls |
| --- | --- |
| **Site settings** | Company name, phone, WhatsApp, email, opening hours, footer text, office addresses, legal disclaimer |
| **Main menu** | The links across the top of every page, including the Services dropdown |
| **Home page** | The hero slideshow, every section heading, the funding cards, core values tabs, the percentage bars, the counting numbers |
| **About page** / **Contact page** | Those two pages, plus the branch address list and Google Maps embed |
| **Services** | All service pages, grouped by category |
| **Blog posts** | Articles |
| **FAQs**, **Testimonials**, **Portfolio**, **Partners** | The lists those names suggest |

### Writing a blog post

1. **Blog posts → + Create**
2. Fill in the title, then click **Generate** next to *Web address*
3. Write a short *Summary* — this is the text on the blog listing card and in
   Google results
4. Upload a *Cover image* and always fill in its *Alt text*
5. Write the article in the *Article* field. The toolbar gives you headings,
   bold, lists, links, quotes and images
6. Press **Publish** (bottom right)

The post appears at `/blog/your-web-address` within a minute.

### Adding a service

1. **Services → All services → + Create**
2. Title, then **Generate** the web address
3. Pick a *Category* — this decides which column it lands in inside the
   Services dropdown menu
4. Fill in the short description, intro paragraph and the "What's included"
   bullets
5. **Publish**

The new service is automatically added to the dropdown menu, the services page,
the "related services" links, and the dropdown on every contact form.

### Changing the phone number

**Site settings → Contact details.** Change *both* "Phone number (as displayed)"
and "Phone number (for dialling)" — the first is what visitors read, the second
is what their phone actually dials. Publish. It updates in the top bar, the
footer and every contact form at once.

### A few rules worth knowing

- **Publish is what makes it live.** Saving a draft changes nothing publicly.
- **Don't change a web address after a page is live** — old links and Google
  results will break. Everything else is safe to edit freely.
- **Always fill in Alt text on images.** It is what blind visitors hear and
  what Google reads.
- **Changes take up to a minute** to show on the live site. Refresh once.
- **Deleting is permanent.** Sanity keeps a history, but recovering means
  calling a developer.

### Adding a teammate

**sanity.io/manage → your project → Members → Invite**. Give them the
**Editor** role — that lets them write and publish but not delete the project
or change billing.

---

## If something looks wrong

**The site shows old content after publishing.** Wait a minute and hard-refresh
(`Ctrl+Shift+R`). The site caches content for up to 60 seconds by design.

**A whole section disappeared.** You probably emptied a list. Put one item back
and publish; the section returns.

**/studio shows "isn't connected yet".** The environment variables are missing
in Netlify — see Part 1 step 3.

**Something is badly broken.** The site is built so that if the CMS is
unreachable it silently falls back to its original built-in content rather than
showing an error. So a broken Studio never takes the website down — it just
means edits stop appearing until it is fixed.
