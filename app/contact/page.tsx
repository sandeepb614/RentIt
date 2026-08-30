import Link from "next/link";
import { businessInfo } from "@/lib/businessInfo";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-stone-800">Contact {businessInfo.name}</h1>
      <div className="mt-6 space-y-2 text-stone-600">
        <p>{businessInfo.serviceArea}</p>
        <p>Phone: {businessInfo.phone}</p>
        <p>Email: {businessInfo.email}</p>
        <p>{businessInfo.address}</p>
      </div>
      <p className="mt-6 text-stone-600">
        Already found what you need? Build a list from the catalog and send it to us directly.
      </p>
      <Link
        href="/list"
        className="mt-4 inline-block rounded-md bg-maroon-700 px-5 py-3 font-semibold text-white hover:bg-maroon-800"
      >
        Go to My List
      </Link>
    </div>
  );
}
