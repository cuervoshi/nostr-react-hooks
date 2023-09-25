import { NostrEvent } from "@nostr-dev-kit/ndk";
import { useSubscription } from "./useSubscription";

interface UsePostsReturn {
  posts: NostrEvent[];
}

type PostsProps = {
  pubKey: string;
  limit: number;
};

export const usePosts = ({ pubKey, limit }: PostsProps): UsePostsReturn => {
  const { events } = useSubscription({
    filters: [
      {
        authors: [pubKey],
        kinds: [1],
        limit,
      },
    ],
    options: {
      groupable: false,
      closeOnEose: false,
    },
    enabled: Boolean(pubKey.length),
  });

  const posts: NostrEvent[] = events.sort(
    (a, b) => b.created_at - a.created_at
  );

  return { posts };
};

export default usePosts;
