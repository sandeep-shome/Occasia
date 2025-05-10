import * as React from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Recent Speechs",
      url: "#",
      items: [
        {
          title: "Wedding Speech",
          url: "#",
        },
        {
          title: "College Tribute",
          url: "#",
        },
      ],
    },
    {
      title: "General",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
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
                <Progress max={10} value={5} />
                <p className="flex items-center text-xs">
                  <span>5</span> / <span>10</span>
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
