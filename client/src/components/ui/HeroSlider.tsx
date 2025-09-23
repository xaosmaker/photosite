"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "motion/react";
import { cn } from "@/lib/utils";

export default function HeroSlider({
  images,
  children,
  className,
}: {
  images: React.ReactElement[];
  children?: React.ReactNode;
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 === images.length ? 0 : prevIndex + 1,
      );
    };
    // autoplay
    let interval: NodeJS.Timeout;
    if (true) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  const ease = cubicBezier(0.645, 0.045, 0.355, 1.0);
  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: ease,
      },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className,
      )}
      style={{
        perspective: "1000px",
      }}
    >
      {children}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="visible"
          exit={"upExit"}
          variants={slideVariants}
          className="absolute inset-0 h-full w-full brightness-[45%]"
        >
          {images[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
