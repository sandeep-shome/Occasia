import { ScrollProgress } from "@/components/magicui/scroll-progress";
import RootFooter from "@/components/root-footer";
import RootHeader from "@/components/root-header";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <RootHeader />
      <ScrollProgress className="top-[55px]" />
      <main className="pt-20 w-full mx-auto max-w-screen-xl min-h-screen">
        {children}
      </main>
      <RootFooter />
    </>
  );
};

export default Layout;
