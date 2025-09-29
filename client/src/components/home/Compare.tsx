import React from "react";
import { Compare } from "@/components/ui/compare";

export default function ComparePhoto() {
  return (
    <Compare
      firstImage="https://drosinakis.app/static/pic9.jpeg"
      secondImage="https://drosinakis.app/static/pic7.jpeg"
      firstImageClassName="object-cover object-left-top"
      secondImageClassname="object-cover object-left-top"
      className="h-[250px] w-[200px] md:h-[500px] md:w-[500px]"
      slideMode="hover"
    />
  );
}
