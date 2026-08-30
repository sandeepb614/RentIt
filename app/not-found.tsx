import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-stone-800">Page not found</h1>
      <p className="mt-2 text-stone-500">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="mt-6 inline-block text-maroon-700 hover:underline">
        ← Back to home
      </Link>
    </div>
  );
}
