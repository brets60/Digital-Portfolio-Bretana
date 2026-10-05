"use client";

import React from "react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Native browser hardware-accelerated scrolling with zero JS overhead or input latency
  return <>{children}</>;
}
