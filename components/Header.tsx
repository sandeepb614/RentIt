import Link from "next/link";
import CartIcon from "@/components/CartIcon";
import { businessInfo } from "@/lib/businessInfo";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold text-maroon-800">
          {businessInfo.name}
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/catalog" className="text-sm font-medium text-stone-700 hover:text-maroon-700">
            Catalog
          </Link>
          <Link href="/contact" className="text-sm font-medium text-stone-700 hover:text-maroon-700">
            Contact
          </Link>
          <CartIcon />
        </nav>
      </div>
    </header>
  );
}
