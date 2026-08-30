import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ItemCard from "@/components/ItemCard";
import { getFeaturedItems } from "@/data/items";

export default function HomePage() {
  const featured = getFeaturedItems();

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-stone-800">Browse by Category</h2>
        <p className="mt-1 text-stone-500">
          Props &amp; Indian Furniture is our specialty — plus everything else you need for a full event.
        </p>
        <div className="mt-6">
          <CategoryGrid />
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-stone-800">Featured Rentals</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((item) => (
              <ItemCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
