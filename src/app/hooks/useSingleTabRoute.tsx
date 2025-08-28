import { useEffect, useState } from "react";

const useSingleTabRoute = (route: string) => {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const channel = new BroadcastChannel("route_channel");

  useEffect(() => {
    channel.onmessage = (event) => {
      if (event.data === route) {
        setIsTabOpen(true);
      }
    };
    channel.postMessage(route);

    const onBeforeUnload = () => {
      channel.postMessage(`${route}_closed`);
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      channel.close();
    };
  }, [route]);

  return isTabOpen;
};

export default useSingleTabRoute;
