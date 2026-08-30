# RentIt — Massive Creations Party & Props Rental Catalog

A simple, no-checkout rental catalog site: browse props, Indian
furniture/ceremony decor, and general party rentals, add items to a list,
and submit one request to get a quote. Built with Next.js, TypeScript, and
Tailwind CSS, deployed for free on Vercel (keeps this repo private).

**New to this project or to GitHub? Read [`GUIDE.md`](./GUIDE.md)** — a
beginner-friendly, chapter-by-chapter walkthrough of everything in this
repo, including how GitHub itself works.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Adding or editing rental items

Edit `data/items.ts` — see Chapter 3 of `GUIDE.md` for details.

## Adding real photos

Drop image files under `public/images/<category-slug>/<item-slug>.jpg`
and set the matching item's `image` field in `data/items.ts` to that path,
e.g. `/images/tents-canopies/20x20-frame-tent.jpg`. Items without an
`image` set automatically show a category-colored placeholder instead of a
broken image.

## Connecting the inquiry form to real email

See Chapter 6 of `GUIDE.md` — in short, create a free form at
[formspree.io](https://formspree.io) and set `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
(locally in `.env.local`, and in production as a Vercel project
environment variable).

## Deployment

Hosted on [Vercel](https://vercel.com), connected to this GitHub repo.
Once connected, every push to the deployed branch automatically triggers
a new build and deploy — no manual upload step. See Chapter 7 of
`GUIDE.md` for the one-time setup.
