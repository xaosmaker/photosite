import Hero from "@/features/home/Hero";
import { TimelineDemo } from "@/features/home/Timeline";

export default function Home() {
  return (
    <div>
      <Hero />
      <TimelineDemo id="about" />
    </div>
  );
}
