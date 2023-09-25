import { useNostrify } from "@/contexts/Nostrify";
import { NDKEvent, NostrEvent } from "@nostr-dev-kit/ndk";

interface UsePostsReturn {
  publish: (kind: number, content: any, tags: Array<Array<String>>) => void;
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
    } catch {
      return null;
    }
  };

  return { publish };
};

export default usePublishEvent;
