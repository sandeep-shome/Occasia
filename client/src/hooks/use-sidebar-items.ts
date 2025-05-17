import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

const useSidebarItems = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  async function getSidebarItems() {
    setPending(true);
    const user = useUser();
    try {
      const speechData = await prisma.speech.findMany({
        select: {
          name: true,
          id: true,
        },
        where: {
          userId: user.user?.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return speechData;
    } catch (error) {
      logger(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setPending(false);
    }
  }

  return { error, pending, getSidebarItems };
};
