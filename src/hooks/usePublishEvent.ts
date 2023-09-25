import { useNostrify } from "@/contexts/Nostrify";
import { NDKEvent, NostrEvent } from "@nostr-dev-kit/ndk";

interface UsePostsReturn {
  publish: (event: NostrEvent) => Promise<{ success: boolean, error?: any}>;
}

export const usePublishEvent = (): UsePostsReturn => {
  const { ndk } = useNostrify();

  const publish = async (event: NostrEvent) => {
    try {
      const ndkEvent: NDKEvent = new NDKEvent(ndk);
      ndkEvent.kind = event.kind;
      ndkEvent.content = event.content;
      ndkEvent.tags = event.tags;

      await ndkEvent.publish();

      return { success:true }
    } catch(error) {
      return { success:false, error }
    }
  };

  return { publish };
};

export default usePublishEvent;
