import Link from "next/link";
import { categories } from "@/data/categories";
import { getItemsByCategory } from "@/data/items";
import ItemCard from "@/components/ItemCard";

export const metadata = { title: "Full Catalog" };

export default function CatalogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-stone-800">Full Catalog</h1>

      <nav className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <a
            key={category.slug}
            href={`#${category.slug}`}
            className="rounded-full border border-stone-300 px-3 py-1 text-sm font-medium text-stone-600 hover:border-maroon-700 hover:text-maroon-700"
          >
            {category.name}
          </a>
        ))}
      </nav>

      {categories.map((category) => {
        const items = getItemsByCategory(category.slug);
        return (
          <section key={category.slug} id={category.slug} className="mt-12 scroll-mt-20">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xl font-bold text-stone-800">{category.name}</h2>
              <Link
                href={`/catalog/${category.slug}`}
                className="text-sm font-medium text-maroon-700 hover:underline"
              >
                View category →
              </Link>
            </div>
            <p className="mt-1 text-sm text-stone-500">{category.description}</p>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item) => (
                <ItemCard key={item.slug} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
