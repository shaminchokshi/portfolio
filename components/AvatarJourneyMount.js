"use client";
import dynamic from "next/dynamic";

const AvatarJourney = dynamic(() => import("./AvatarJourney"), { ssr: false });

export default function AvatarJourneyMount() {
  return <AvatarJourney />;
}