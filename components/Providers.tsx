"use client";

import { ReactNode } from "react";
import { RequestListProvider } from "@/lib/RequestListContext";

// app/layout.tsx stays a Server Component; this small client wrapper is the
// only place React Context (which needs the browser) gets introduced.
export default function Providers({ children }: { children: ReactNode }) {
  return <RequestListProvider>{children}</RequestListProvider>;
}
