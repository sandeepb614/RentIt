import { CategorySlug } from "@/data/categories";

// Used by PlaceholderImage to render a colored tile + icon whenever an item
// has no real photo yet. Swap these for real photos over time by setting
// `image` on the item in data/items.ts — nothing here needs to change.
export interface CategoryStyle {
  bgClass: string;
  iconClass: string;
  /** short label drawn inside the placeholder tile */
  label: string;
}

export const categoryStyles: Record<CategorySlug, CategoryStyle> = {
  "props-indian-furniture": {
    bgClass: "bg-maroon-100",
    iconClass: "text-maroon-700",
    label: "Props & Furniture",
  },
  "tents-canopies": {
    bgClass: "bg-marigold-100",
    iconClass: "text-marigold-700",
    label: "Tent",
  },
  "tables-chairs": {
    bgClass: "bg-stone-200",
    iconClass: "text-stone-600",
    label: "Table & Chair",
  },
  "linens-decor": {
    bgClass: "bg-marigold-50",
    iconClass: "text-marigold-600",
    label: "Linens & Decor",
  },
  "bounce-houses-games": {
    bgClass: "bg-sky-100",
    iconClass: "text-sky-700",
    label: "Games",
  },
};
