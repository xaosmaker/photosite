import { Card, CardContent } from "@/components/ui/card";
import ContactCard from "@/features/contact/ContactCard";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <Image
              fill
              src="https://drosinakis.app/static/pic6.jpeg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <ContactCard />
        </CardContent>
      </Card>
    </div>
  );
}
