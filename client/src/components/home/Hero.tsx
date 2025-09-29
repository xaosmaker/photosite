"use client";
import Image from "next/image";
import React from "react";
import HeroSlider from "@/components/ui/HeroSlider";

export default function Hero() {
  const images = [
    "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const imgs = images.map((src) => {
    return (
      <Image
        key={src}
        src={src}
        alt="alt"
        fill
        className="h-full w-full object-cover object-center"
      />
    );
  });

  return (
    <HeroSlider className="h-screen" images={imgs}>
      <h1 className="z-10 flex w-3/4 flex-col gap-6 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text py-4 text-left text-xl/relaxed text-transparent capitalize md:text-4xl">
        <span className="text-center font-bold">Η ζωή είναι στιγμές.</span>
        <span className="italic">
          Οι στιγμές περνούν — οι φωτογραφίες τις κρατούν ζωντανές για πάντα.
        </span>
        <span className="text-lg/relaxed md:text-3xl">
          Μπορούμε να τις κάνουμε αιώνιες.
        </span>
      </h1>
    </HeroSlider>
  );
}
