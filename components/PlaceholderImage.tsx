import { CategorySlug } from "@/data/categories";
import { categoryStyles } from "@/lib/categoryStyles";
import { basePath } from "@/lib/repoConfig.mjs";

interface PlaceholderImageProps {
  src?: string;
  alt: string;
  category: CategorySlug;
  className?: string;
}

// Renders a real photo when one exists (data/items.ts -> image field,
// pointing at a file under /public/images/<category>/<item>.jpg).
// Otherwise falls back to a colored tile with a category label so the
// catalog looks complete before any real or AI-generated photos are added.
export default function PlaceholderImage({
  src,
  alt,
  category,
  className = "",
}: PlaceholderImageProps) {
  if (src) {
    // basePath ("/RentIt" on GitHub Pages) is only auto-applied by next/link
    // and next/image — a plain <img src> needs it prefixed by hand or the
    // image 404s once deployed under a subpath.
    // eslint-disable-next-line @next/next/no-img-element -- static export has no image server to optimize against
    return <img src={`${basePath}${src}`} alt={alt} className={`object-cover ${className}`} />;
  }

  const style = categoryStyles[category];

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${style.bgClass} ${className}`}
      role="img"
      aria-label={alt}
    >
      <CategoryIcon category={category} className={`h-10 w-10 ${style.iconClass}`} />
      <span className={`text-xs font-medium ${style.iconClass}`}>{style.label}</span>
    </div>
  );
}

function CategoryIcon({
  category,
  className,
}: {
  category: CategorySlug;
  className?: string;
}) {
  const icons: Record<CategorySlug, JSX.Element> = {
    "props-indian-furniture": (
      <path d="M6 20V10a6 6 0 0 1 12 0v10M4 20h16M9 20v-4a3 3 0 0 1 6 0v4" />
    ),
    "tents-canopies": <path d="M3 20 12 4l9 16H3ZM12 4v16" />,
    "tables-chairs": <path d="M4 8h16M6 8v10M18 8v10M8 20h8M4 4h16" />,
    "linens-decor": <path d="M4 6h16v3a8 8 0 0 1-16 0V6ZM8 21v-4M16 21v-4" />,
    "bounce-houses-games": (
      <path d="M12 3a5 5 0 0 1 5 5c0 4-5 13-5 13S7 12 7 8a5 5 0 0 1 5-5Z" />
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[category]}
    </svg>
  );
}
