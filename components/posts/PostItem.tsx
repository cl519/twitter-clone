import { useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/router";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { formatDistanceToNowStrict } from "date-fns";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const selfRef = useRef<HTMLDivElement>(null);

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (event: any) => {
      // Post itself is clickable. This is to make sure the onClick
      // of Post is overwritten by the clickable child component.
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  console.log("selfref.current: ", selfRef.current?.getBoundingClientRect());
  console.log("window current height: ", window.innerHeight);

  return (
    <div
      ref={selfRef}
      onClick={goToPost}
      className="
        border-b-[1px]
        border-neutral-800
        p-5
        cursor-pointer
        hover:bg-neutral-900
        transition
        "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                text-white
                font-semibold
                cusror-pointer
                hover:underline
                "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
                    text-neutral-500
                    cursor-pointer
                    hover:underline
                    hidden
                    md:block"
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-5 gap-10">
            <div
              className="
                flex
                flex-row
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                hover:text-sky-500"
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="
                flex
                flex-row
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                hover:text-red-500"
            >
              <LikeIcon size={20} color={hasLiked ? "red" : ""} />
              <p>{data.likedIds.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
