import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "https://kindora-frontend-five.vercel.app",
  plugins: [jwtClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;