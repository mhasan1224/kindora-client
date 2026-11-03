
"use client";

import { useState } from "react";
import { getAccessToken } from "@/lib/get-access-token";

export default function JWTTestPage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTestJWT = async () => {
    try {
      setLoading(true);
      setResult("");

      const token = await getAccessToken();

      const response = await fetch(
        "http://localhost:8000/jwt-test",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "JWT verification failed");
      }

      setResult(data.message);
    } catch (error) {
      setResult(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-6">
      <h1 className="text-2xl font-bold">JWT Authentication Test</h1>

      <button
        onClick={handleTestJWT}
        disabled={loading}
        className="rounded-lg bg-emerald-600 px-6 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Testing..." : "Test JWT"}
      </button>

      {result && <p>{result}</p>}
    </main>
  );
}
