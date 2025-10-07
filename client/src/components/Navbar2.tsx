"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar2() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full bg-white px-4 py-3 shadow-md">
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center text-xl font-bold">Logo</div>
          {/* Desktop Menu */}
          <ul className="hidden items-center justify-center gap-8 md:flex">
            <li>
              <a href="#" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
          {/* Right: Theme Button & Contact (Desktop) */}
          <div className="flex items-center justify-end gap-4">
            <button className="rounded bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300">
              Theme
            </button>
            <span className="text-sm text-gray-500">contact@email.com</span>
          </div>
          {/* Hamburger Icon (Mobile) */}
          <button
            className="group flex flex-col gap-1.5 justify-self-end md:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </nav>
      {/* Mobile Menu Slide Down */}
      <div
        className={`bg-opacity-90 fixed top-[64px] right-0 left-0 z-10 bg-black transition-transform duration-300 ease-in-out ${menuOpen ? "translate-y-0" : "-translate-y-96"} md:hidden`}
        style={{ height: menuOpen ? "calc(100vh - 64px)" : "0px" }}
      >
        <button
          className="absolute top-6 right-6 text-3xl font-bold text-white"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          <X />
        </button>
        <div className="flex h-full flex-col items-center justify-center gap-10 pt-10">
          <ul className="flex flex-col gap-8 text-2xl text-white">
            <li>
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-400"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-400"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-400"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-400"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
