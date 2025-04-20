import { BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

interface Prompt {
  id: string;
  content: string;
  type: "USER" | "SYSTEM";
  createdAt: Date;
}

export function usePrompts(projectId: string) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    async function getPrompts() {
      try {
        const token = await getToken();
        const res = await axios.get(`${BACKEND_URL}/prompts/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrompts(res.data.prompts);
      } catch (error: any) {
        if (error.response) {
          console.error("Server error:", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      }
    }

    getPrompts();
    const interval = setInterval(getPrompts, 1000);
    return () => clearInterval(interval);
  }, [projectId, getToken]);

  return { prompts };
}
