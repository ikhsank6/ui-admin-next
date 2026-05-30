import type { Metadata } from "next";
import { SettingsView } from "./settings-view";

export const metadata: Metadata = {
  title: "Pengaturan",
  description: "Kelola informasi akun dan keamanan Anda",
};

export default function SettingsPage() {
  return <SettingsView />;
}
