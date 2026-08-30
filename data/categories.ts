// Every rental item belongs to exactly one of these categories.
// Add a category here first, then add items that reference its slug in data/items.ts.

export type CategorySlug =
  | "props-indian-furniture"
  | "tents-canopies"
  | "tables-chairs"
  | "linens-decor"
  | "bounce-houses-games";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  /** key into the icon/color map in lib/categoryStyles.ts */
  icon: string;
}

// Props & Indian Furniture is listed first on purpose: it's the primary
// focus of the catalog, not a generic add-on category.
export const categories: Category[] = [
  {
    slug: "props-indian-furniture",
    name: "Props & Indian Furniture",
    description:
      "Traditional furniture, decorative props, and ceremony setups for weddings, dhoti functions, and other South Asian celebrations.",
    icon: "props",
  },
  {
    slug: "tents-canopies",
    name: "Tents & Canopies",
    description: "Shade and shelter for backyard parties through full weddings.",
    icon: "tent",
  },
  {
    slug: "tables-chairs",
    name: "Tables & Chairs",
    description: "Round and banquet tables, folding and chiavari chairs.",
    icon: "table",
  },
  {
    slug: "linens-decor",
    name: "Linens & Decor",
    description: "Tablecloths, runners, string lights, and balloon decor.",
    icon: "linens",
  },
  {
    slug: "bounce-houses-games",
    name: "Bounce Houses & Games",
    description: "Inflatables and yard games to keep guests of all ages entertained.",
    icon: "games",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
