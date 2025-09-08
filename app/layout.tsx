import type { Metadata } from "next";
import "./globals.css";
import StateUpdater from "./StateUpdater";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Easy Login",
  description: "Login Easily !!!",
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
