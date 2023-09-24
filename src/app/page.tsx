//@ts-nocheck
"use client";
import { useNostrify } from "@/contexts/Nostrify";
import { useSubscription } from "@/hooks/useSubscription";
import { useEffect } from "react";
import styles from "./page.module.css";
import useProfile from "@/hooks/useProfile";

export default function Home() {
  const { connect, userPubkey } = useNostrify();
  const { profile } = useProfile(userPubkey);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  const { events: userPosts } = useSubscription({
    filters: [
      {
        authors: [userPubkey],
        kinds: [1],
      },
    ],
    enabled: userPubkey.length,
  });

  useEffect(() => {
    console.log(userPosts);
  }, [userPosts]);

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
