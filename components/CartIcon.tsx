"use client";

import Link from "next/link";
import { useRequestList } from "@/lib/RequestListContext";

export default function CartIcon() {
  const { totalCount } = useRequestList();

  return (
    <Link
      href="/list"
      className="relative flex items-center gap-1 rounded-md px-2 py-1 text-stone-700 hover:text-maroon-700"
      aria-label={`My List, ${totalCount} item${totalCount === 1 ? "" : "s"}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-6 w-6"
      >
        <path d="M6 6h15l-1.5 9h-12L6 6ZM6 6 5 3H2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
      <span className="text-sm font-medium">My List</span>
      {totalCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-maroon-700 px-1 text-xs font-bold text-white">
          {totalCount}
        </span>
      )}
    </Link>
  );
}
