"use client";

import { Eye, EyeOff, Loader2, LogOut, Star, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { AdminPhoto, GalleryCategory } from "@/lib/gallery";

type Item = AdminPhoto & { temp?: boolean };

interface Props {
  initialPhotos: AdminPhoto[];
  categories: { id: GalleryCategory; label: string }[];
  blobReady: boolean;
}

export default function AdminGallery({
  initialPhotos,
  categories,
  blobReady,
}: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<GalleryCategory>(categories[0].id);
  const [list, setList] = useState<Item[]>(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const migrateStarted = useRef(false);

  // Re-sync with server truth after any router.refresh().
  useEffect(() => {
    setList(initialPhotos);
  }, [initialPhotos]);

  const photos = list.filter((p) => p.category === tab);
  const seedRemaining = list.filter((p) => !p.managed && !p.hidden).length;

  // One-time auto migration of repo seed photos into Blob (no button).
  useEffect(() => {
    if (!blobReady || seedRemaining === 0 || migrateStarted.current) return;
    migrateStarted.current = true;
    setMigrating(true);
    (async () => {
      for (let i = 0; i < 10; i++) {
        const res = await fetch("/api/admin/migrate", { method: "POST" });
        const data = (await res.json().catch(() => ({}))) as {
          remaining?: number;
        };
        if (!res.ok || (data.remaining ?? 0) === 0) break;
      }
      setMigrating(false);
      router.refresh();
    })();
  }, [blobReady, seedRemaining, router]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const arr = Array.from(files);
    const temps: Item[] = arr.map((f) => ({
      id: `tmp-${crypto.randomUUID()}`,
      src: URL.createObjectURL(f),
      width: 1,
      height: 1,
      alt: `Foto ${tab}`,
      category: tab,
      managed: true,
      hidden: false,
      temp: true,
    }));
    setList((prev) => [...temps, ...prev]); // show instantly
    setUploading(true);
    for (const file of arr) {
      const form = new FormData();
      form.append("file", file);
      form.append("category", tab);
      form.append("alt", `Foto ${tab}`);
      await fetch("/api/admin/upload", { method: "POST", body: form });
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    for (const t of temps) URL.revokeObjectURL(t.src);
    router.refresh(); // reconcile temps with real photos
  };

  const del = async (id: string) => {
    const target = list.find((p) => p.id === id);
    if (!target) return;
    if (
      !confirm(
        target.managed ? "Hapus foto ini?" : "Sembunyikan foto bawaan ini?",
      )
    )
      return;
    // Optimistic: managed -> remove, seed -> mark hidden.
    setList((prev) =>
      target.managed
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) => (p.id === id ? { ...p, hidden: true } : p)),
    );
    const res = await fetch("/api/admin/photo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) router.refresh(); // revert to server truth on failure
  };

  const patch = async (
    id: string,
    body: { featured?: boolean; hidden?: boolean },
  ) => {
    // Optimistic local update.
    setList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...body } : p)),
    );
    const res = await fetch("/api/admin/photo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...body }),
    });
    if (!res.ok) router.refresh();
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div>
      {/* Tabs + logout */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const count = list.filter(
              (p) => p.category === c.id && !p.hidden,
            ).length;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setTab(c.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  tab === c.id
                    ? "bg-amber-400 text-zinc-950"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {c.label}
                <span className="text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>

      {/* Auto migration notice */}
      {migrating && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-amber-800 dark:text-amber-300">
          <Loader2 className="h-4 w-4 animate-spin" />
          Memindahkan foto bawaan ke penyimpanan... jangan tutup halaman.
        </div>
      )}

      {/* Upload */}
      {blobReady && (
        <div className="mb-8">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => handleUpload(e.target.files)}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            <Upload className="h-4 w-4" />
            {uploading
              ? "Mengupload..."
              : `Upload Foto ${categories.find((c) => c.id === tab)?.label}`}
          </button>
        </div>
      )}

      {/* Grid */}
      {photos.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 py-12 text-center">
          Belum ada foto di kategori ini.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((p) => (
            <div
              key={p.id}
              className={`group relative overflow-hidden rounded-xl border ${
                p.hidden
                  ? "border-zinc-300 dark:border-zinc-700 opacity-50"
                  : "border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <div className="relative aspect-square bg-zinc-200 dark:bg-zinc-800">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  unoptimized={p.temp}
                  className="object-cover"
                />
                {p.temp && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  </div>
                )}
                {p.featured && !p.temp && (
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-semibold text-zinc-950">
                    <Star className="h-3 w-3" />
                    Unggulan
                  </span>
                )}
              </div>

              {!p.temp && (
                <div className="flex items-center justify-between gap-1 p-2 bg-white dark:bg-zinc-900">
                  <button
                    type="button"
                    onClick={() => patch(p.id, { featured: !p.featured })}
                    title={p.featured ? "Lepas unggulan" : "Jadikan unggulan"}
                    className={`p-1.5 rounded-md transition-colors ${
                      p.featured
                        ? "text-amber-500"
                        : "text-zinc-400 hover:text-amber-500"
                    }`}
                  >
                    <Star className="h-4 w-4" />
                  </button>

                  {p.hidden ? (
                    <button
                      type="button"
                      onClick={() => patch(p.id, { hidden: false })}
                      title="Tampilkan lagi"
                      className="p-1.5 rounded-md text-zinc-400 hover:text-emerald-500 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!blobReady}
                      onClick={() => del(p.id)}
                      title={p.managed ? "Hapus foto" : "Sembunyikan foto"}
                      className="p-1.5 rounded-md text-zinc-400 hover:text-red-500 transition-colors disabled:opacity-40"
                    >
                      {p.managed ? (
                        <Trash2 className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
