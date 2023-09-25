"use client";
import ConnectWithExtension from "@/components/connect/WithExtension";
import ConnectWithKey from "@/components/connect/WithKey";
import PublishPost from "@/components/posts/publish";
import { useNostrify } from "@/contexts/Nostrify";
import { useRouter } from "next/navigation";
import { nip19 } from "nostr-tools";
import { useCallback } from "react";

export default function Home() {
  const { providers, userPubkey } = useNostrify();

  const router = useRouter();

  const goProfile = useCallback(() => {
    const npub = nip19.npubEncode(userPubkey);
    void router.push(`/p/${npub}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPubkey]);

  return (
    <main>
      {!userPubkey ? (
        providers.webln ? (
          <ConnectWithExtension />
        ) : (
          <ConnectWithKey />
        )
      ) : (
        <>
          <p>Tu clave publica: {userPubkey}</p>
          <button onClick={() => void goProfile()}>Ver perfil</button>

          <br />

          <PublishPost />
        </>
      )}
    </main>
  );
}
