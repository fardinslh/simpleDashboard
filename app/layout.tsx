import type { Metadata } from "next";
import "./globals.css";
import StateUpdater from "./StateUpdater";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Simple Dashboard – Login",
  description:
    "A sleek Next.js + shadcn/ui demo app with login, logout, and dashboard state management.",
  keywords: ["Next.js", "shadcn", "Tailwind", "Redux", "Login", "Dashboard"],
  authors: [{ name: "Fardin Slh" }],
  openGraph: {
    title: "Simple Dashboard",
    description:
      "A sleek Next.js + shadcn/ui demo app with phone login and dashboard.",
    url: "https://simple-dashboard-mu.vercel.app",
    siteName: "Simple Dashboard",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Simple Dashboard",
    description:
      "A sleek Next.js + shadcn/ui demo app with phone login and dashboard.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <StoreProvider>
        <StateUpdater />
        <body>{children}</body>
      </StoreProvider>
    </html>
  );
}
