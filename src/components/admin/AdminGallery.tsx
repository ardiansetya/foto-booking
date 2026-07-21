"use client";

import { upload } from "@vercel/blob/client";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Eraser,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { AdminPhoto, GalleryCategory } from "@/lib/gallery";

type Item = AdminPhoto & { temp?: boolean };

const KEY = ["admin-photos"] as const;

interface Props {
  initialPhotos: AdminPhoto[];
  categories: { id: GalleryCategory; label: string }[];
  blobReady: boolean;
}

async function toWebp(
  file: File,
): Promise<{ blob: Blob; width: number; height: number }> {
  const bitmap = await createImageBitmap(file);
  let { width, height } = bitmap;
  const max = 2000;
  if (width > max || height > max) {
    const s = Math.min(max / width, max / height);
    width = Math.round(width * s);
    height = Math.round(height * s);
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, width, height);
  const blob = await new Promise<Blob>((res, rej) =>
    canvas.toBlob(
      (b) => (b ? res(b) : rej(new Error("convert_failed"))),
      "image/webp",
      0.82,
    ),
  );
  bitmap.close();
  return { blob, width, height };
}

export default function AdminGallery({
  initialPhotos,
  categories,
  blobReady,
}: Props) {
  const router = useRouter();
  const qc = useQueryClient();
  const [tab, setTab] = useState<GalleryCategory>(categories[0].id);
  const [temps, setTemps] = useState<Item[]>([]);
  const [pending, setPending] = useState<Item[]>([]); // uploaded, awaiting manifest propagation
  const [removed, setRemoved] = useState<string[]>([]); // deleted, awaiting propagation
  const [featuredOverride, setFeaturedOverride] = useState<
    Record<string, boolean>
  >({});
  const [uploading, setUploading] = useState(false);
  const [cleaning, setCleaning] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const cleanup = async () => {
    if (!confirm("Hapus file duplikat/orphan di penyimpanan?")) return;
    setCleaning(true);
    const res = await fetch("/api/admin/cleanup", { method: "POST" });
    const data = (await res.json().catch(() => ({}))) as { deleted?: number };
    setCleaning(false);
    alert(
      res.ok
        ? `${data.deleted ?? 0} file duplikat dihapus.`
        : "Gagal membersihkan.",
    );
  };

  const { data: list = [] } = useQuery({
    queryKey: KEY,
    queryFn: async (): Promise<AdminPhoto[]> => {
      const res = await fetch("/api/admin/photo");
      if (!res.ok) throw new Error("fetch_failed");
      const data = (await res.json()) as { photos: AdminPhoto[] };
      return data.photos;
    },
    initialData: initialPhotos,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      fetch("/api/admin/photo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueryData<AdminPhoto[]>(KEY);
      qc.setQueryData<AdminPhoto[]>(KEY, (old = []) => {
        const target = old.find((p) => p.id === id);
        return target?.managed
          ? old.filter((p) => p.id !== id)
          : old.map((p) => (p.id === id ? { ...p, hidden: true } : p));
      });
      setRemoved((r) => [...r, id]);
      return { prev };
    },
    onError: (_e, id, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev);
      setRemoved((r) => r.filter((x) => x !== id));
    },
    onSettled: () => {
      for (const delay of [0, 2500, 6000]) {
        setTimeout(() => qc.invalidateQueries({ queryKey: KEY }), delay);
      }
    },
  });

  const patchMutation = useMutation({
    mutationFn: (v: { id: string; featured?: boolean; hidden?: boolean }) =>
      fetch("/api/admin/photo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      }),
    onMutate: async (v) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueryData<AdminPhoto[]>(KEY);
      qc.setQueryData<AdminPhoto[]>(KEY, (old = []) =>
        old.map((p) => (p.id === v.id ? { ...p, ...v } : p)),
      );
      if (typeof v.featured === "boolean") {
        setFeaturedOverride((o) => ({ ...o, [v.id]: v.featured as boolean }));
      }
      if (v.hidden === false) {
        setRemoved((r) => r.filter((x) => x !== v.id));
      }
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev);
    },
    onSettled: () => {
      for (const delay of [0, 2500, 6000]) {
        setTimeout(() => qc.invalidateQueries({ queryKey: KEY }), delay);
      }
    },
  });

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const arr = Array.from(files);
    const newTemps: Item[] = arr.map((f) => ({
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
    setTemps((prev) => [...prev, ...newTemps]);
    setUploading(true);

    const uploadCat = tab;
    const results = await Promise.all(
      arr.map(async (file): Promise<Item | null> => {
        try {
          const { blob, width, height } = await toWebp(file);
          const id = crypto.randomUUID();
          const result = await upload(`gallery/${uploadCat}/${id}.webp`, blob, {
            access: "public",
            handleUploadUrl: "/api/blob-upload",
            contentType: "image/webp",
          });
          await fetch("/api/admin/photo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id,
              src: result.url,
              width,
              height,
              alt: `Foto ${uploadCat}`,
              category: uploadCat,
            }),
          });
          return {
            id,
            src: result.url,
            width,
            height,
            alt: `Foto ${uploadCat}`,
            category: uploadCat,
            managed: true,
            hidden: false,
          };
        } catch {
          return null;
        }
      }),
    );

    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    for (const t of newTemps) URL.revokeObjectURL(t.src);
    setTemps((prev) => prev.filter((t) => !newTemps.includes(t)));

    // Keep uploaded photos visible until the (CDN-cached) manifest catches up.
    const uploaded = results.filter((r): r is Item => r !== null);
    setPending((prev) => [...prev, ...uploaded]);
    for (const delay of [0, 2500, 6000]) {
      setTimeout(() => qc.invalidateQueries({ queryKey: KEY }), delay);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  const pendingRef = useRef<Item[]>(pending);
  pendingRef.current = pending;

  // Release local overrides once the refetched list agrees with them.
  useEffect(() => {
    const pendingIds = new Set(pendingRef.current.map((p) => p.id));
    setPending((prev) => prev.filter((p) => !list.some((l) => l.id === p.id)));
    setRemoved((prev) => prev.filter((id) => list.some((l) => l.id === id)));
    setFeaturedOverride((prev) => {
      const next: Record<string, boolean> = {};
      let changed = false;
      for (const [id, v] of Object.entries(prev)) {
        const found = list.find((l) => l.id === id);
        if (found) {
          // Keep the override until the server reports the same value.
          if (Boolean(found.featured) !== v) next[id] = v;
          else changed = true;
        } else if (pendingIds.has(id)) {
          next[id] = v; // photo still propagating, keep override
        } else {
          changed = true; // photo gone, drop override
        }
      }
      return changed ? next : prev;
    });
  }, [list]);

  // Apply local (not yet propagated) changes on top of any photo.
  const applyLocal = <T extends Item>(p: T): T =>
    p.id in featuredOverride
      ? { ...p, featured: featuredOverride[p.id] }
      : p;

  const effective: AdminPhoto[] = list
    .filter((p) => !removed.includes(p.id))
    .map(applyLocal);

  const livePending = pending
    .filter((p) => !removed.includes(p.id))
    .map(applyLocal);

  const effectiveIds = new Set(effective.map((p) => p.id));
  const photos: Item[] = [
    ...temps.filter((p) => p.category === tab),
    ...livePending.filter((p) => p.category === tab && !effectiveIds.has(p.id)),
    ...effective.filter((p) => p.category === tab),
  ];

  return (
    <div>
      {/* Tabs + logout */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const count =
              effective.filter((p) => p.category === c.id && !p.hidden)
                .length +
              livePending.filter(
                (p) => p.category === c.id && !effectiveIds.has(p.id),
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
        <div className="flex items-center gap-2">
          {blobReady && (
            <button
              type="button"
              disabled={cleaning}
              onClick={cleanup}
              title="Hapus file duplikat/orphan di penyimpanan"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {cleaning ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Eraser className="h-4 w-4" />
              )}
              Bersihkan
            </button>
          )}
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </div>

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
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
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
                    onClick={() =>
                      patchMutation.mutate({ id: p.id, featured: !p.featured })
                    }
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
                      onClick={() =>
                        patchMutation.mutate({ id: p.id, hidden: false })
                      }
                      title="Tampilkan lagi"
                      className="p-1.5 rounded-md text-zinc-400 hover:text-emerald-500 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={!blobReady}
                      onClick={() => {
                        if (confirm(p.managed ? "Hapus foto ini?" : "Sembunyikan foto bawaan?"))
                          deleteMutation.mutate(p.id);
                      }}
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
