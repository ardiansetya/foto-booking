"use client";

import {
  Calendar,
  Check,
  Clock,
  Copy,
  MapPin,
  MessageCircle,
  RotateCcw,
  User,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { WHATSAPP_BASE_URL } from "@/lib/constants";

interface FormState {
  photographer: string;
  clientName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
}

const EMPTY: FormState = {
  photographer: "",
  clientName: "",
  date: "",
  startTime: "",
  endTime: "",
  location: "",
};

const FIELDS: {
  key: keyof FormState;
  label: string;
  placeholder: string;
  type: string;
  icon: typeof User;
}[] = [
  {
    key: "photographer",
    label: "Nama Fotografer",
    placeholder: "Imanuel",
    type: "text",
    icon: UserRound,
  },
  {
    key: "clientName",
    label: "Nama Client",
    placeholder: "Angela",
    type: "text",
    icon: User,
  },
  {
    key: "date",
    label: "Tanggal Foto",
    placeholder: "",
    type: "date",
    icon: Calendar,
  },
  {
    key: "startTime",
    label: "Jam Mulai",
    placeholder: "",
    type: "time",
    icon: Clock,
  },
  {
    key: "endTime",
    label: "Jam Selesai",
    placeholder: "",
    type: "time",
    icon: Clock,
  },
  {
    key: "location",
    label: "Lokasi Foto",
    placeholder: "UNNES",
    type: "text",
    icon: MapPin,
  },
];

function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function buildMessage(f: FormState): string {
  return `Halo Kak ${f.clientName} 👋

Konfirmasi sesi foto wisuda bersama AuraLens:

Fotografer : ${f.photographer}
Tanggal : ${formatDate(f.date)}
Waktu : ${f.startTime} - ${f.endTime} WIB
Lokasi : ${f.location}

Mohon hadir tepat waktu ya. Bila ada pertanyaan atau perubahan jadwal, silakan balas chat ini. Terima kasih! 🎓`;
}

export default function ChatGenerator() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const missing = useMemo(
    () =>
      (Object.keys(EMPTY) as (keyof FormState)[]).filter(
        (k) => form[k].trim() === "",
      ),
    [form],
  );

  const message = useMemo(() => buildMessage(form), [form]);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setCopied(false);
  };

  const handleGenerate = () => {
    setSubmitted(true);
    if (missing.length > 0) {
      setGenerated(false);
      return;
    }
    setGenerated(true);
  };

  const handleReset = () => {
    setForm(EMPTY);
    setSubmitted(false);
    setGenerated(false);
    setCopied(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const waHref = `${WHATSAPP_BASE_URL}/?text=${encodeURIComponent(message)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Form */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 transition-colors duration-300">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1">
          Detail Sesi Foto
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
          Isi data di bawah untuk membuat pesan konfirmasi WhatsApp secara
          otomatis.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FIELDS.map((field) => {
            const Icon = field.icon;
            const isMissing = submitted && form[field.key].trim() === "";
            const full = field.key === "photographer" || field.key === "clientName" || field.key === "location";
            return (
              <div
                key={field.key}
                className={`flex flex-col gap-2 ${full ? "sm:col-span-2" : ""}`}
              >
                <label
                  htmlFor={field.key}
                  className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  {field.label}
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {" "}
                    *
                  </span>
                </label>
                <div className="relative">
                  <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                  <input
                    id={field.key}
                    type={field.type}
                    value={form[field.key]}
                    placeholder={field.placeholder}
                    onChange={(e) => update(field.key, e.target.value)}
                    aria-invalid={isMissing}
                    className={`w-full rounded-lg border bg-zinc-50 dark:bg-zinc-950/50 pl-9 pr-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:border-emerald-500 ${
                      isMissing
                        ? "border-red-400 dark:border-red-500/60"
                        : "border-zinc-200 dark:border-zinc-800"
                    }`}
                  />
                </div>
                {isMissing && (
                  <span className="text-xs text-red-500 dark:text-red-400">
                    Wajib diisi.
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950"
          >
            <MessageCircle className="h-4 w-4" />
            Buat Template
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 px-6 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 transition-colors duration-300">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Preview Pesan
          </h2>

          {generated ? (
            <>
              <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 p-4">
                <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                  {message}
                </pre>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-amber-400 px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-amber-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950"
                >
                  <MessageCircle className="h-4 w-4" />
                  Buka WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 px-6 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                      Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Salin Teks
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 py-14 px-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-[32ch] leading-relaxed">
                Isi semua kolom lalu tekan{" "}
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  Buat Template
                </span>{" "}
                untuk melihat pesan konfirmasi di sini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
