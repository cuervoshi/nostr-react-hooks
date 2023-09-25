import { INostrContext, useNostrify } from "@/contexts/Nostrify";
import {
  NDKEvent,
  NDKFilter,
  NDKSubscription,
  NDKSubscriptionOptions,
  NostrEvent,
} from "@nostr-dev-kit/ndk";
import { useCallback, useEffect, useState } from "react";

export interface IUseSubscription {
  subscription: NDKSubscription;
  events: NDKEvent[];
}

export type SubscriptionProps = {
  filters: NDKFilter[];
  options: NDKSubscriptionOptions;
  enabled: boolean;
};

export const useSubscription = ({
  filters,
  options,
  enabled,
}: SubscriptionProps) => {
  const { ndk }: INostrContext = useNostrify();

  const [subscription, setSubscription] = useState<NDKSubscription>();
  const [events, setEvents] = useState<NDKEvent[]>([]);

  const startSubscription = useCallback(() => {
    if (ndk) {
      const newSubscription = ndk.subscribe(filters, options);
      setSubscription(newSubscription);
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscription, enabled]);

  useEffect(() => {
    if (enabled) startSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  const stopSubscription = (sub: NDKSubscription) => {
    sub?.stop();
    sub?.removeAllListeners();
  };

  useEffect(() => {
    if (subscription && enabled) {
      const readEvents = subscription?.on("event", async (event: NDKEvent) => {
        const nEvent: NostrEvent = await event.toNostrEvent();
        setEvents((prev) => [...prev, nEvent]);
      });

      return () => stopSubscription(readEvents);
    }
  }, [subscription, enabled]);

  return {
    subscription,
    events,
  };
};
