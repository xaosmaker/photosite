"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function AdminPanelButton() {
  const { data: session } = useSession();
  console.log(session?.user);

  if (session?.user) {
    return (
      <Button asChild>
        <Link href="/admin">Admin Panel</Link>
      </Button>
    );
  }
}
