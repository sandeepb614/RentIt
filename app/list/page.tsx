"use client";

import Link from "next/link";
import { useRequestList } from "@/lib/RequestListContext";
import { getItemBySlug } from "@/data/items";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function ListPage() {
  const { entries, removeItem, updateQuantity } = useRequestList();

  const rows = entries
    .map((entry) => {
      const item = getItemBySlug(entry.slug);
      return item ? { item, quantity: entry.quantity } : null;
    })
    .filter((row): row is { item: NonNullable<ReturnType<typeof getItemBySlug>>; quantity: number } => row !== null);

  const estimatedTotal = rows.reduce((sum, row) => sum + row.item.price * row.quantity, 0);

  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-stone-800">Your list is empty</h1>
        <p className="mt-2 text-stone-500">
          Browse the catalog and click &quot;Add to List&quot; on anything you&apos;re interested in.
        </p>
        <Link
          href="/catalog"
          className="mt-6 inline-block rounded-md bg-maroon-700 px-5 py-3 font-semibold text-white hover:bg-maroon-800"
        >
          Browse the Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-stone-800">My List</h1>
      <p className="mt-1 text-stone-500">
        Review what you&apos;ve picked, adjust quantities, then send it all as one request.
      </p>

      <div className="mt-6 divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
        {rows.map(({ item, quantity }) => (
          <div key={item.slug} className="flex items-center gap-4 p-4">
            <PlaceholderImage
              src={item.image}
              alt={item.name}
              category={item.category}
              className="h-16 w-16 flex-shrink-0 rounded-md"
            />
            <div className="flex-1">
              <Link href={`/catalog/${item.category}/${item.slug}`} className="font-medium text-stone-800 hover:text-maroon-700">
                {item.name}
              </Link>
              <p className="text-sm text-stone-500">
                ${item.price.toFixed(2)} {item.priceUnit}
              </p>
            </div>
            <div className="flex items-center rounded-md border border-stone-300">
              <button
                type="button"
                aria-label={`Decrease quantity of ${item.name}`}
                className="px-3 py-1 text-stone-600 hover:bg-stone-100"
                onClick={() => updateQuantity(item.slug, quantity - 1)}
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-medium">{quantity}</span>
              <button
                type="button"
                aria-label={`Increase quantity of ${item.name}`}
                className="px-3 py-1 text-stone-600 hover:bg-stone-100"
                onClick={() => updateQuantity(item.slug, quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              aria-label={`Remove ${item.name} from list`}
              className="text-sm text-stone-400 hover:text-maroon-700"
              onClick={() => removeItem(item.slug)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-lg bg-stone-100 p-4">
        <span className="font-medium text-stone-700">Estimated total</span>
        <span className="font-semibold text-stone-800">${estimatedTotal.toFixed(2)}</span>
      </div>
      <p className="mt-2 text-xs text-stone-400">
        This is just an estimate to help you plan — nothing is charged. Final pricing is confirmed when we get in touch.
      </p>

      <Link
        href="/inquire"
        className="mt-6 block w-full rounded-md bg-maroon-700 px-5 py-3 text-center font-semibold text-white hover:bg-maroon-800"
      >
        Request These Items
      </Link>
    </div>
  );
}
