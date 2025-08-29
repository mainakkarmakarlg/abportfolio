import { useEffect, useState, useRef } from "react";

const useSingleTabRoute = (route: string) => {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = new BroadcastChannel("route_channel");
    }

    const channel = channelRef.current;

    const onMessage = (event: MessageEvent) => {
      if (event.data === route) {
        setIsTabOpen(true);
      }
    };

    channel.addEventListener("message", onMessage);

    channel.postMessage(route);

    const onBeforeUnload = () => {
      channel.postMessage(`${route}_closed`);
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      channel.removeEventListener("message", onMessage);
    };
  }, [route]);

  return isTabOpen;
};

export default useSingleTabRoute;

// import { useEffect, useState } from "react";

// const useSingleTabRoute = (route: string) => {
//   const [isTabOpen, setIsTabOpen] = useState(false);
//   const channel = new BroadcastChannel("route_channel");

//   useEffect(() => {
//     console.log("channel-----", channel);
//     channel.onmessage = (event) => {
//       if (event.data === route) {
//         setIsTabOpen(true);
//       }
//     };
//     channel.postMessage(route);

//     const onBeforeUnload = () => {
//       channel.postMessage(`${route}_closed`);
//     };

//     window.addEventListener("beforeunload", onBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", onBeforeUnload);
//       channel.close();
//     };
//   }, [route]);

//   return isTabOpen;
// };

// export default useSingleTabRoute;
