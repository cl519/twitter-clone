import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import { useEffect, useState, useRef } from "react";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);

  // Alternative appraoch to the StrictMode issue by creating a map.
  // const [dataKey, setDataKey] = useState<Record<string, Record<string, any>[]>>(
  //   {}
  // );

  // A boolean ref to work around StrictMode which causes useEffect to run twice.
  const isFirstRender = useRef(true);

  // old approach: fetch all
  // const { data: posts = [] } = usePosts(userId);

  useEffect(() => {
    if (isFirstRender.current) {
      const fetchData = async () => {
        try {
          // const keyValue = offset.toString() + ",6";
          // if (!(keyValue in dataKey)) {
          const res = await fetch(
            `http://localhost:3000/api/posts?offset=${offset}&limit=4`
          );
          const postData = await res.json();
          console.log(
            "fetching response with offset: ",
            offset,
            " and limit: ",
            6
          );

          console.log("postData: ", postData);
          setPosts((prev) => [...prev, ...postData]);
          // setDataKey((prev) => {
          //   return { ...prev, [keyValue]: postData };
          // });
          // }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      isFirstRender.current = false;
    }
  }, [offset]);

  useEffect(() => {
    const handleScroll = (e: any) => {
      console.log("toggling isFirstRender....");
      isFirstRender.current = true;
      console.log({
        scrollHeight: e.target.documentElement.scrollHeight,
        scrollTop: e.target.documentElement.scrollTop,
        innerHeight: window.innerHeight,
        currentHeight: e.target.documentElement.scrollTop + window.innerHeight,
      });
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setOffset(offset + 4);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
