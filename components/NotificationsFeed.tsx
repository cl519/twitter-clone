import useCurrentUser from "@/hooks/useCurrentUser";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

interface NotificationsFeedProps {
  notifications?: [];
}

const NotificationsFeed: React.FC<NotificationsFeedProps> = ({
  notifications,
}) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  // console.log("before line useNotification: ", Date.now());
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);
  // console.log("after line useNotification: ", Date.now());

  // Note: don't need this with polling.
  useEffect(() => {
    // console.log("before calling mutateCurrentUser: ", Date.now());
    mutateCurrentUser();
    // console.log("after calling mutateCurrentUser: ", Date.now());
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div
        className="
            text-neutral-600
            text-center
            p-6
            text-xl"
      >
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="
                    flex
                    flex-row
                    items-center
                    p-6
                    gap-4
                    border-b-[1px]
                    border-neutral-800"
        >
          <BsTwitter color="white" size={32} />
          <p className="text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
