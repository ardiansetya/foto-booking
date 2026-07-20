"use client";

import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(
        res.status === 401 ? "Password salah." : "Login gagal. Coba lagi.",
      );
    }
  };

  return (
    <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 mb-6">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
          Admin Galeri
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          Masuk untuk mengelola foto website.
        </p>

        <label
          htmlFor="password"
          className="text-sm font-medium text-zinc-800 dark:text-zinc-200 block mb-2"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:border-amber-400"
        />
        {error && (
          <p className="mt-2 text-xs text-red-500 dark:text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || password === ""}
          className="mt-6 w-full inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
