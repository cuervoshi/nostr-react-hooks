//@ts-nocheck
"use client";
import { useNostrify } from "@/contexts/Nostrify";
import { useSubscription } from "@/hooks/useSubscription";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const { connect, userPubkey } = useNostrify();

  const { events } = useSubscription({
    filters: [
      {
        authors: [userPubkey],
        kinds: [1],
      },
    ],
    enabled: userPubkey.length,
  });

  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <main className={styles.main}>
      {!userPubkey ? (
        <button onClick={connect}>Login</button>
      ) : (
        <p>Tu clave publica: {userPubkey}</p>
      )}
    </main>
  );
}
