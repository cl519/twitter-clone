import Header from "@/components/Header";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import NotificationsFeed from "@/components/NotificationsFeed";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  let notifications = [];

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  /*
  // get current user api
  try {
    const currentUserResponse = await fetch(
      "http://localhost:3000/api/current",
      {
        method: "GET",
        headers: { Cookie: context?.req?.headers.cookie ?? "" },
      }
    );

    const res = await currentUserResponse.json();

    // get notification api
    const notificationResponse = await fetch(
      `http://localhost:3000/api/notifications/${res.id}`
    );

    notifications = await notificationResponse.json();
  } catch (error) {
    console.log(error);
  }

  console.log("prefetched notifications: ", notifications);
  */

  return {
    props: {
      session,
      // notifications,
    },
  };
}

const Notifications = ({ notifications }: any) => {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed notifications={notifications} />
    </>
  );
};

export default Notifications;
