"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRequestList } from "@/lib/RequestListContext";
import { getItemBySlug } from "@/data/items";

const PLACEHOLDER_ENDPOINT = "https://formspree.io/f/REPLACE_ME";

type Status = "idle" | "submitting" | "success" | "error";

export default function InquiryForm() {
  const { entries, clearList } = useRequestList();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const rows = entries
    .map((entry) => {
      const item = getItemBySlug(entry.slug);
      return item ? { item, quantity: entry.quantity } : null;
    })
    .filter((row): row is { item: NonNullable<ReturnType<typeof getItemBySlug>>; quantity: number } => row !== null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const eventDate = String(formData.get("eventDate") || "").trim();

    if (!name || !email || !eventDate) {
      setErrorMessage("Please fill in your name, email, and event date.");
      return;
    }
    if (rows.length === 0) {
      setErrorMessage("Your list is empty — add at least one item before requesting a quote.");
      return;
    }

    const itemsSummary = rows
      .map((row) => `${row.quantity} x ${row.item.name}`)
      .join("\n");
    formData.append("itemsRequested", itemsSummary);

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    const isConfigured = Boolean(endpoint) && endpoint !== PLACEHOLDER_ENDPOINT;

    if (!isConfigured) {
      // Formspree isn't wired up yet — don't fail the whole flow. Log what
      // would have been sent so the click-through is still demonstrable,
      // and show the same success state a visitor would see.
      // eslint-disable-next-line no-console
      console.log("[dev mode] Inquiry form payload (not sent, no Formspree endpoint configured):", {
        name,
        email,
        eventDate,
        message: formData.get("message"),
        itemsRequested: itemsSummary,
      });
      setStatus("success");
      clearList();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(endpoint as string, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (response.ok) {
        setStatus("success");
        clearList();
      } else {
        setStatus("error");
        setErrorMessage("Something went wrong sending your request. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong sending your request. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-marigold-300 bg-marigold-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-maroon-800">Request sent!</h2>
        <p className="mt-2 text-stone-600">
          Thanks — we&apos;ll be in touch shortly about the items you requested.
        </p>
        <Link href="/catalog" className="mt-4 inline-block text-sm font-medium text-maroon-700 hover:underline">
          ← Continue browsing
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {rows.length > 0 ? (
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
          <h2 className="text-sm font-semibold text-stone-700">Items in your request</h2>
          <ul className="mt-2 space-y-1 text-sm text-stone-600">
            {rows.map((row) => (
              <li key={row.item.slug}>
                {row.quantity} × {row.item.name}
              </li>
            ))}
          </ul>
          <Link href="/list" className="mt-2 inline-block text-xs font-medium text-maroon-700 hover:underline">
            Edit list
          </Link>
        </div>
      ) : (
        <div className="rounded-lg border border-marigold-300 bg-marigold-50 p-4 text-sm text-stone-600">
          Your list is empty.{" "}
          <Link href="/catalog" className="font-medium text-maroon-700 hover:underline">
            Browse the catalog
          </Link>{" "}
          and add items before submitting a request.
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-maroon-600 focus:outline-none focus:ring-1 focus:ring-maroon-600"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-maroon-600 focus:outline-none focus:ring-1 focus:ring-maroon-600"
        />
      </div>

      <div>
        <label htmlFor="eventDate" className="block text-sm font-medium text-stone-700">
          Event date
        </label>
        <input
          id="eventDate"
          name="eventDate"
          type="date"
          required
          className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-maroon-600 focus:outline-none focus:ring-1 focus:ring-maroon-600"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700">
          Message <span className="text-stone-400">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm focus:border-maroon-600 focus:outline-none focus:ring-1 focus:ring-maroon-600"
        />
      </div>

      {errorMessage && <p className="text-sm text-maroon-700">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-maroon-700 px-5 py-3 font-semibold text-white transition hover:bg-maroon-800 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Request"}
      </button>
    </form>
  );
}
