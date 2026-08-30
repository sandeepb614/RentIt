import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getItemsByCategory } from "@/data/items";
import ItemCard from "@/components/ItemCard";

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);
  return { title: category ? category.name : "Category" };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategoryBySlug(params.category);
  if (!category) {
    notFound();
  }

  const items = getItemsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-stone-800">{category.name}</h1>
      <p className="mt-2 max-w-2xl text-stone-500">{category.description}</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <ItemCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
