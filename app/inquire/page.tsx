import InquiryForm from "@/components/InquiryForm";

export const metadata = { title: "Request a Quote" };

export default function InquirePage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-stone-800">Request a Quote</h1>
      <p className="mt-2 text-stone-500">
        Send us your list along with your event date, and we&apos;ll follow up to confirm availability and pricing.
      </p>
      <div className="mt-6">
        <InquiryForm />
      </div>
    </div>
  );
}
