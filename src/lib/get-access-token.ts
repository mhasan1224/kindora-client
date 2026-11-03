
import { authClient } from "./auth-client";

export async function getAccessToken(): Promise<string> {
  const result = await authClient.token();

  if (result.error || !result.data?.token) {
    throw new Error("Failed to get access token");
  }

  return result.data.token;
}
