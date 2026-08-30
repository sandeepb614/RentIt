"use client";

import { useState } from "react";
import { useRequestList } from "@/lib/RequestListContext";
import { Item } from "@/data/items";

interface AddToListButtonProps {
  item: Item;
  /** show a +/- quantity stepper (used on the item detail page); card view keeps it simple */
  withQuantity?: boolean;
  className?: string;
}

export default function AddToListButton({
  item,
  withQuantity = false,
  className = "",
}: AddToListButtonProps) {
  const { addItem } = useRequestList();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(item.slug, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {withQuantity && (
        <div className="flex items-center rounded-md border border-stone-300">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="px-3 py-2 text-stone-600 hover:bg-stone-100"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            className="px-3 py-2 text-stone-600 hover:bg-stone-100"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={handleAdd}
        className="flex-1 rounded-md bg-maroon-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-maroon-800"
      >
        {justAdded ? "Added ✓" : "Add to List"}
      </button>
    </div>
  );
}
