"use client";
// FIXME: Refactor
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ShinyButton } from "./magicui/shiny-button";
import { useRouter } from "next/navigation";

const RootHeader = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [currentPathname, setCurrentPathname] = useState<string>("#about");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleScroll = (): void => {
    window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const data = [
    {
      title: "about",
      url: "#about",
    },
    {
      title: "pricing",
      url: "#pricing",
    },
    {
      title: "testimonials",
      url: "#testimonials",
    },
    {
      title: "privacy",
      url: "#privacy",
    },
    {
      title: "help",
      url: "#help",
    },
  ];

  //FIXME: navlink active toggle
  return (
    <header
      className={cn(
        "bg-white dark:bg-background border-b fixed top-0 left-0 w-full z-50",
        isScrolled ? "" : "border-transparent"
      )}
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block" href="#">
              <span className="sr-only">Home</span>
              <Image
                src={"logo.svg"}
                alt="logo"
                width={100}
                height={40}
                className="dark:invert-100"
              />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                {data.map((nav, index) => (
                  <li key={index}>
                    <Link
                      className={cn(
                        "hover:text-primary/80 transition dark:hover:text-primary/75 capitalize",
                        nav.url === currentPathname
                          ? "text-primary/80 dark:text-primary/75"
                          : "text-primary/60 dark:text-primary/40"
                      )}
                      href={nav.url}
                      onClick={() => setCurrentPathname(nav.url)}
                    >
                      {nav.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            <div className="sm:flex sm:gap-4">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <ShinyButton onClick={() => router.push("/dashboard")}>
                  Sign in
                </ShinyButton>
              </SignedOut>
            </div>

            <div className="block md:hidden">
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setIsMobileNavOpen((prev) => !prev)}
                className="transition"
              >
                {isMobileNavOpen ? (
                  <XIcon className="size-5 text-destructive" />
                ) : (
                  <Menu className="size-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed top-0 left-0 w-[70%] h-screen z-50 bg-background border-e items-center justify-center md:hidden transition-all",
          isMobileNavOpen ? "flex" : "hidden"
        )}
      >
        <nav aria-label="Global">
          <ul className="flex items-center flex-col gap-6 text-sm">
            {data.map((nav, index) => (
              <li key={index}>
                <Link
                  className={cn(
                    "hover:text-primary/80 transition dark:hover:text-primary/75 capitalize",
                    nav.url === currentPathname
                      ? "text-primary/80 dark:text-primary/75"
                      : "text-primary/60 dark:text-primary/40"
                  )}
                  href={nav.url}
                  onClick={() => setCurrentPathname(nav.url)}
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default RootHeader;
