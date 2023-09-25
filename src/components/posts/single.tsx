import type { Event } from "nostr-tools";

interface SinglePostProps {
  event: Event;
}

export const SinglePost = ({ event }: SinglePostProps) => {
  const eventDate = new Date(event.created_at * 1000);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div>{event.content}</div>

      <div>
        {eventDate.toLocaleDateString()} - {eventDate.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default SinglePost;
