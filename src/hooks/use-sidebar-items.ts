import logger from "@/lib/logger";
import axios from "axios";
import { useState } from "react";

export const useSidebarItems = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  async function getSidebarItems(id: string) {
    setPending(true);
    try {
      const data = await axios.get(`/api/fetch/sidebar/${id}`);
      return data;
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
