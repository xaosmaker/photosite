import Hero from "@/components/home/Hero";
import { TimelineDemo } from "@/components/home/Timeline";

export default function Home() {
  return (
    <div>
      <Hero />
      <TimelineDemo id="about" />
    </div>
  );
}
