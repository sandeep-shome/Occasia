"use client";

import AppHeader from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import StoreProvider from "@/lib/store-provider";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <StoreProvider>
      <div className="">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppHeader />
            <main className="p-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </StoreProvider>
  );
};

export default DashboardLayout;
