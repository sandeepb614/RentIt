# Building Massive Creations: A Beginner's Guide

This is a chapter-by-chapter walkthrough of the RentIt project — a catalog
website for a party and Indian furniture/props rental business. It assumes
you've never used GitHub before. Each chapter ends with a small
"try it yourself" exercise so the ideas stick.

---

## Chapter 1: What GitHub actually is

**GitHub** is a website that hosts **Git repositories**. Git is a tool that
tracks changes to a folder of files over time — think of it like an
infinitely detailed "undo history" that multiple people can share.

A few words you'll see constantly:

- **Repository (repo)** — the project's folder, plus its entire history of
  changes. This project's repo is `sandeepb614/RentIt`.
- **Commit** — a saved snapshot of changes, with a short message describing
  what changed (e.g. "Add catalog data model"). Commits are the "save
  points" of the project.
- **Branch** — a parallel line of work. The main line is usually called
  `main`. This project's website was built on a separate branch called
  `claude/party-rental-website-n8ah6w`, so the work could happen without
  touching `main` until it's ready.
- **Push** — uploading your local commits to GitHub so they're backed up
  and visible to others (and, in this project, so they trigger the
  automatic deployment described in Chapter 7).
- **Pull request (PR)** — a request to merge one branch's changes into
  another (usually into `main`), so someone can review the changes first.

You don't need to memorize these — you'll see each one in action as this
guide goes on.

**Try it yourself:** Open `https://github.com/sandeepb614/RentIt` in a
browser and click the "commits" link near the top of the file list. You'll
see the actual history of every change made while building this project.

---

## Chapter 2: The tools this project uses

- **Next.js** — a framework built on top of **React** for building
  websites. It handles routing (turning URLs like `/catalog/tents-canopies`
  into a page), and can turn the whole site into plain HTML/CSS/JS files
  ("static export") that any web host can serve for free — which is exactly
  what Chapter 7 does with GitHub Pages.
- **React** — a JavaScript library for building UI out of reusable pieces
  called **components**. Every file in `components/` and `app/` in this
  project is a React component — a function that returns some HTML-like
  markup (called JSX).
- **TypeScript** — JavaScript with an extra layer that checks your code for
  certain mistakes (like passing the wrong type of value to a function)
  before you even run it. Every `.ts`/`.tsx` file in this project is
  TypeScript.
- **Tailwind CSS** — instead of writing separate CSS files, you style
  elements by adding utility class names directly, e.g.
  `className="rounded-lg bg-maroon-700 px-4 py-2"` means "rounded corners,
  maroon background, some horizontal and vertical padding."

**Why this combination?** It's a genuinely small, free, and fast setup for
a catalog site with no server or database — but it's also the same
foundation a much bigger e-commerce site would use, so nothing here needs
to be thrown away if the business grows.

**Try it yourself:** Open `components/Hero.tsx` and change the headline
text on the homepage. Save the file, and if `npm run dev` is running
(Chapter 4), your browser will update automatically.

---

## Chapter 3: The catalog data — the file you'll edit most

Two files hold the entire product catalog:

- **`data/categories.ts`** — the 5 categories: Props & Indian Furniture,
  Tents & Canopies, Tables & Chairs, Linens & Decor, and Bounce Houses &
  Games. Each has a `slug` (used in URLs), a `name`, a `description`, and
  an `icon` key.
- **`data/items.ts`** — every rental item. Each item is an object like:

  ```ts
  {
    slug: "wooden-jhula-swing",
    name: "Wooden Jhula (Hanging Swing)",
    category: "props-indian-furniture",
    subcategory: "Traditional Furniture",
    price: 180,
    priceUnit: "per event",
    description: "A carved wooden hanging swing...",
    featured: true,
  }
```

**To add a new item:** copy an existing object in the `items` array, give
it a unique `slug`, and fill in its details. Save the file — that's it, no
other file needs to change. The `slug` becomes part of its URL:
`/catalog/props-indian-furniture/wooden-jhula-swing`.

**To remove an item:** delete its object from the array.

**To change a price:** edit the `price` number.

At the bottom of `data/items.ts` are four small functions
(`getAllItems`, `getItemsByCategory`, `getItemBySlug`, `getFeaturedItems`).
Every page in the site calls these functions instead of reading the
`items` array directly. That's deliberate: if this business ever needs a
real database instead of a hand-edited file, only these four functions
need to change — every page that uses them keeps working exactly as is.

**Try it yourself:** Add a new item to the `props-indian-furniture`
category in `data/items.ts` (anything — a "Traditional Brass Diya Set" at
$25, say). Restart `npm run dev` and find it on the category page.

---

## Chapter 4: How the pages fit together

Next.js turns the folder structure under `app/` directly into URLs. This
project's pages:

| File | URL | What it shows |
|---|---|---|
| `app/page.tsx` | `/` | Homepage: hero banner, category grid, featured items |
| `app/catalog/page.tsx` | `/catalog` | Every category and its items, one long scrollable page |
| `app/catalog/[category]/page.tsx` | `/catalog/tents-canopies` | One category's items |
| `app/catalog/[category]/[item]/page.tsx` | `/catalog/tents-canopies/20x20-frame-tent` | One item's full detail |
| `app/list/page.tsx` | `/list` | The visitor's request list (Chapter 5) |
| `app/inquire/page.tsx` | `/inquire` | The quote request form (Chapter 6) |
| `app/contact/page.tsx` | `/contact` | Business contact info |
| `app/not-found.tsx` | any bad URL | The 404 "page not found" page |

Square brackets like `[category]` mean "this part of the URL is a
variable" — Next.js calls this a **dynamic route**. The code in
`generateStaticParams()` at the top of those files tells Next.js exactly
which category/item combinations exist, so it can pre-build a real HTML
file for each one during `npm run build`.

The visual pieces those pages are built from live in `components/`
(`Header`, `Footer`, `Hero`, `CategoryGrid`, `ItemCard`, and so on) — small,
reusable building blocks, the way this project uses React.

**Try it yourself:** Visit `/catalog/not-a-real-category` locally and
confirm you land on the 404 page instead of a crash — that's the
`notFound()` call in `app/catalog/[category]/page.tsx` at work.

---

## Chapter 5: The request list (instead of a shopping cart)

This site deliberately has **no checkout** — nothing is purchased online.
Instead, a visitor can add several items to a list while browsing, then
submit that whole list as one inquiry.

- **`lib/RequestListContext.tsx`** holds the list of `{ slug, quantity }`
  entries using React's **Context** (a way to share data across many
  components without passing it through every single one by hand), and
  saves it to the browser's `localStorage` so the list survives a page
  reload.
- **`components/AddToListButton.tsx`** is the button on every item card and
  detail page.
- **`components/CartIcon.tsx`** is the "My List" link in the header, with a
  live count badge.
- **`app/list/page.tsx`** is where a visitor reviews their list — adjusts
  quantities, removes items, sees an estimated total (just for planning —
  nothing is charged), and clicks through to the request form.

**Try it yourself:** Open the site, add 2–3 items from different
categories, then open `/list` in a new browser tab (or reload) — the list
is still there, because it was saved to `localStorage`.

---

## Chapter 6: The inquiry form and Formspree

`components/InquiryForm.tsx` is the only part of this site that talks to
anything outside the browser. Since there's no custom backend/server to
maintain, it sends the form (name, email, event date, message, plus the
full list of requested items) straight to
**[Formspree](https://formspree.io)**, a free third-party service that
turns a form submission into an email.

**How to wire up real email delivery:**
1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form. Formspree gives you an endpoint URL like
   `https://formspree.io/f/abcd1234`.
3. Set that URL as the `NEXT_PUBLIC_FORMSPREE_ENDPOINT` value — locally in
   a `.env.local` file (copy `.env.local.example` and fill it in), or in
   production as an **environment variable** in your Vercel project
   settings (Project → Settings → Environment Variables), which Chapter 7
   covers.

**What happens before you do that?** The form still works end-to-end for
visitors — but instead of emailing you, it logs the submission to the
browser's developer console and shows the same "Request sent!" success
message. That's a deliberate fallback (look for `isConfigured` in
`InquiryForm.tsx`) so the site is fully demoable and launchable before you
create any account.

**Try it yourself:** Submit a test inquiry, then open your browser's
developer console (F12) — you'll see the `[dev mode]` log showing exactly
what would have been emailed once Formspree is connected.

---

## Chapter 7: Deploying to Vercel

**Vercel** is a hosting company built by the same people who make Next.js,
and its free ("Hobby") tier is a natural fit here: it builds and hosts a
Next.js app for free, and — unlike GitHub Pages — it can deploy from a
**private** repository without requiring you to make your code public.
That's why this project uses Vercel: the `RentIt` repo stays private.

**One-time setup (only you can do this — it needs your own account):**
1. Go to [vercel.com](https://vercel.com) and sign up free (you can sign
   in directly with your GitHub account).
2. Click "Add New… → Project," then "Import" `sandeepb614/RentIt`.
3. When asked which branch to deploy, choose
   `claude/party-rental-website-n8ah6w` (or `main`, once this branch is
   merged into it).
4. Before the first deploy, add the environment variable
   `NEXT_PUBLIC_FORMSPREE_ENDPOINT` under Project → Settings →
   Environment Variables (Chapter 6 explains what value to put there).
5. Click Deploy. Vercel builds the project and gives you a live URL that
   looks like `https://rent-it-xxxx.vercel.app`.

**This is CI/CD too** (Continuous Integration / Continuous Deployment) —
once the project is connected, Vercel watches the repo automatically:
every push to the connected branch triggers a new build and deploy with no
extra steps. Pushes to *other* branches (or a pull request) even get their
own temporary "preview" URL, so you can see a change live before it goes
to the main site.

**To check on a deployment:** open your project's dashboard on
vercel.com — every push shows up as a "Deployment" with a build log; a
checkmark means it went live, an X means the build failed (click in to
see exactly why).

**To update the live site after making an edit:** commit your change and
push it (Chapter 1's vocabulary) — Vercel picks it up automatically within
about a minute, no separate deploy step needed.

**Try it yourself:** After your first deploy, edit an item's price in
`data/items.ts`, commit, and push. Watch your Vercel dashboard show a new
deployment start and finish, then refresh the live site.

---

## Chapter 8: What to do next

This project is intentionally scoped to a catalog + request-list only —
no payments, no bookings, no admin login. Natural next steps, whenever
you're ready, none of which require rewriting what's here:

- **A real database** — replace the four functions at the bottom of
  `data/items.ts` with calls to a database (e.g. Postgres via a service
  like Supabase or Neon) instead of reading a hardcoded array. No page
  component needs to change, because they only ever call those functions.
- **An admin page** — a password-protected page that edits the same
  underlying data, instead of you hand-editing `data/items.ts` in code.
- **Real photos** — drop image files into `/public/images/<category-slug>/`
  and set the matching item's `image` field in `data/items.ts` to that
  path (e.g. `/images/tents-canopies/20x20-frame-tent.jpg`). Until then,
  `components/PlaceholderImage.tsx` automatically shows a colored
  category tile instead, so the site never looks broken.
- **Booking calendar / availability** — track which items are reserved for
  which dates.
- **Payments** — actual checkout, deposits, or online payment collection.

None of these are built yet, by design — but the data model, the page
structure, and the deployment pipeline you now understand are the
foundation each of them would build on.

---

*Business details (phone, email, address) throughout the site are
placeholders in `lib/businessInfo.ts` — update that one file with your
real information whenever you're ready.*
