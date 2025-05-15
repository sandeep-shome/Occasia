"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clipboard, Download, Pen, RotateCcw } from "lucide-react";

function page() {
  return (
    <>
      <section className="w-full flex items-center justify-center">
        <Card className="w-full lg:w-[60%]">
          <CardHeader>
            <CardTitle>Create Speech</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant={"outline"} size={"icon"}>
                  <Pen className="size-4 text-neutral-600" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant={"outline"} size={"icon"}>
                  <Clipboard className="size-4 text-neutral-600" />
                </Button>
                <Button variant={"outline"} size={"icon"}>
                  <RotateCcw className="size-4 text-neutral-600" />
                </Button>
                <Button variant={"outline"} size={"icon"}>
                  <Download className="size-4 text-neutral-600" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5"></CardContent>
          <CardFooter></CardFooter>
        </Card>
      </section>
    </>
  );
}

export default page;
