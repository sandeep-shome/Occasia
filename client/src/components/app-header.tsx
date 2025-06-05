"use client";

import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Copyright } from "lucide-react";
import { useFetchTokens } from "@/hooks/use-fetch-token";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { initToken } from "@/store/features/token-slice";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { stat } from "fs";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { ModeToggle } from "./theme-toogler";

function AppHeader() {
  const user = useUser();
  const { pending, error, getTokens } = useFetchTokens();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.token);

  const handleGetToken = async (id: string) => {
    const data = await getTokens(id);
    if (error) toast.warning(error);
    data && dispatch(initToken(data!));
  };

  useEffect(() => {
    if (user.isLoaded) {
      handleGetToken(user.user?.id || "");
    }
  }, [user.isLoaded]);
  return (
    <>
      <header className="flex justify-between sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
        <div className="flex items-center gap-4">
          {pending ? (
            <Skeleton className="w-12 h-5 rounded-full" />
          ) : (
            <Link
              href="/dashboard/subscription"
              className={cn(
                "border rounded-full flex items-center gap-1 px-2 py-0.5",
                state.tokens > 0
                  ? "border-secondary text-primary"
                  : "border-red-400 text-red-400"
              )}
            >
              <Copyright className="size-4" />
              <span className="text-sm">{state.tokens}</span>
            </Link>
          )}
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
    </>
  );
}

export default AppHeader;
