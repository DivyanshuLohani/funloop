// src/utils/devReset.ts
import * as SecureStore from "expo-secure-store";

export async function clearAppSession() {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("user");
  await SecureStore.deleteItemAsync("deviceId");
}
