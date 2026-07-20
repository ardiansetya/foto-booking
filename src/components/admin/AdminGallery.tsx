"use client";

import {
  DatabaseZap,
  Eye,
  EyeOff,
  LogOut,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { AdminPhoto, GalleryCategory } from "@/lib/gallery";

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
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const photos = initialPhotos.filter((p) => p.category === tab);
  const seedRemaining = initialPhotos.filter(
    (p) => !p.managed && !p.hidden,
  ).length;

  const migrate = async () => {
    if (
      !confirm(
        `Pindahkan ${seedRemaining} foto bawaan ke Blob agar bisa dihapus? Proses ini aman diulang.`,
      )
    )
      return;
    setMigrating(true);
    const res = await fetch("/api/admin/migrate", { method: "POST" });
    const data = (await res.json().catch(() => ({}))) as { migrated?: number };
    setMigrating(false);
    alert(
      res.ok
        ? `${data.migrated ?? 0} foto berhasil dipindahkan.`
        : "Gagal memindahkan foto.",
    );
    refresh();
  };

  const refresh = () => router.refresh();

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);
      form.append("category", tab);
      form.append("alt", `Foto ${tab}`);
      await fetch("/api/admin/upload", { method: "POST", body: form });
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    refresh();
  };

  const del = async (id: string) => {
    if (!confirm("Hapus foto ini dari website?")) return;
    setBusy(true);
    await fetch("/api/admin/photo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setBusy(false);
    refresh();
  };

  const patch = async (id: string, body: Record<string, unknown>) => {
    setBusy(true);
    await fetch("/api/admin/photo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...body }),
    });
    setBusy(false);
    refresh();
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
            const count = initialPhotos.filter(
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

      {/* Migrate repo photos to Blob */}
      {blobReady && seedRemaining > 0 && (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 p-4">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Ada {seedRemaining} foto bawaan yang belum bisa dihapus. Pindahkan
            ke Blob agar bisa dikelola penuh.
          </p>
          <button
            type="button"
            disabled={migrating}
            onClick={migrate}
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-amber-400 px-5 py-2.5 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            <DatabaseZap className="h-4 w-4" />
            {migrating ? "Memindahkan..." : "Pindahkan ke Blob"}
          </button>
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
                  className="object-cover"
                />
                {p.featured && (
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-semibold text-zinc-950">
                    <Star className="h-3 w-3" />
                    Unggulan
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-1 p-2 bg-white dark:bg-zinc-900">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => patch(p.id, { featured: !p.featured })}
                  title={p.featured ? "Lepas unggulan" : "Jadikan unggulan"}
                  className={`p-1.5 rounded-md transition-colors disabled:opacity-40 ${
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
                    disabled={busy}
                    onClick={() => patch(p.id, { hidden: false })}
                    title="Tampilkan lagi"
                    className="p-1.5 rounded-md text-zinc-400 hover:text-emerald-500 transition-colors disabled:opacity-40"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={busy || !blobReady}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
