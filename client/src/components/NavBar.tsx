"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { redirect } from "next/navigation";
import { useState } from "react";
import { ModeToggle } from "./ModToggle";

export default function NavBar() {
  const navItems = [
    { name: "Home", link: "/" },
    {
      name: "About",
      link: "/#about",
    },
    {
      name: "Shop",
      link: "#pricing",
    },
    {
      name: "Gallery",
      link: "/gallery",
    },
  ];
  function onClick() {
    redirect("contact");
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //WARN: need to change the a to Link for rect and need to customize the z indent
  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody className="top-2">
        {/* <NavbarLogo /> */}
        <div className="font-extrabold italic text-shadow-zinc-50">Siou</div>
        <NavItems items={navItems} />
        <div className="z-10 flex items-center gap-4">
          <NavbarButton onClick={onClick} variant="primary">
            Get in touch
          </NavbarButton>
          <ModeToggle />
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav className="top-2">
        <MobileNavHeader>
          <div className="font-extrabold italic text-shadow-zinc-50">Siou</div>
          {/* <NavbarLogo /> */}
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="z-10 flex w-full flex-col gap-4">
            <NavbarButton
              onClick={() => {
                setIsMobileMenuOpen(false);
                onClick();
              }}
              variant="primary"
              className="w-full capitalize"
            >
              Get in touch
            </NavbarButton>
            <ModeToggle />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
