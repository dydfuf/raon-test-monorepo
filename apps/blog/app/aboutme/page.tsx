import React from "react";
import MainBanner from "../MainBanner.server";
import NameCard from "./NameCard.server";

export const metadata = {
  title: "about me",
};

export default function page() {
  return (
    <div>
      <MainBanner />
      <NameCard />
    </div>
  );
}
