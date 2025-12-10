import * as SecureStore from "expo-secure-store";
import { api } from "./api";
import { User } from "@/types";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

async function getOrCreateDeviceId() {
  let id = await SecureStore.getItemAsync("deviceId");
  if (!id) {
    id = uuidv4();
    await SecureStore.setItemAsync("deviceId", id);
  }
  return id;
}

export async function checkLoginState() {
  const token = await SecureStore.getItemAsync("token");
  const user = await SecureStore.getItemAsync("user");
  if (token && user) {
    return true;
  }
  return false;
}

export async function loginAsGuest(): Promise<{
  user: User;
  token: string;
} | null> {
  try {
    const deviceId = await getOrCreateDeviceId();
    // Call your backend API for guest login
    const response = await api.post("/auth/guest", { deviceId });
    if (response.data) {
      // Store the token in secure storage
      await SecureStore.setItemAsync("token", response.data.token);
      await SecureStore.setItemAsync(
        "user",
        JSON.stringify(response.data.user)
      );
      return { user: response.data.user, token: response.data.token };
    }

    return null;
  } catch (error) {
    console.error("Guest login failed:", error);
    return null;
  }
}

// Do login using email and password
