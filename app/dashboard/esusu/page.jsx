"use client";

import dynamic from "next/dynamic";

const EsusuClient = dynamic(() => import("./EsusuClient"), {
  ssr: false,
  loading: () => (
    <div style={{ padding: "40px", textAlign: "center", color: "var(--grey-light)" }}>
      Loading Esusu Secure Protocol...
    </div>
  ),
});

export default function EsusuPage() {
  return <EsusuClient />;
}

