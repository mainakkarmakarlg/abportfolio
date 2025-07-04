"use client";
import PageLink from "@/components/(page)/links/PageLink";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import React from "react";

function page() {
  return (
    <AuroraBackground>
      <PageLink />
    </AuroraBackground>
  );
}

export default page;
