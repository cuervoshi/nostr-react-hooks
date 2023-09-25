import { NostrifyProvider } from "@/contexts/Nostrify";
import type { Metadata } from "next";
import Link from 'next/link'
import { Inter } from "next/font/google";

import Navbar from '@/components/layouts/navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nostr Boilerplate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NostrifyProvider explicitRelayUrls={["wss://relay.damus.io/"]}>
          <Navbar />
          {children}
        </NostrifyProvider>
      </body>
    </html>
  );
}
