import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllItems, getItemBySlug } from "@/data/items";
import { getCategoryBySlug } from "@/data/categories";
import PlaceholderImage from "@/components/PlaceholderImage";
import AddToListButton from "@/components/AddToListButton";

export function generateStaticParams() {
  return getAllItems().map((item) => ({
    category: item.category,
    item: item.slug,
  }));
}

export function generateMetadata({ params }: { params: { item: string } }) {
  const item = getItemBySlug(params.item);
  return { title: item ? item.name : "Item" };
}

export default function ItemPage({
  params,
}: {
  params: { category: string; item: string };
}) {
  const item = getItemBySlug(params.item);
  const category = getCategoryBySlug(params.category);

  if (!item || !category || item.category !== category.slug) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href={`/catalog/${category!.slug}`} className="text-sm text-maroon-700 hover:underline">
        ← Back to {category!.name}
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
        <PlaceholderImage
          src={item!.image}
          alt={item!.name}
          category={item!.category}
          className="h-72 w-full rounded-lg md:h-96"
        />

        <div>
          {item!.subcategory && (
            <span className="w-fit rounded-full bg-marigold-100 px-2 py-0.5 text-xs font-medium text-marigold-800">
              {item!.subcategory}
            </span>
          )}
          <h1 className="mt-2 text-2xl font-bold text-stone-800">{item!.name}</h1>
          <p className="mt-2 text-lg text-stone-600">
            ${item!.price.toFixed(2)} {item!.priceUnit}
          </p>
          <p className="mt-4 text-stone-600">{item!.description}</p>

          <div className="mt-6">
            <AddToListButton item={item!} withQuantity />
          </div>
          <p className="mt-3 text-xs text-stone-400">
            Adding to your list doesn&apos;t charge anything — you&apos;ll review everything and submit one request when you&apos;re ready.
          </p>
        </div>
      </div>
    </div>
  );
}
