"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

function AppHeader() {
  const pathname = usePathname().split("/");
  return (
    <>
      <header className="flex justify-between sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {pathname.map((path, index) => (
                <>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">{path}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {index != pathname.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
    </>
  );
}

export default AppHeader;
