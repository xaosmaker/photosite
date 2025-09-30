import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
//WARN: need form validation to be secure
export default function ContactForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="full-name">Full Name *</Label>
        <Input id="full-name" type="text" placeholder="John Smith" required />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="full-name">Email *</Label>
        <Input
          id="full-name"
          type="email"
          placeholder="johnSmith@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="telephone">Telephone *</Label>
        </div>
        <Input id="telephone" type="text" required />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="message">Message *</Label>
        </div>
        <Textarea id="massage" required />
      </div>

      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
}
