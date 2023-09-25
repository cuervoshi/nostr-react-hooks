"use client";
import NostrExtensionProvider from "@/types/nostr";
import NDK, { NDKNip07Signer } from "@nostr-dev-kit/ndk";
import type { WebLNProvider as WebLNExtensionProvider } from "@webbtc/webln-types";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

declare global {
  interface Window {
    nostr: NostrExtensionProvider;
  }
}

type LightningProvidersType = {
  webln: WebLNExtensionProvider | undefined;
  nostr: NostrExtensionProvider | undefined;
};

export interface INostrContext {
  providers: LightningProvidersType;
  ndk: NDK;
  connect: () => void;
  requestPublicKey: () => Promise<string>;
  userPubkey: string;
}

const nostrContext: React.Context<any> = createContext(null);

const useNOSTR = (explicitRelayUrls: string[]): INostrContext => {
  const [ndk, setNDK] = useState<NDK>(null);

  const [providers, setProviders] = useState<LightningProvidersType>({
    webln: undefined,
    nostr: undefined,
  });

  const [userPubkey, setUserPubkey] = useState<string>("");

  const loadProviders = React.useCallback(async () => {
    setProviders({
      webln: window.webln,
      nostr: window.nostr,
    });

    const nip07signer = new NDKNip07Signer();
    const ndkProvider = new NDK({
      explicitRelayUrls,
      signer: nip07signer,
    });
    setNDK(ndkProvider);

    await ndkProvider.connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = async () => {
    if (!providers.webln) return null;
    await providers.webln.enable();

    const pubKey = await requestPublicKey();
    if (pubKey) setUserPubkey(pubKey);
  };

  const requestPublicKey = async () => {
    if (!providers.nostr) return null;

    try {
      await providers.nostr.enable();
      const _pubKey = await providers.nostr.getPublicKey();
      return _pubKey;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    loadProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { providers, ndk, connect, userPubkey, requestPublicKey };
};

export function NostrifyProvider({
  children,
  explicitRelayUrls,
}: {
  children: ReactNode;
  explicitRelayUrls: string[];
}) {
  const nostrProvider: any = useNOSTR(explicitRelayUrls);

  return (
    <nostrContext.Provider value={nostrProvider}>
      {children}
    </nostrContext.Provider>
  );
}

export const useNostrify = () => {
  const context: INostrContext = useContext(nostrContext);

  if (!context) {
    throw new Error("useNostrify debe ser utilizado dentro de nostrProvider");
  }

  return context;
};
