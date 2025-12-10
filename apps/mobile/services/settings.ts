import { ServerData } from "@/types/settings";
import { api } from "./api";

export async function getDataFromServer(): Promise<ServerData | null> {
  try {
    const response = await api.get("/settings");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
