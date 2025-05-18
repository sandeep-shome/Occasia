"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useAppDispatch, useAppSelector } from "@/store/store";
import staticData from "@/data/static-sidebar.json";
import { useSidebarItems } from "@/hooks/use-sidebar-items";
import { toast } from "sonner";
import { setInitialState } from "@/store/features/sidebar-slice";
import { Skeleton } from "./ui/skeleton";
import { useUser } from "@clerk/nextjs";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebarState = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();
  const user = useUser();
  const { pending, error, getSidebarItems } = useSidebarItems();

  const handleFetchSidebarItems = async () => {
    const userId = user.user?.id || "";
    const data = await getSidebarItems(userId);
    if (error) {
      toast(error);
      return;
    }
    if (data) dispatch(setInitialState(data.data));
  };

  React.useEffect(() => {
    if (user.isLoaded) {
      handleFetchSidebarItems();
    }
  }, [user.isLoaded]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="w-full flex items-center justify-between px-2 py-2">
          <Link href={"/"}>
            <Image src={logo} alt="logo" width={90} />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarGroup>
          <SidebarGroupLabel>Recent Speeches</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {pending
                ? Array(4)
                    .fill(true)
                    .map((_, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton asChild>
                          <Skeleton className="w-full h-1" />
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                : sidebarState.items.map((speech, index) => (
                    <SidebarMenuItem key={speech.id}>
                      <SidebarMenuButton asChild>
                        <Link href={speech.url}>{speech.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {staticData.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Card className="shadow-none">
          <form>
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-sm">
                Subscribe to our newsletter
              </CardTitle>
              <CardDescription>
                Opt-in to receive updates and news about the sidebar.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2.5 p-4">
              <div className="flex items-center gap-2">
                <Progress max={10} value={33} />
                <p className="flex items-center text-xs">
                  <span>1</span> / <span>3</span>
                </p>
              </div>
              <Button
                className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
                size="sm"
              >
                Upgrade
              </Button>
            </CardContent>
          </form>
        </Card>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
