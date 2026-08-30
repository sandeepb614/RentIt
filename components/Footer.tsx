import { businessInfo } from "@/lib/businessInfo";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-stone-500 sm:px-6 lg:px-8">
        <p className="font-semibold text-stone-700">{businessInfo.name}</p>
        <p className="mt-1">{businessInfo.serviceArea}</p>
        <p className="mt-1">
          {businessInfo.phone} · {businessInfo.email}
        </p>
        <p className="mt-1">{businessInfo.address}</p>
        <p className="mt-4 text-xs text-stone-400">
          © {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
