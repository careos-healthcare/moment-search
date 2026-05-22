import type { Metadata } from "next";
import SavedPageClient from "./SavedPageClient";

export const metadata: Metadata = {
  title: "Saved moments",
  description: "Your saved podcast and video moments, stored locally on this device.",
};

export default function SavedPage() {
  return <SavedPageClient />;
}
