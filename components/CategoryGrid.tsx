import Link from "next/link";
import { categories } from "@/data/categories";
import { categoryStyles } from "@/lib/categoryStyles";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {categories.map((category) => {
        const style = categoryStyles[category.slug];
        return (
          <Link
            key={category.slug}
            href={`/catalog/${category.slug}`}
            className={`flex flex-col justify-between gap-3 rounded-lg border border-stone-200 p-5 shadow-sm transition hover:shadow-md ${style.bgClass}`}
          >
            <div>
              <h3 className="font-semibold text-stone-800">{category.name}</h3>
              <p className="mt-1 text-sm text-stone-600">{category.description}</p>
            </div>
            <span className={`text-sm font-medium ${style.iconClass}`}>Browse →</span>
          </Link>
        );
      })}
    </div>
  );
}
