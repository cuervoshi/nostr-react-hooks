import SinglePost from "./single";
import usePosts from "@/hooks/usePosts";

interface PostsProps {
  pubKey: string;
}

export const Posts = ({ pubKey }: PostsProps) => {
  const { posts } = usePosts({ pubKey, limit: 50 });

  return (
    <div>
      {posts.map((event) => (
        <SinglePost event={event} key={event.id} />
      ))}
    </div>
  );
};

export default Posts;
