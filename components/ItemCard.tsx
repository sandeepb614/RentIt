import Link from "next/link";
import { Item } from "@/data/items";
import PlaceholderImage from "@/components/PlaceholderImage";
import AddToListButton from "@/components/AddToListButton";

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/catalog/${item.category}/${item.slug}`}>
        <PlaceholderImage
          src={item.image}
          alt={item.name}
          category={item.category}
          className="h-40 w-full"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {item.subcategory && (
          <span className="w-fit rounded-full bg-marigold-100 px-2 py-0.5 text-xs font-medium text-marigold-800">
            {item.subcategory}
          </span>
        )}
        <Link
          href={`/catalog/${item.category}/${item.slug}`}
          className="font-semibold text-stone-800 hover:text-maroon-700"
        >
          {item.name}
        </Link>
        <p className="text-sm text-stone-500">
          ${item.price.toFixed(2)} {item.priceUnit}
        </p>
        <div className="mt-auto pt-2">
          <AddToListButton item={item} />
        </div>
      </div>
    </div>
  );
}
