//@ts-nocheck
"use client";
import { useNostrify } from "@/contexts/Nostrify";
import usePublishEvent from "@/hooks/usePublishEvent";
import { useRouter } from "next/navigation";
import { nip19 } from "nostr-tools";
import { useCallback, useRef } from "react";

export default function Home() {
  const { connect, userPubkey } = useNostrify();
  const { publish } = usePublishEvent();
  const inputRef = useRef();

  const router = useRouter();

  const goProfile = useCallback(() => {
    const npub = nip19.npubEncode(userPubkey);
    void router.push(`/p/${npub}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPubkey]);

  return (
    <main>
      {!userPubkey ? (
        <button onClick={connect}>Login</button>
      ) : (
        <>
          <p>Tu clave publica: {userPubkey}</p>
          <button onClick={() => void goProfile()}>Ver perfil</button>

          <br />

          <h1>Publicar un posteo</h1>
          <input ref={inputRef} type="text" />
          <button
            type="submit"
            onClick={() => {
              const text = inputRef.current.value;
              if (text) publish({ kind: 1, content: text });
            }}
          >
            Enviar
          </button>
        </>
      )}
    </main>
  );
}
