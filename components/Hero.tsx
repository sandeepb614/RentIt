import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-maroon-800 to-maroon-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-marigold-300">
          Massive Creations
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-bold sm:text-4xl">
          Traditional Props, Indian Furniture &amp; Party Rentals
        </h1>
        <p className="mt-4 max-w-xl text-stone-200">
          From mandap decor and ceremony furniture for weddings, dhoti functions,
          and coming-of-age celebrations, to tents, tables, and games for any
          backyard party — browse our catalog and build a list of what you need.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/catalog"
            className="rounded-md bg-marigold-500 px-5 py-3 font-semibold text-maroon-900 transition hover:bg-marigold-400"
          >
            Browse the Catalog
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-white/40 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
