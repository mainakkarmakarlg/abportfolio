"use client";
import useSingleTabRoute from "@/app/hooks/useSingleTabRoute";
import PageLink from "@/components/(page)/links/PageLink";
import { AuroraBackground } from "@/components/ui/aurora-background";
import React from "react";

function page() {
  const route = "/links";
  const isTabOpen = useSingleTabRoute(route);

  if (isTabOpen) {
    return (
      <div>
        You have already opened this page in another tab. Please use the other
        tab.
      </div>
    );
  }
  return (
    <AuroraBackground>
      <PageLink />
    </AuroraBackground>
  );
}

export default page;
