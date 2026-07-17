"use client";

import {
  Check,
  Copy,
  FolderOpen,
  ImageOff,
  Link2,
  MessageCircle,
  X,
  ZoomIn,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { SITE_URL, WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from "@/lib/constants";

interface DriveFile {
  id: string;
  name: string;
}

type FetchState = "idle" | "loading" | "ready" | "error";

function extractFolderId(input: string): string {
  const match = input.match(/folders\/([\w-]+)/);
  if (match) return match[1];
  return input.trim();
}

function thumbUrl(id: string, size: number): string {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;
}

async function fetchAllImages(folderId: string): Promise<DriveFile[]> {
  const res = await fetch(`/api/drive?f=${encodeURIComponent(folderId)}`);
  if (!res.ok) throw new Error(`Drive proxy ${res.status}`);
  const data: { files?: DriveFile[] } = await res.json();
  return data.files ?? [];
}

/* ---------- Generator mode (fotografer) ---------- */

function LinkGenerator() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const folderId = extractFolderId(input);
  const shareUrl =
    input.trim() !== "" ? `${SITE_URL}/pilih-foto?f=${folderId}` : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 max-w-2xl transition-colors duration-300">
      <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1">
        Buat Link Galeri
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
        Tempel link folder Google Drive (pastikan folder di-share "Siapa saja
        dengan link"), lalu kirim link galeri ke client.
      </p>

      <label
        htmlFor="drive-link"
        className="text-sm font-medium text-zinc-800 dark:text-zinc-200 block mb-2"
      >
        Link Folder Google Drive
      </label>
      <div className="relative mb-4">
        <Link2 className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        <input
          id="drive-link"
          type="text"
          value={input}
          placeholder="https://drive.google.com/drive/folders/..."
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 pl-9 pr-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:border-amber-400"
        />
      </div>

      {shareUrl && (
        <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 p-4">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
            Link galeri untuk client:
          </p>
          <p className="text-sm font-mono text-zinc-800 dark:text-zinc-200 break-all mb-4">
            {shareUrl}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-amber-400 px-5 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Tersalin
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Salin Link
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Gallery mode (client) ---------- */

function Gallery({ folderId }: { folderId: string }) {
  const [state, setState] = useState<FetchState>("idle");
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [zoomFile, setZoomFile] = useState<DriveFile | null>(null);

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    fetchAllImages(folderId)
      .then((result) => {
        if (cancelled) return;
        setFiles(result);
        setState("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [folderId]);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Close zoom on Escape
  useEffect(() => {
    if (!zoomFile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomFile(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomFile]);

  if (state === "loading" || state === "idle") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }, (_, i) => `skeleton-${i}`).map((key) => (
          <div
            key={key}
            className="aspect-square rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (state === "error") {
    return (
      <ErrorBox
        title="Gagal memuat foto"
        body='Pastikan folder Google Drive di-share "Siapa saja dengan link" dan link galeri benar. Jika masih gagal, hubungi fotografer Anda.'
      />
    );
  }

  if (files.length === 0) {
    return (
      <ErrorBox
        title="Folder kosong"
        body="Tidak ada foto ditemukan di folder ini. Hubungi fotografer Anda."
      />
    );
  }

  const selectedFiles = files.filter((f) => selected.has(f.id));
  const message = `Halo kak, aku sudah selesai memilih foto untuk diedit ya.

Daftar file:
${selectedFiles.map((f, i) => `${i + 1}. ${f.name}`).join("\n")}

Total: ${selectedFiles.length} foto. Terima kasih!`;
  const waHref = `${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pb-28">
        {files.map((file) => {
          const isSelected = selected.has(file.id);
          return (
            <div key={file.id} className="group relative">
              <button
                type="button"
                onClick={() => toggle(file.id)}
                aria-pressed={isSelected}
                className={`relative w-full aspect-square overflow-hidden rounded-xl border-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-[0.98] ${
                  isSelected
                    ? "border-amber-400 ring-2 ring-amber-400/60"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbUrl(file.id, 400)}
                  alt={file.name}
                  loading="lazy"
                  className="h-full w-full object-cover bg-zinc-200 dark:bg-zinc-800"
                />
                {isSelected && (
                  <span className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-zinc-950 shadow">
                    <Check className="h-4 w-4" />
                  </span>
                )}
              </button>

              {/* Zoom button */}
              <button
                type="button"
                onClick={() => setZoomFile(file)}
                aria-label={`Lihat besar ${file.name}`}
                className="absolute bottom-8 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950/60 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              <p className="mt-1.5 text-[11px] leading-tight text-zinc-600 dark:text-zinc-400 truncate">
                {file.name}
              </p>
            </div>
          );
        })}
      </div>

      {/* Sticky bottom bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {selected.size} foto dipilih
          </p>
          <a
            href={selected.size > 0 ? waHref : undefined}
            target={selected.size > 0 ? "_blank" : undefined}
            rel={selected.size > 0 ? "noopener noreferrer" : undefined}
            aria-disabled={selected.size === 0}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              selected.size > 0
                ? "bg-amber-400 text-zinc-950 hover:bg-amber-300 active:scale-[0.98]"
                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 pointer-events-none"
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            Kirim Pilihan via WhatsApp
          </a>
        </div>
      </div>

      {/* Zoom modal */}
      {zoomFile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={zoomFile.name}
        >
          <button
            type="button"
            onClick={() => setZoomFile(null)}
            aria-label="Tutup"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X className="h-5 w-5" />
          </button>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop click-to-close, Escape handled globally */}
          <div
            className="max-h-full max-w-full flex flex-col items-center gap-3"
            onClick={() => setZoomFile(null)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbUrl(zoomFile.id, 1600)}
              alt={zoomFile.name}
              className="max-h-[85vh] max-w-full object-contain rounded-lg"
            />
            <p className="text-sm text-zinc-300">{zoomFile.name}</p>
          </div>
        </div>
      )}
    </>
  );
}

function ErrorBox({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 py-16 px-6 max-w-xl mx-auto">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 mb-4">
        <ImageOff className="h-6 w-6" />
      </div>
      <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
        {title}
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[40ch]">
        {body}
      </p>
    </div>
  );
}

/* ---------- Entry ---------- */

export default function PhotoPicker() {
  const searchParams = useSearchParams();
  const folderId = searchParams.get("f");

  if (!folderId) {
    return <LinkGenerator />;
  }

  return <Gallery folderId={folderId} />;
}

export function PhotoPickerFallback() {
  return (
    <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
      <FolderOpen className="h-4 w-4 animate-pulse" />
      Memuat galeri...
    </div>
  );
}
