"use client";
import Posts from "@/components/posts";
import Profile from "@/components/profile";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { nip19 } from "nostr-tools";
import React, { useEffect, useState } from "react";

const Home: NextPage = ({ params }: { params: { slug: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profilePubKey, setProfilePubKey] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    if (!params.slug) {
      return;
    }

    const { type, data } = nip19.decode(params.slug as string);
    if (type !== "npub") {
      void router.push("/");
      return;
    }

    setProfilePubKey(data);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              <Profile pubKey={profilePubKey} />
              <Posts pubKey={profilePubKey} />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
