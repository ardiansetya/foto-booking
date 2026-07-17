"use client";

import {
  AtSign,
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  User,
} from "lucide-react";
import { useState } from "react";
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from "@/lib/constants";

interface BookingState {
  name: string;
  university: string;
  date: string;
  time: string;
  location: string;
  instagram: string;
}

const EMPTY: BookingState = {
  name: "",
  university: "",
  date: "",
  time: "",
  location: "",
  instagram: "",
};

const FIELDS: {
  key: keyof BookingState;
  label: string;
  placeholder: string;
  type: string;
  icon: typeof User;
}[] = [
  { key: "name", label: "Nama", placeholder: "Andi", type: "text", icon: User },
  {
    key: "university",
    label: "Universitas",
    placeholder: "UNNES",
    type: "text",
    icon: MapPin,
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

function buildMessage(f: BookingState): string {
  return `Halo Admin Omegraduation 👋

Aku mau booking sesi foto nih, berikut datanya:

Nama : ${f.name}
Universitas : ${f.university}
Tanggal : ${formatDate(f.date)}
Jam : ${f.time.replace(":", ".")} WIB
Lokasi : ${f.location}
Instagram : ${f.instagram}

Boleh dibantu cek ketersediaan jadwalnya, Kak? Terima kasih 🙏`;
}

export default function BookingForm() {
  const [form, setForm] = useState<BookingState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const missing = (Object.keys(EMPTY) as (keyof BookingState)[]).filter(
    (k) => form[k].trim() === "",
  );

  const update = (key: keyof BookingState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    setSubmitted(true);
    if (missing.length > 0) {
      e.preventDefault();
      return;
    }
  };

  const waHref =
    missing.length === 0
      ? `${WHATSAPP_BASE_URL}/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(form))}`
      : undefined;

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 text-left transition-colors duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map((field) => {
          const Icon = field.icon;
          const isMissing = submitted && form[field.key].trim() === "";
          return (
            <div key={field.key} className="flex flex-col gap-2">
              <label
                htmlFor={`booking-${field.key}`}
                className="text-sm font-medium text-zinc-800 dark:text-zinc-200"
              >
                {field.label}
                <span className="text-amber-500 dark:text-amber-400"> *</span>
              </label>
              <div className="relative">
                <Icon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                <input
                  id={`booking-${field.key}`}
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
