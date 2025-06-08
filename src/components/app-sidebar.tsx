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
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import staticData from "@/data/static-sidebar.json";
import { useSidebarItems } from "@/hooks/use-sidebar-items";
import { toast } from "sonner";
import { setInitialState } from "@/store/features/sidebar-slice";
import { Skeleton } from "./ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebarState = useAppSelector((state) => state.sidebar);
  const tokenState = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();
  const user = useUser();
  const pathname = usePathname();
  const pathnameArr = usePathname().split("/");
  const router = useRouter();

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
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={"logo.svg"}
              alt="logo"
              width={90}
              height={40}
              className="dark:invert-100"
            />
            <Badge variant="secondary">Beta</Badge>
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
                      <SidebarMenuButton
                        asChild
                        isActive={
                          speech.id === pathnameArr[pathnameArr.length - 1]
                        }
                      >
                        <Link href={`/dashboard/arena/${speech.id}`}>
                          {speech.title}
                        </Link>
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
                    <SidebarMenuButton asChild isActive={item.url === pathname}>
                      <Link href={item.url}>
                        {item.title}{" "}
                        {item.future === "1" && (
                          <Badge variant={"secondary"}>Future Updates</Badge>
                        )}
                      </Link>
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
          <CardHeader>
            <CardTitle>Create speech</CardTitle>
            <CardDescription>Start a new speech, on one click</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2.5 px-4">
            <Button
              className="w-full shadow-none"
              size="sm"
              onClick={() =>
                router.push(
                  tokenState.tokens > 0 ? "/dashboard" : "/dashboard/billing"
                )
              }
            >
              {tokenState.tokens > 0 ? "New Speech" : "Purchase tokens"}
            </Button>
          </CardContent>
        </Card>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
