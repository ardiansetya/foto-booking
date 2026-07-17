"use client";

import {
  AtSign,
  Calendar,
  Clock,
  Gem,
  GraduationCap,
  MapPin,
  MessageCircle,
  User,
} from "lucide-react";
import { useState } from "react";
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from "@/lib/constants";

type Mode = "wisuda" | "wedding";

interface FieldDef {
  key: string;
  label: string;
  placeholder: string;
  type: string;
  icon: typeof User;
}

const WISUDA_FIELDS: FieldDef[] = [
  { key: "name", label: "Nama", placeholder: "Andi", type: "text", icon: User },
  {
    key: "university",
    label: "Universitas",
    placeholder: "UNNES",
    type: "text",
    icon: GraduationCap,
  },
  {
    key: "date",
    label: "Tanggal Pemotretan",
    placeholder: "",
    type: "date",
    icon: Calendar,
  },
  {
    key: "time",
    label: "Jam Pemotretan",
    placeholder: "",
    type: "time",
    icon: Clock,
  },
  {
    key: "location",
    label: "Lokasi Pemotretan",
    placeholder: "Area kampus / studio",
    type: "text",
    icon: MapPin,
  },
  {
    key: "instagram",
    label: "Username Instagram",
    placeholder: "@username",
    type: "text",
    icon: AtSign,
  },
];

const WEDDING_FIELDS: FieldDef[] = [
  {
    key: "name",
    label: "Nama Pasangan",
    placeholder: "Andi & Sinta",
    type: "text",
    icon: User,
  },
  {
    key: "event",
    label: "Jenis Acara",
    placeholder: "Akad / Resepsi / Keduanya",
    type: "text",
    icon: Gem,
  },
  {
    key: "date",
    label: "Tanggal Acara",
    placeholder: "",
    type: "date",
    icon: Calendar,
  },
  {
    key: "time",
    label: "Jam Acara",
    placeholder: "",
    type: "time",
    icon: Clock,
  },
  {
    key: "location",
    label: "Lokasi / Venue",
    placeholder: "Gedung / rumah / outdoor",
    type: "text",
    icon: MapPin,
  },
  {
    key: "instagram",
    label: "Username Instagram",
    placeholder: "@username",
    type: "text",
    icon: AtSign,
  },
];

const TABS: { id: Mode; label: string; icon: typeof User }[] = [
  { id: "wisuda", label: "Wisuda", icon: GraduationCap },
  { id: "wedding", label: "Wedding", icon: Gem },
];

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return `${DAYS[dt.getDay()]}, ${d} ${MONTHS[m - 1]} ${y}`;
}

function emptyForm(fields: FieldDef[]): Record<string, string> {
  return Object.fromEntries(fields.map((f) => [f.key, ""]));
}

function buildWisudaMessage(f: Record<string, string>): string {
  return `Halo Admin Omegraduation!

Aku mau booking sesi foto wisuda nih, berikut datanya:

Nama : ${f.name}
Universitas : ${f.university}
Tanggal : ${formatDate(f.date)}
Jam : ${f.time.replace(":", ".")} WIB
Lokasi : ${f.location}
Instagram : ${f.instagram}

Boleh dibantu cek ketersediaan jadwalnya, Kak? Terima kasih!`;
}

function buildWeddingMessage(f: Record<string, string>): string {
  return `Halo Admin Omegraduation!

Aku mau tanya untuk dokumentasi wedding nih, berikut datanya:

Nama Pasangan : ${f.name}
Jenis Acara : ${f.event}
Tanggal : ${formatDate(f.date)}
Jam : ${f.time.replace(":", ".")} WIB
Lokasi : ${f.location}
Instagram : ${f.instagram}

Boleh dibantu info paket dan ketersediaan jadwalnya, Kak? Terima kasih!`;
}

export default function BookingForm() {
  const [mode, setMode] = useState<Mode>("wisuda");
  const fields = mode === "wisuda" ? WISUDA_FIELDS : WEDDING_FIELDS;

  const [forms, setForms] = useState<Record<Mode, Record<string, string>>>({
    wisuda: emptyForm(WISUDA_FIELDS),
    wedding: emptyForm(WEDDING_FIELDS),
  });
  const [submitted, setSubmitted] = useState<Record<Mode, boolean>>({
    wisuda: false,
    wedding: false,
  });

  const form = forms[mode];
  const missing = fields.filter((f) => form[f.key].trim() === "");

  const update = (key: string, value: string) => {
    setForms((prev) => ({
      ...prev,
      [mode]: { ...prev[mode], [key]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    setSubmitted((prev) => ({ ...prev, [mode]: true }));
    if (missing.length > 0) {
      e.preventDefault();
      return;
    }
  };

  const message =
    mode === "wisuda" ? buildWisudaMessage(form) : buildWeddingMessage(form);

  const waHref =
    missing.length === 0
      ? `${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
      : undefined;

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 text-left transition-colors duration-300">
      {/* Tabs */}
      <div className="flex gap-2 mb-6" role="tablist" aria-label="Jenis sesi foto">
        {TABS.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = mode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setMode(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-[0.98] ${
                isActive
                  ? "bg-amber-400 text-zinc-950"
                  : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <TabIcon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => {
          const Icon = field.icon;
          const isMissing = submitted[mode] && form[field.key].trim() === "";
          return (
            <div key={`${mode}-${field.key}`} className="flex flex-col gap-2">
              <label
                htmlFor={`booking-${mode}-${field.key}`}
                className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                {field.label}
                <span className="text-amber-500 dark:text-amber-400"> *</span>
              </label>
              <div className="relative">
                <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                <input
                  id={`booking-${mode}-${field.key}`}
                  type={field.type}
                  value={form[field.key]}
                  placeholder={field.placeholder}
                  onChange={(e) => update(field.key, e.target.value)}
                  aria-invalid={isMissing}
                  className={`w-full rounded-lg border bg-zinc-50 dark:bg-zinc-900 pl-9 pr-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none transition-colors [color-scheme:light] dark:[color-scheme:dark] focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:border-amber-400 ${
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

      <div className="mt-6 flex flex-col items-start gap-3">
        <a
          href={waHref ?? "#booking"}
          target={waHref ? "_blank" : undefined}
          rel={waHref ? "noopener noreferrer" : undefined}
          onClick={handleSubmit}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-8 py-4 text-base font-medium text-zinc-950 transition-all duration-200 hover:bg-amber-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950"
        >
          <MessageCircle className="h-5 w-5" />
          Kirim via WhatsApp
        </a>
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          Data di atas otomatis menjadi pesan WhatsApp ke admin kami.
        </p>
      </div>
    </div>
  );
}
