"use client";
import { useNostrify } from "@/contexts/Nostrify";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { nip19 } from "nostr-tools";
import React, { useEffect, useState } from "react";
import { NDKEvent, NostrEvent } from "@nostr-dev-kit/ndk";
import { Profile } from "@/types/profile";

type EventProps = {
  profile: Profile;
  event: NostrEvent;
};

const Home: NextPage = ({ params }: { params: { slug: string } }) => {
  const { ndk } = useNostrify();
  const [isLoading, setIsLoading] = useState(true);
  const [eventId, setEventId] = useState<string>("");
  const [eventInfo, setEventInfo] = useState<EventProps>({
    profile: null,
    event: null,
  });

  const router = useRouter();

  useEffect(() => {
    if (!params.slug) {
      return;
    }

    const { type, data } = nip19.decode(params.slug as string);
    if (type !== "note") {
      void router.push("/");
      return;
    }

    setEventId(data);

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (eventId)
      ndk.fetchEvent({ ids: [eventId] }).then(async (event: NDKEvent) => {
        if (event) {
          const nEvent: NostrEvent = await event.toNostrEvent();
          //const profile: Profile = await getProfile
          console.log(nEvent);
          setEventInfo({
            profile: null,
            event: nEvent,
          });
          setIsLoading(false);
        }
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return (
    <>
      <Head>
        <title>NOSTR Hackaton - La Crypta</title>
        <meta name="description" content="Created by La Crypta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="">
          {isLoading ? (
            "Cargando..."
          ) : (
            <>
              <h1>Nota de texto: </h1>
              <p>{eventInfo.event.content}</p>
              {/* <Profile pubKey={profilePubKey} />
              <Posts pubKey={profilePubKey} /> */}
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
