import { NostrifyProvider } from "@/contexts/Nostrify";
import type { Metadata } from "next";
import Link from 'next/link'
import { Inter } from "next/font/google";

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
        <nav>
          <ul>
            <li>
            <Link href='/'>Inicio</Link>
            </li>
            <li>
            <Link href='/settings'>Configuracion</Link>
            </li>
          </ul>
        </nav>
        <NostrifyProvider explicitRelayUrls={["wss://relay.damus.io/"]}>
          {children}
        </NostrifyProvider>
      </body>
    </html>
  );
}
